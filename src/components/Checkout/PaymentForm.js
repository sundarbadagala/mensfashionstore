import React, { useContext } from 'react'
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review'
import { ProductContext } from '../contextAPI'


const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function PaymentForm({backStep, nextStep, shippingData, checkoutToken}) {
    const product= useContext(ProductContext)
    const handleSubmit= async (event, elements, stripe)=>{
        event.preventDefault()
        if(!stripe || !elements) return;
        const cardElements = elements.getElement(CardElement)

        const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card:cardElements})

        if(error){
            console.log(error)
        }else{
            const orderData={
                line_items: checkoutToken.live.line_items,
                customer: {
                    name:shippingData.name,
                    number:shippingData.number,
                    mail: shippingData.mail,
                },
                shipping:{
                    name:'Primary',
                    state:shippingData.state,
                    district: shippingData.district,
                    city: shippingData.city,
                    pin: shippingData.pin
                },
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            product.handleCaptureCheckout(checkoutToken.id, orderData)
            nextStep()   
            //console.log(checkoutToken.id, orderData)
        }
    }
    return (
        <Container>
            <Review checkoutToken={checkoutToken}/>
            <Container fluid>
            <Card>
            <Card.Header>
            <Row>
            <Col className='text-center font-weight-bold'>
            payment methods
            </Col>
            </Row>
            </Card.Header>
            <Card.Body>
            <Row>
            <Col>
            
            <Elements stripe={stripePromise}> 
            <ElementsConsumer>
            {
                ({elements, stripe})=>(
                    <form onSubmit={(e)=>handleSubmit(e, elements, stripe)}>
                        <CardElement/><br/>
                        <div>
                            <Button onClick={backStep}>Back</Button>
                            <Button type='sumbit' disabled={!stripe}>
                                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>
                )
            }
        </ElementsConsumer>
            </Elements>
            
            </Col>
            </Row>
            </Card.Body>
            </Card>
            </Container>
            </Container>
    )
}

export default PaymentForm

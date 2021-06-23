import React, { useContext } from 'react'
import {ProductContext} from '../contextAPI'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ConfirmationForm() {
    const product= useContext(ProductContext)
    if(!product.order) return 'Loading...'
    return (
        <div>
        {
            product.order &&
        
        <Container  className='my-3'>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='text-center'>
                            <h4 className='text-success'>Order Confirmed</h4>
                        </Card.Header>
                        <Card.Body>
                            <div>
                            <div className='font-weight-bold'>Thanks for Your Purchase ,</div><hr/>
                            Your Reference Id : {product.order.customer_reference} <hr/>
                            Please Check Your <a href='https://mail.google.com/mail/u/0/#inbox' target='blank' className='text-decoration-none text-danger font-italic'> Mail </a> for more information 
                            </div>    
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                Let's start <Link to='/' className='text-decoration-none text-primary font-weight-bold'> Shopping </Link> Againg...
                </Col>
            </Row>
        </Container>
    }
    </div>
    )
}

export default ConfirmationForm

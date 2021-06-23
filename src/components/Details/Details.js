import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {ProductContext} from '../contextAPI'
import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Details() {
    const product = useContext(ProductContext)
    const {id}= useParams()
    console.log(id)
    console.log(product.products)
    const data = product.products.find(item => item.id === id)
    console.log(data)
    if(!data) return 'loading ...'
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Image src={data.media.source} style={{width:'300px'}} thumbnail/>
                </Col>
                <Col md={8}>
                    <div className='font-weight-bold'>
                    Name : {data.name} <br/>
                    Price : {data.price.formatted_with_symbol} 
                    </div>
                    <div className='text-muted ' dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    <div>
                        <Link to='/'><Button variant='outline-dark'>Go To Home</Button></Link>
                        <Button variant='outline-dark'  onClick={()=>product.addToCart(data.id, 1)}>Add To Cart</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Details

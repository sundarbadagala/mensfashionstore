import React, { useContext } from 'react'
import {Container, Row, Col, Button, Badge} from 'react-bootstrap'
import '../styleSheet.css'
import {ProductContext} from '../contextAPI'
import {Link, useLocation} from 'react-router-dom'

function Navbar() {
    const product= useContext(ProductContext)
    const location = useLocation()
    return (
        <Container fluid className='bg-primary p-2'>
            <Row>
                <Col>
                        <Link to='/' className='text-decoration-none font-weight-bold font-italic header-font text-light'>
                        Mens Fashion Store
                        </Link>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                <Link to='/cart'>
                    <Button variant='warning' size='md'>
                        <i className="fas fa-shopping-cart"></i>
                        <span className='font-weight-bold  mx-2'>Cart</span>
                        {product.cart.total_unique_items !== 0  && <Badge pill variant='danger'>{product.cart.total_unique_items}</Badge>} 
                    </Button>
                </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar

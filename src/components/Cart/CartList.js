import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {ProductContext} from '../contextAPI'
import CartCard from './CartCard'
import CartTotal from './CartTotal'

function CartList() {
    const product= useContext(ProductContext)
    return (
        <Container fluid>
            <Row>
                <Col md={8}>
                {
                    product.cart.line_items.map(item => <CartCard key={item.id} item={item}/>)
                }
                </Col>
                <Col className='p-3' md={4}>
                    <CartTotal/>
                </Col>
            </Row>
        </Container>
    )
}


export default CartList

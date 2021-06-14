import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap'

function Review({checkoutToken}) {
    console.log(checkoutToken.live.line_items.map(product => product.name))
    return (
        <Container>
        <Card>
        <Card.Header>
        <Row>
            <Col className='text-center font-weight-bold'>
                Order Summary
            </Col>
        </Row>
        </Card.Header>
        <Card.Body>
        {
            checkoutToken.live.line_items.map(product=>
                    <Row  key={product.id}>
                        <Col>{product.name}</Col><Col>{product.quantity} * {product.price.formatted_with_symbol}</Col>
                    </Row>
            )
        }
        <Row className='font-weight-bold'>
        <Col>Total Items Cost</Col>
        <Col>
            {checkoutToken.live.subtotal.formatted_with_symbol}
        </Col>
        </Row>
        </Card.Body>
        </Card>
        </Container>
    )
}

export default Review

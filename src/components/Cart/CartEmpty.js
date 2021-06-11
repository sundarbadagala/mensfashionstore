import React from 'react'
import {Alert, Container} from 'react-bootstrap'

function CartEmpty() {
    return (
        <Container>
            <Alert variant='primary m-4 text-center'>
                You have no items in your shopping cart,
                <Alert.Link href='/'> start adding some!</Alert.Link>
            </Alert>
        </Container>
    )
}

export default CartEmpty

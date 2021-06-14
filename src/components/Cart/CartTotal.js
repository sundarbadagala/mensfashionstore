import React, { useContext } from 'react'
import {Button } from 'react-bootstrap'
import {ProductContext} from '../contextAPI'
import {Link} from 'react-router-dom'

function CartTotal() {
    const product = useContext(ProductContext)
    return (
        <React.Fragment>
            <h5>Totol Items Cost : {product.cart.subtotal.formatted_with_symbol}</h5>
            <h5>Delivery Charges : Free</h5>
            <h5>Total Cost: {product.cart.subtotal.formatted_with_symbol}</h5>
            <div className='mt-3'>
                <Button onClick={()=>product.emptyCart()} className='mr-4' variant='danger'>
                    Clear Cart
                </Button>
                <Link to='/checkout'>
                <Button variant='success'>
                    Check Out
                </Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default CartTotal

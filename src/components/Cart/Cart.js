import React, { useContext } from 'react'
import CartList from './CartList'
import CartEmpty from './CartEmpty'
import {ProductContext} from '../contextAPI'

function Cart() {
    const product = useContext(ProductContext)
    if(!product.cart.line_items) return 'Loading...'
    return (
        <div>
            {
                product.cart.line_items.length ?
                <CartList/>:
                <CartEmpty/>
            }
        </div>
    )
}

export default Cart

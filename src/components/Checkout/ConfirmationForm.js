import React, { useContext } from 'react'
import {ProductContext} from '../contextAPI'

function ConfirmationForm() {
    const product= useContext(ProductContext)
    console.log(product.newOrder)
    return (
        <div>
            thanks for purchasing {product.newOrder.customer ? <span>{product.newOrder.customer.name}</span>:null }<br/>
            your ref id is : {product.checkoutTokenId}
        </div>
    )
}

export default ConfirmationForm

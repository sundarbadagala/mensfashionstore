import React, { useContext } from 'react'
import {ProductContext} from '../contextAPI'

function ConfirmationForm() {
    const product= useContext(ProductContext)
    return (
        <div>
            {product.order.customer.name}
        </div>
    )
}

export default ConfirmationForm

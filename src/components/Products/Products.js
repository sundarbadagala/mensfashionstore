import React, { useContext } from 'react'
import ProductsCard from './ProductsCard'
import {ProductContext} from '../contextAPI'

const Products = () => {
    const product = useContext(ProductContext)
    return (
        <div className='d-flex flex-wrap'>
            {
                product.products.map((item, index) => <ProductsCard {...item} key={index}/>)
            }
            
        </div>
    )
}

export default Products

import React, { useContext } from 'react'
import {Card, Button} from 'react-bootstrap'
import '../styleSheet.css'
import {ProductContext} from '../contextAPI'
import { Link } from 'react-router-dom'

function ProductCard(props) {
    const product = useContext(ProductContext)
    const {media, name, price, id}= props
    return (
        <div>
            <Card className='m-2 card-width'>
                <Link to={'/details/'+id}>
                    <Card.Img src={media.source} className='image-height'/>
                </Link>
                <Card.Header className='p-1'>
                    <div className='p-1'>{name}</div>    
                    <div className='d-flex justify-content-around align-items-center font-weight-bold'>
                        {price.formatted_with_symbol}
                        <Button onClick={()=>product.addToCart(id, 1)} className='px-4'>
                            <i className="fas fa-cart-plus"></i>
                        </Button>
                    </div>
                </Card.Header> 
            </Card>
        </div>
    )
}

export default ProductCard
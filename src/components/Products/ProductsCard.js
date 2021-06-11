import React, { useContext } from 'react'
import {Card, Button} from 'react-bootstrap'
import '../styleSheet.css'
import {ProductContext} from '../contextAPI'

function ProductCard(props) {
    const product = useContext(ProductContext)
    const {media, name, price, id}= props
    return (
        <div>
            <Card className='m-2 card-width'>
                <Card.Img src={media.source} className='image-height'/>
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
            {
                //<div className='text-danger' dangerouslySetInnerHTML={{ __html: description }}></div>
            }
        </div>
    )
}

export default ProductCard
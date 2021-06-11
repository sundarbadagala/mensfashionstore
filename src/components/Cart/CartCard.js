import React, { useContext } from 'react'
import {Button} from 'react-bootstrap'
import {ProductContext} from '../contextAPI'

function CartCard({item}) {
    const product= useContext(ProductContext)
    return (
        <div className="media m-1">
            <div className="media-left">
                <img src={item.media.source} className="media-object" style={{width:'150px'}} alt='' />
            </div>
            <div className="media-body ml-2">
                <h5>{item.name}</h5>
                <Button 
                    variant='outline-dark' 
                    size='sm'  
                    onClick={()=>product.updateItem(item.id, item.quantity-1)} 
                >
                    <i className="fas fa-minus"></i>
                </Button>
                <Button 
                    variant='outline-dark' 
                    disabled size='sm'
                >
                    {item.quantity}
                </Button>
                <Button 
                    variant='outline-dark' 
                    size='sm' onClick={()=>product.updateItem(item.id, item.quantity+1)}
                >
                    <i className="fas fa-plus"></i>
                </Button>
                <Button 
                    className=' ml-2' 
                    variant='secondary' 
                    size='sm' 
                    onClick={()=>product.removeItem(item.id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </Button><br/><br/>
                <div className='font-weight-bold'>
                    {item.price.formatted_with_symbol}
                </div>
            </div>
      </div>
    )
}

export default CartCard

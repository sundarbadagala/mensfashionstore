import React from 'react'
import {commerce} from './lib/commerce'

const ProductContext = React.createContext()


class ProductProvider extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             products:[],
             cart:{},
             order:{},
             errorMessage:''
        }
    }
    componentDidMount(){
        this.fetchProducts()
        this.fetchCart()
    }
    fetchProducts= async ()=>{
        const response= await commerce.products.list()
        this.setState({
            products: response.data
        })
    }
    fetchCart = async ()=>{
        const response = await commerce.cart.retrieve()
        this.setState({
            cart: response
        })
    }
    addToCart= async (productId, quantity)=>{
        const response = await commerce.cart.add(productId, quantity)
        this.setState({
            cart: response.cart
        })
    }
    updateItem= async (productId, quantity)=>{
        const response = await commerce.cart.update(productId, {quantity})
        this.setState({
            cart: response.cart
        })
    }
    removeItem= async(productId)=>{
        const response = await commerce.cart.remove(productId)
        this.setState({
            cart: response.cart
        })
    }
    emptyCart= async()=>{
        const response = await commerce.cart.empty()
        this.setState({
            cart: response.cart
        })
    }
    handleCaptureCheckout= async(checkoutTokenId, newOrder)=>{
        try{
            const incomingOrder= await commerce.checkout.capture(checkoutTokenId, newOrder)
            this.setState({
                order: incomingOrder,
                cart: await commerce.cart.refresh()
            })
            this.refreshCart()
        }catch(error){
            this.setState({
                errorMessage: error.data.error.message
            })
        }
    }
    // refreshCart= async ()=>{
    //     const newCart = await commerce.cart.refresh()
    //     this.setState({
    //         cart: newCart
    //     })
    // }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                addToCart: this.addToCart,
                updateItem: this.updateItem,
                removeItem: this.removeItem,
                emptyCart: this.emptyCart,
                handleCaptureCheckout: this.handleCaptureCheckout
            }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

export {ProductProvider, ProductContext}
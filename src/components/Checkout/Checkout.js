import React, { useContext, useEffect, useState } from 'react'
import {commerce} from '../lib/commerce'
import {ProductContext} from '../contextAPI'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import ConfirmationForm from './ConfirmationForm'

function Checkout() {
    const [activeValue, setActiveValue]= useState(0)
    const [checkoutToken, setCheckoutToken]= useState(null)
    const [shippingData, setShippingData]= useState({})
    const product = useContext(ProductContext)
    useEffect(()=>{
        const generateToken = async ()=>{
            try{
                const token = await commerce.checkout.generateToken(product.cart.id, {type:'cart'})
                setCheckoutToken(token)
            }
            catch(error){

            }
        }
        generateToken()
    },[product.cart])
    const next =(data)=>{
        const values = data
        //console.log(values)
        setShippingData(values)
        //console.log(data)
        //console.log(shippingData)
        nextStep()
    }
    const nextStep=()=> setActiveValue(prevActiveValue => prevActiveValue + 1)
    const backStep=()=> setActiveValue(prevActiveValue => prevActiveValue - 1)
    // const Form = () => activeValue ===0 ? 
    //     <AddressForm checkoutToken={checkoutToken} next={next}/> : 
    //     <PaymentForm backStep={backStep} nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken}/>

    const FinalValue=()=>{
        if(activeValue===0){
            return <AddressForm checkoutToken={checkoutToken} next={next}/>
        }else if(activeValue === 1){
            return <PaymentForm backStep={backStep} nextStep={nextStep} shippingData={shippingData} checkoutToken={checkoutToken}/>
        }else if(activeValue === 2){
            return <ConfirmationForm/>
        }
    }
    console.log(shippingData)
    return (
        <div>
            {checkoutToken && FinalValue()}
        </div>
    )
}


export default Checkout


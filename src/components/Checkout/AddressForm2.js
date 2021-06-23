import React, { useState, useEffect } from 'react'
import {Card, Container, Row, Col, Button} from 'react-bootstrap'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import '../styleSheet.css'
import { commerce } from '../lib/commerce'

const initialValues={
    firstName:'',
    lastName:'',
    address1:'',
    mail:'',
    city:'',
    pin:''
}


const validate=(data)=>{
    const errors={}

    if(!data.firstName){
        errors.firstName = 'Enter Your First Name'
    }else if(!data.lastName){
        errors.lastName = 'Enter Your lastName'
    }else if(!data.mail){
        errors.mail= 'Enter Your Mail'
    }else if(!/^([a-z0-9._-]+)@([a-z0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/i.test(data.mail)){
        errors.mail='Invalid mail'
    }else if(!data.address1){
        errors.address1='Enter Your address1'
    }else if(!data.city){
        errors.city= 'Enter Your City'
    }else if(!data.pin){
        errors.pin = 'Enter Your Pin'
    }

    return errors
}
function AddressForm({ checkoutToken,  next}) {

    const [shippingCountries, setShippingCoutries]= useState([])
    const [shippingCountry, setShippingCountry]= useState('')
    const [shippingSubdivisions, setShippingSubdivisions]= useState([])
    const [shippingSubdivision, setShippingSubdivision]= useState('')
    const [shippingOptions, setShippingOptions]= useState([])
    const [shippingOption, setShippingOption]= useState('')
    

    const countries = Object.entries(shippingCountries).map(([code, name])=>({id:code, label:name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id:code, label:name}))

    const options = shippingOptions.map(item => ({id:item.id, label:`${item.description} - (${item.price.formatted_with_symbol})`}))

    const fetchShippingCountries= async(checkoutTokenId)=>{
        const response = await commerce.services.localeListShippingCountries(checkoutTokenId)
        const countries = response.countries
        setShippingCoutries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }


    const fetchSubdivisions = async (shippingCountry) =>{
        const response = await commerce.services.localeListSubdivisions(shippingCountry)
        const subdivisions = response.subdivisions
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions= async(checkoutTokenId, country, region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [checkoutToken.id])

    useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])

    useEffect(()=>{
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    },[shippingCountry, shippingSubdivision, checkoutToken.id])

    return (
        <Container className='d-flex justify-content-center p-2'>
        <Card style={{width:'500px'}}>
        <Card.Header className='text-center p-1'><h4>Form submision</h4></Card.Header>
        <Card.Body>
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values)=>next({...values, shippingCountry, shippingSubdivision, shippingOption})}
        >
            <Form>
            <Row>
                <Col className='p-1' md={6} xs={6}>
                <label htmlFor='firstName'>First Name</label>
                <Field type='text' name='firstName' placeholder='first Name' className='p-1 border rounded' style={{width:'100%'}}/>
                </Col>
                <Col className='p-1' md={6}  xs={6}>
                <label htmlFor='lastName'>Last Name</label>
                <Field type='text' name='lastName' placeholder='Last Name'  className='p-1 border rounded' style={{width:'100%'}}/>
                </Col>
            </Row>
            <Row>
                <Col className='p-1' md={12}>
                <label htmlFor='mail'>Mail</label>
                <Field type='text' name='mail' placeholder='Mail' className='p-1 border rounded' style={{width:'100%'}}/>
                </Col>
                
            </Row>
            <Row>
                <Col className='p-1' md={6} xs={6} >
                <label htmlFor='city'>City</label>
                <Field type='text' name='city' placeholder='City' className='p-1 border rounded' style={{width:'100%'}}/>
                </Col>
                <Col className='p-1' md={6} xs={6}>
                <label htmlFor='pin'>Pin</label>
                <Field type='text' name='pin' placeholder='Pin'  className='p-1 border rounded' style={{width:'100%'}}/>
                </Col>
            </Row>
            <Row>
                <Col className=' p-1' md={12}>
                <label htmlFor='address1'>Address1</label><br/>
                <Field type='text' name='address1' placeholder='Address1' className='p-1 border rounded' style={{width:"100%"}}/>
            </Col>
            </Row>
            <Row>
                <Col md={6} className='p-1'>
                    <label htmlFor='Shipping Country'>Shipping Country </label><br/>
                    <select value={shippingCountry || ''} onChange={(e)=>setShippingCountry(e.target.value)} className='border rounded p-1'>
                        {
                            countries.map(item =>(
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))
                        }
                    </select>
                </Col>
                <Col md={6} className='p-1'>
                    <label htmlFor='Shipping Options'>Shipping Options </label><br/>
                    <select values={shippingOption || ''}  onChange={(e)=>setShippingOption(e.target.value)} className='border rounded p-1'>
                        {
                            options.map(item =>(
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='p-1'>
                <label htmlFor='Shipping Subdivision'>Shipping Subdivision </label><br/>
                    <select value={shippingSubdivision || ''}  onChange={(e)=>setShippingSubdivision(e.target.value)} className='border rounded p-1'>
                        {
                            subdivisions.map(item =>(
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col className='text-danger font-weight-bold text-center'>
                    <ErrorMessage name='firstName'/>
                    <ErrorMessage name='lastName'/>
                    <ErrorMessage name='mail'/>
                    <ErrorMessage name='city'/>
                    <ErrorMessage name='pin'/>
                    <ErrorMessage name='address1'/>
                </Col>
            </Row>
            <Row>
                <Col className='m-1 p-0'>
                <Button block type='submit' className=''>Submit</Button>
                </Col>
            </Row>
            </Form>
        </Formik>
        </Card.Body>
        </Card>
        </Container>
        )
    }
    
export default AddressForm


import React, { useEffect } from 'react'
import {commerce} from '../lib/commerce'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Link} from 'react-router-dom'


const initialValues={
    name:'',
    number:'',
    mail:'',
    state:'',
    district:'',
    city:'',
    pin:''
}

const validate=(data)=>{
    const errors={}

    if(!data.name){
        errors.name = 'Enter Your Name'
    }else if(!data.number){
        errors.number = 'Enter Your Number'
    }else if(!/^[7-9]\d{9}$/i.test(data.number)){
        errors.number = 'Invalid Number'
    }else if(!data.mail){
        errors.mail= 'Enter Your Mail'
    }else if(!/^([a-z0-9._-]+)@([a-z0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/i.test(data.mail)){
        errors.mail='Invalid mail'
    }else if(!data.state){
        errors.state='Enter Your State'
    }else if(!data.district){
        errors.district = 'Enter Your District'
    }else if(!data.city){
        errors.city= 'Enter Your City'
    }else if(!data.pin){
        errors.pin = 'Enter Your Pin'
    }

    return errors
}





function AddressForm({checkoutToken, next}) {
    
    return (
        <div className='d-flex justify-content-center'>
        <div className='form-width'>
        <Container className='mt-5 font-weight-bold'>
            <Formik
                initialValues={initialValues}
                //validate={validate}
                onSubmit={(values)=>next(values)}
            >
                <Form>
                    <Row>
                        <Col xs={3}><label htmlFor='name'>Name </label></Col>
                        <Col xs={9}>
                            <Field type='text' name='name' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='name'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='number'>Number </label></Col>
                        <Col xs={9}>
                            <Field type='number' name='number' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='number'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='mail'>Mail </label></Col>
                        <Col xs={9}>
                            <Field type='mail' name='mail' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='mail'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='state'>State </label></Col>
                        <Col xs={9}>
                            <Field type='text' name='state' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='state'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='district'>District </label></Col>
                        <Col xs={9}>
                            <Field type='text' name='district' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='district'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='city'>City </label></Col>
                        <Col xs={9}>
                            <Field type='text' name='city' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='city'/></span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs={3}><label htmlFor='pin'>Pin </label></Col>
                        <Col xs={9}>
                            <Field type='number' name='pin' className='error-input'/><br/>
                            <span className='error-text'><ErrorMessage name='pin'/></span>
                        </Col>
                        
                    </Row>
                    <Row className='mt-3'>
                        <Col xs={12} className=''>
                            <Button block type='submit' variant='success'>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Container>
        </div>
        </div>
    )
}

export default AddressForm
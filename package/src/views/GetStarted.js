import React from "react";
import { Row, Col } from 'reactstrap'
import friends_getstarted from '../assets/images/bg/friends_getStarted.png'
import { Link } from 'react-router-dom'

function GettingStarted() {


    return (
        <>

            <Row>

                <Col className="col">
                    <div className='py-5'>
                        <b className="h1 display-1"><strong>VerbaSure</strong></b>
                        <h4>Feed your <strong className="font-weight-bold">FOCUS</strong> and go <strong className="font-weight-bold">BIG</strong></h4>
                        <div className="py-5">
                            <div className='py-2'>
                                <Link to="/signup" className='btn btn-primary w-75'><strong>Get Started</strong></Link>
                            </div>
                            <div className="py-2">
                                <Link to="/login" className='btn btn-primary w-75'><strong>Already Have an Account</strong></Link>
                            </div>
                        </div>


                    </div>
                </Col>
                <Col>
                    <div className='container text-center' >
                        <img src={friends_getstarted} class="img-fluid" alt=""></img>
                    </div>

                </Col>

            </Row>


        </>



    )

}

export default GettingStarted
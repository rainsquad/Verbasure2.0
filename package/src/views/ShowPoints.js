

import axios from 'axios';
import React, { useState, useEffect } from "react";
import img_star from '../assets/images/bg/img_star.png'


export default function ShowPoints() {





    const [values] = useState({
        name: localStorage.getItem("inputValue"),
    })
    const [imageData, setImageData] = useState([]);
    const [points, setPoints] = useState([])


    useEffect(() => {

        // localStorage.setItem("inputValue", [parentToChild])
        // console.log([parentToChild], "initialInput")

        axios.post('http://localhost:3002/image', values)
            .then(res => {
                setImageData(res.data[0])
                //console.log(res.data[0])
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:3002/points', values)
            .then(res => {
                // setImageData(res.data[0])
                setPoints(res.data[0].points)
                console.log(res.data[0].points)
            })
            .catch(err => console.log(err));

    }, []
    )

    console.log(localStorage.getItem("inputValue"))
    return (

        <div className='container  rounded-5'>

            <div className='container d-flex align-items-end'>
                <div className='gap-2' >


                    <div className='row align-items-start pt-5 '>



                        <div className='col m-0'>
                            <h2><strong className='text-white'>{localStorage.getItem("inputValue")}</strong></h2>

                            <div className='row align-items-start '>
                                <div className='col'>
                                    <strong className='text-white fs-4'>{points}xp</strong>
                                </div>


                            </div>


                        </div>
                        <div className='col m-0'>
                            <img className='rounded-circle card-img-top ' style={{ width: "100px", height: "100px" }} src={`http://localhost:3002/images/` + imageData.image} alt='card image cap'></img>
                        </div>
                    </div>


                </div>

            </div>
        </div>



    )
}
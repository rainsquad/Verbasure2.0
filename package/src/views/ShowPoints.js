
import avatar from '../assets/avatars/image 1.png'
import axios from 'axios';
import React, { useState, useEffect } from "react";



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
        <div className='d-flex align-items-end'>
            <div className=' gap-2' style={{ width: "300px", height: "150px" }}>
                <div className='row'>
                    <div className='col '>

                    <img className='rounded-circle card-img-top ' style={{ width: "120px", height: "120px" }} src={`http://localhost:3002/images/` + imageData.image} alt='card image cap'></img>
                    </div>
                    <div className='col py-5'>
                    <strong className='text-white'>{localStorage.getItem("inputValue")}</strong>
                    <br></br>
                    <strong className='text-white'>P 900{points}</strong>
                    </div>
                </div>
             
            
            </div>

        </div>


    )
}
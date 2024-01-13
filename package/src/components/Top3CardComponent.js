// CardComponent.js
import React from 'react';
import medal_image from '../assets/medals/fa6-solid_medal.png'
import medal_tie_image from '../assets/medals/fa6-solid_medal(2).png'
const Top3CardComponent = ({ data,index }) => {

  console.log(index)


  const isTopThree = index>=1 && index<=3;

  return (
    <>
    {index===0 && 
    
    
    <div className="card  text-center" style={{ width: "150px", height: "320px" }}  >
      
      <div className='col justify-content-center'>
        <img src={`http://localhost:3002/images/` + data.image} className='rounded-circle ' alt='card image cap' style={{ width: "80px", height: "80px" }} ></img>
      </div>
      <div className='col'>
        <img src={medal_tie_image}></img>
      </div>
      <div className='col'>
        <img src={medal_image}></img>
      </div>
      <div className='col'>
        <h2><strong>1st</strong></h2>
      </div>
      <div className='col'>
        <h5>{data.name}</h5>
      </div>
      <div className='col'>
        <h5 >{data.points}xp</h5>
      </div>
   

  </div>
    
    
    },
    {index ===1 && 
    
    <div className="card text-center" style={{ width: "150px", height: "300px" }}  >
      
      <div className='col justify-content-center'>
        <img src={`http://localhost:3002/images/` + data.image} className='rounded-circle ' alt='card image cap' style={{ width: "80px", height: "80px" }} ></img>
      </div>
      <div className='col'>
        <img src={medal_tie_image}  style={{ width: "80px", height: "20px" }}></img>
      </div>
      <div className='col'>
        <img src={medal_image}  style={{ width: "90px", height: "70px" }}></img>
      </div>
      <div className='col'>
        <h2><strong>2nd</strong></h2>
      </div>
      <div className='col'>
        <h5>{data.name}</h5>
      </div>
      <div className='col'>
        <h5 >{data.points}xp</h5>
      </div>
   
   

  </div>
    }     
     {index ===2 && 
    
    <div className="card  text-center" style={{ width: "150px", height: "280px" }} >
      
      <div className='col justify-content-center'>
        <img src={`http://localhost:3002/images/` + data.image} className='rounded-circle ' alt='card image cap' style={{ width: "100px", height: "80px" }} ></img>
      </div>
      <div className='col'>
        <img src={medal_tie_image}  style={{ width: "70px", height: "10px" }}></img>
      </div>
      <div className='col'>
        <img src={medal_image}  style={{ width: "70px", height: "50px" }}></img>
      </div>
      <div className='col'>
        <h2><strong>3rd</strong></h2>
      </div>
      <div className='col'>
        <h5>{data.name}</h5>
      </div>
      <div className='col'>
        <h5 >{data.points}xp</h5>
      </div>
   

  </div>
    }     
    
    </>
   
  );
};

export default Top3CardComponent;

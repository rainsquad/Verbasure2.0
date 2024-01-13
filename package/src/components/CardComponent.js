// CardComponent.js
import React from 'react';

const CardComponent = ({ data }) => {



  
  return (
    <div className="card card-fluid text-center" >
      <div className='row '>
        <div className='col justify-content-center'>
          <img src={`http://localhost:3002/images/` + data.image} className='rounded-circle ' alt='card image cap' style={{ width: "60px", height: "60px" }} ></img>
        </div>
        <div className='col'>
          <h3>{data.name}</h3>
        </div>
        <div className='col'>
          <h3 >{data.points}xp</h3>
        </div>
      </div>


    </div>
  );
};

export default CardComponent;

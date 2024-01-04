// CardComponent.js
import React from 'react';

const CardComponent = ({ data }) => {
  return (
    <div className="card">
        <img src={`http://localhost:3002/images/` + data.image } alt='card image cap' style={{ width: "100px", height: "100px" }} ></img>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default CardComponent;

// CardList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import './Starter.css'
const CardList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-list">
      {data.map((item) => (
        <CardComponent key={item.id} data={item} />
      ))}
    </div>
  );
};

export default CardList;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from './Api';
import { CryptoState } from './Contex';

function Coins() {
  const {id}=useParams();
  const[coin,setCoin]=useState();
  const {symbol,currency}=CryptoState();

  const fetchCoin=async()=>{
      const {data}=await axios.get(SingleCoin(id));
      setCoin(data);
  }
  console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);
  
  const classes=makeStyles(()=>({
    
  })
  );
  return (
    <div>
        <p></p>
    </div>
  )
}
export default Coins;

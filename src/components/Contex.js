import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const crypto=createContext();

function Contex({children}) {
    const [currency,setCurrency]=useState('INR');
    const [symbol,setSymbol]=useState('₹');
    useEffect(()=>{
        if(currency==='INR')
        {
            setSymbol('₹');
        }
        else if(currency==='USD'){
            setSymbol('$');
        }
    },[currency]);
  return (
    <crypto.Provider value={{currency,symbol,setCurrency}}>
        {children}
    </crypto.Provider>
  )
}
export default Contex;

export const CryptoState=()=>{
   return useContext(crypto);
}
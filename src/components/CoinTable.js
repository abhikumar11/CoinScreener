import axios from 'axios';
import React,{ useState ,useEffect} from 'react'
import { CoinList } from './Api';
import { CryptoState } from './Contex';

function CoinTable() {
    const [coins,setCoins]=useState([]);
    const[loading,setLoading] = useState(false);
    const {currency}=CryptoState();
    const  fetchCoins =async()=>{
        setLoading(true);
        const {data}=await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    useEffect(() => {
      fetchCoins();
    }, [currency]);
    
    
  return (
    <div>
        
    </div>
  )
}
export default CoinTable
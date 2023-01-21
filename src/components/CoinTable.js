import { Container, createTheme, ThemeProvider, Typography } from '@material-ui/core';
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
    };
    useEffect(() => {
      fetchCoins();
    }, [currency]);
    
  const darkTheme=createTheme({
    palette:{
      main:"#fff"
    },
    type:"dark"
  })
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
          <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}}>
          
          </Typography>
        </Container>
    </ThemeProvider>
  )
}
export default CoinTable
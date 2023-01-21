import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from './Api';
import { CryptoState } from './Contex';



const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));


function CoinInfo(coin) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);
  const classes = useStyles();
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    
  }, [days]);


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData?(
            <CircularProgress style={{color: 'gold'}} size={250} thickness={1}/>
          ):(
          <>
          <Line>
            
          </Line>
          </>
          )
        }
      </div>

    </ThemeProvider>
  )
}

export default CoinInfo;
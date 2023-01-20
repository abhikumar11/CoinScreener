import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "./Api";
import { CryptoState } from "./Contex";

const useStyles = makeStyles(() => ({
     carousel: {
          height: "50%",
          display: "flex",
          alignItems: "center",
     },
}));
function Carousel() {
     const [trending, setTrending] = useState([]);
     const classes = useStyles();
     const { currency } = CryptoState();
     const fetchCoins = async () => {
          const { data } = await axios.get(TrendingCoins(currency));
          setTrending(data);
     };
     console.log(trending);
     useEffect(() => {
          fetchCoins();
     }, [currency]);
     return <div className={classes.carousel}>Carousel</div>;
}

export default Carousel;

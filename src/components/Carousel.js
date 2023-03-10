import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "./Api";
import { CryptoState } from "./Contex";

const useStyles = makeStyles(() => ({
     carousel: {
          height: "50%",
          display: "flex",
          alignItems: "center",
     },
     carouselItem:{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform:"uppercase",
          color:"white",
     }
}));
 export function numberWithCommas(num)
 {
     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
 };
function Carousel() {
     const [trending, setTrending] = useState([]);
     const classes = useStyles();
     const { currency,symbol } = CryptoState();
     const fetchCoins = async () => {
          const { data } = await axios.get(TrendingCoins(currency));
          setTrending(data);
     };
     console.log(trending);
     useEffect(() => {
          fetchCoins();
     }, [currency]);
     const responsive = {
          0: {
               items: 2,
          },
          512: {
               items: 4,
          },
     };
     const items = trending.map((item) => {
          const change=item.price_change_percentage_24h>=0;
          return (
               <Link className={classes.carouselItem} to={`/coins/${item.id}`}>
                    <img
                         src={item.image}
                         alt={item.name}
                         height="80"
                         style={{ marginBottom: 10 }}
                    />
                    <span>
                         {item.symbol} &nbsp;
                         <span style={{color:change>0?"green":"red"}}>
                              {change&&'+'}{item.price_change_percentage_24h.toFixed(2)}%
                         </span>
                    </span>
                    <span style={{fontSize:22,fontWeight:500}}>
{symbol}{numberWithCommas(item.current_price.toFixed(2))}
                    </span>
               </Link>
          );
     });

     return (
          <div className={classes.carousel}>
               <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={2000}
                    responsive={responsive}
                    autoPlay
                    disableButtonsControls
                    disableDotsControls
                    items={items}
               />
          </div>
     );
}

export default Carousel;

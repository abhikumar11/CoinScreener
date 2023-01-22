import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CryptoState } from "./Contex";
import {
     Chart as ChartJS,
     LineElement,
     CategoryScale,
     LinearScale,
     PointElement,
} from "chart.js";
import { HistoricalChart } from "./Api";
import axios from "axios";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function CoinInfo(coin) {
     const [historicData, setHistoricData] = useState("");
     const [days, setDays] = useState(1);
     const { currency } = CryptoState();

     const fetchData = async () => {
          const { data } = await axios.get(
               HistoricalChart(coin.id, days, currency)
          );
          setHistoricData(data);
     };
     useEffect(() => {
          fetchData();
     }, []);

     return <div></div>;
}

export default CoinInfo;

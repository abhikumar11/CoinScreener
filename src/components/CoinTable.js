import {
  CircularProgress,
  Container,
  createTheme,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "./Api";
import { CryptoState } from "./Contex";
import{numberWithCommas} from "./Carousel";
const useStyles = makeStyles(() => ({
  row:{
    backgroundColor:"#16171a",
    cursor:"pointer",
    fontFamily:"Montserrat",
    "&:hover":{
      backgroundColor:"#131111",
    }
    }}));


function CoinTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency,symbol } = CryptoState();
  const history = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
           main: "#fff",
      },
      type: "dark",
 },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 30, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <CircularProgress />
          ) : (
            <Table>
              <TableHead
                style={{ backgroundColor: "#eebc1d" }}
              >
                <TableRow>
                  {[
                    "Coin",
                    "Price",
                    "1 Day Change",
                    "Market Cap",
                  ].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily:
                          "Montserrat",
                      }}
                      key={head}
                      align={
                        head === "Coin"
                          ? ""
                          : "right"
                      }
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit =
                    row.price_change_percentage_24h >
                    0;
                  return (
                    <TableRow
                      onClick={() =>
                        history(
                          `/coins/${row.id}`
                        )
                      }
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell component='th' scope='row'
                      style={{display: 'flex',gap:15}} 
                      >
                        <img 
                        src={row.image}
                        alt={row.name}
                        height="50"
                        style={{marginBottom:10}}
                        />
                        <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{textTransform:"uppercase",fontSize:22}}>
                          {row.symbol}
                        </span>
                        <span style={{color:"white"}}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell  align="right">
                        {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell align="right" style={{
                        color:profit>=0?"green":"red",fontWeight:500,
                      }}>
                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {
                        numberWithCommas(row.market_cap.toString().slice(0,-6))
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}
export default CoinTable;

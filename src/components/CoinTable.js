import {
  CircularProgress,
  Container,
  createTheme,
  LinearProgress,
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


const useStyles = makeStyles(() => ({
  row: {

  },
}));


function CoinTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
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
      main: "white",
    },
    type: "dark",
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
          style={{ marginbottom: 20, width: "100%" }}
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
                        <span style={{color:"darkgray"}}>{row.name}</span>
                        </div>
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

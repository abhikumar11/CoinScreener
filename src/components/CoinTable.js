import {
     CircularProgress,
     Container,
     createTheme,
     LinearProgress,
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
import { CoinList } from "./Api";
import { CryptoState } from "./Contex";

function CoinTable() {
     const [coins, setCoins] = useState([]);
     const [loading, setLoading] = useState(false);
     const [search, setSearch] = useState("");
     const { currency } = CryptoState();
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
                                                       key={row.id}
                                                  ></TableRow>
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

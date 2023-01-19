import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
     banner: {
          background: "URL(./backimage.jpg)",
     },
     bannercontent: {
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
     },
     tagline:{
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
     }
}));
function Banner() {
     const classes = useStyles();
     return (
          <div className={classes.banner}>
               <Container className={classes.bannercontent}>
                    <div className={classes.tagline}>
                         <Typography
                              variant="h2"
                              style={{
                                   fontWeight: "bold",
                                   marginBottom: 15,
                                   fontFamily: "Montserrat",
                              }}
                         >
                              Crypto Screener
                         </Typography>
                         <Typography
                              variant="subtitle2"
                              style={{
                                   color: "gold",
                                   textTransform:'capitalize',
                                   fontFamily: "Montserrat",
                              }}
                         >
                              Get all the information about cryptocurrencies 
                         </Typography>
                    </div>
               </Container>
          </div>
     );
}

export default Banner;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Contex from "./components/Contex";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <React.StrictMode>
          <Contex>
               <App />
          </Contex>
     </React.StrictMode>
);

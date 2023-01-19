import { Switch } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Coins from "./components/Coins";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
     return (
          <BrowserRouter>
               <Header />
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coins" element={<Coins />} />
               </Routes>
          </BrowserRouter>
     );
}

export default App;

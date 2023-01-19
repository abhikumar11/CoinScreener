import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Coins from './components/Coins';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Route path='/' component={Home}/>
    <Route path='/coins/' component={Coins}/> 
    </BrowserRouter>
  );
}

export default App;

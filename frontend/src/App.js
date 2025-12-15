import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Cart from "./components/Cart";
import Order from './components/Order';



function App() {
  return (
    
  <Routes>
    <Route path="/" element={<Navigate to="/menu" replace />}/>
    <Route path="/menu" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/order" element={<Order/>}/>

  </Routes>
 

  );
}

export default App;

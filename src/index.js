import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Item from "./Item";
import Navbar from "./Navbar";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/items" element={<Item/>}/>
      <Route path="/" element={<App />}/>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();

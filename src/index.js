import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './SearchRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route  path="/" element={<App />} />
      <Route  path="search" element={<Search />} >
        <Route path="=:value" /> 
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './SearchRoute';

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  // <BrowserRouter>
  <HashRouter>
    <Routes>
      <Route  path="newsfeed/" element={<App />} />
      <Route  path="newsfeed/search" element={<Search />} >
        <Route path="=:value" /> 
      </Route>
    </Routes>
    </HashRouter>,
  //</BrowserRouter>,
  document.getElementById('root')
);

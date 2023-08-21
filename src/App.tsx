import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;

/* <div className="meals">
<span className="logo">TRYBE</span>
<object
  className="rocksGlass"
  type="image/svg+xml"
  data={ rockGlass }
>
  Glass
</object>
</div> */

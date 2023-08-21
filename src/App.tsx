import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <Routes>
        <Route path="/" element={ <h1>...</h1> } />
        <Route path="" element={ <Layout /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <h1>...</h1> } />
          <Route path="/done-recipes" element={ <h1>...</h1> } />
          <Route path="/favorite-recipes" element={ <h1>...</h1> } />
        </Route>
        <Route path="/meals/:id-da-receita" element={ <h1>...</h1> } />
        <Route path="/drinks/:id-da-receita" element={ <h1>...</h1> } />
        <Route path="/meals/:id-da-receita/in-progress" element={ <h1>...</h1> } />
        <Route path="/drinks/:id-da-receita/in-progress" element={ <h1>...</h1> } />
      </Routes>
    </>
  );
}

export default App;

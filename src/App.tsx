import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="" element={ <Layout /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <h1>...</h1> } />
          <Route path="/done-recipes" element={ <h1>...</h1> } />
          <Route path="/favorite-recipes" element={ <h1>...</h1> } />
        </Route>
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id-da-receita/in-progress" element={ <h1>...</h1> } />
        <Route path="/drinks/:id-da-receita/in-progress" element={ <h1>...</h1> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

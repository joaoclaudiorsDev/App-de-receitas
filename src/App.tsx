import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout';
import Recipes from './components/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="" element={ <Layout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <h1>...</h1> } />
          <Route path="/favorite-recipes" element={ <h1>...</h1> } />
        </Route>
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <h1>...</h1> } />
        <Route path="/drinks/:id/in-progress" element={ <h1>...</h1> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

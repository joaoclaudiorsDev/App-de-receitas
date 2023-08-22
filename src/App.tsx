import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Layout } from './components/Layout';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import { ReduxState } from './types';
import Drink from './pages/Drink';
import Meal from './pages/Meal';

function App() {
  const recipes = useSelector(
    (state: ReduxState) => {
      const result = state.recipes;
      if (result.drinkRecipes.length === 1) {
        return result.drinkRecipes[0].idDrink;
      }
      if (result.mealRecipes.length === 1) {
        return result.mealRecipes[0].idMeal;
      }
    },
  );

  return (
    <Routes>
      <Route path="/" element={ <h1>...</h1> } />
      <Route path="" element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <h1>...</h1> } />
        <Route path="/done-recipes" element={ <h1>...</h1> } />
        <Route path="/favorite-recipes" element={ <h1>...</h1> } />
      </Route>
      <Route path={ `/meals/${recipes}` } element={ <Meal /> } />
      <Route path={ `/drinks/${recipes}` } element={ <Drink /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <h1>...</h1> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <h1>...</h1> } />
    </Routes>
  );
}

export default App;

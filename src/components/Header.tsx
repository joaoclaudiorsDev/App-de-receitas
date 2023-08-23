import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      {pathname === '/meals' && (
        <div>
          <h1 data-testid="page-title">Meals</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
          <button onClick={ () => setShowSearchBar(!showSearchBar) }>
            <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
          </button>
          {showSearchBar && (
            <SearchBar />
          )}
        </div>
      )}
      {pathname === '/drinks' && (
        <div>
          <h1 data-testid="page-title">Drinks</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
          <button onClick={ () => setShowSearchBar(!showSearchBar) }>
            <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
          </button>
          {showSearchBar && (
            <SearchBar />
          )}
        </div>
      )}
      {pathname === '/profile' && (
        <div>
          <h1 data-testid="page-title">Profile</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
        </div>
      )}
      {pathname === '/done-recipes' && (
        <div>
          <h1 data-testid="page-title">Done Recipes</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
        </div>
      )}
      {pathname === '/favorite-recipes' && (
        <div>
          <h1 data-testid="page-title">Favorite Recipes</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

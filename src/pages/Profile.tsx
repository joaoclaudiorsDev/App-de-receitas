import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem('user');
  let userEmail = {} as any;
  if (email) {
    userEmail = JSON.parse(email);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h3 data-testid="profile-email">{userEmail.email}</h3>
      <button
        onClick={ () => navigate('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes

      </button>
      <button
        onClick={ () => navigate('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button
        onClick={ handleLogout }
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;

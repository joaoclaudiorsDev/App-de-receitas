import { NavLink } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTop: '1px solid #ddd',
        padding: '10px 0',
      } }
    >
      <nav>
        <NavLink to="/drinks">
          <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="" />
        </NavLink>
        <NavLink to="meals">
          <img src={ mealIcon } data-testid="meals-bottom-btn" alt="" />
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;

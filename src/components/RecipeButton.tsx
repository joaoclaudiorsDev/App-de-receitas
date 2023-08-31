import { NavigateFunction } from 'react-router-dom';

type RecipeButtonProps = {
  pathname: string;
  navigate: NavigateFunction;
  name: string;
};

export function RecipeButton({ name, navigate, pathname }: RecipeButtonProps) {
  return (
    <div style={ { position: 'fixed', bottom: '0' } }>
      <button
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => navigate(`${pathname}/in-progress`) }
      >
        {name}
      </button>
    </div>
  );
}

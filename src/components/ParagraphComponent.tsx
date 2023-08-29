import { DoneRecipeType } from '../types';

type ParagraphProps = {
  recipe: DoneRecipeType,
  index: number,
};
function ParagraphComponent({ recipe, index }: ParagraphProps) {
  if (recipe.type === 'meal') {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe.nationality} - ${recipe.category}` }
      </p>
    );
  }
  if (recipe.type === 'drink') {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
    );
  }
}
export default ParagraphComponent;

import styles from './Checklist.module.css';

type ChecklistProps = {
  ingredient: string;
  index: number;
  localStoreIngredients: string[];
  handleCheckboxChange: (ingredient: string) => void;
  mesures: string[] | undefined;
};

export function Checklist({
  handleCheckboxChange,
  index,
  ingredient,
  localStoreIngredients,
  mesures,
}: ChecklistProps) {
  return (
    <li key={ index }>
      <label
        className={
          localStoreIngredients.includes(ingredient) ? styles.done : ''
        }
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          name=""
          id={ ingredient }
          onChange={ () => handleCheckboxChange(ingredient) }
          checked={ localStoreIngredients.includes(ingredient) }
        />
        <span>
          {`${ingredient} - ${mesures?.[index]}`}
        </span>
      </label>
    </li>
  );
}

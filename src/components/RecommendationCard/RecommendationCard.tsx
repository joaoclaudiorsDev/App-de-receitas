import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { fetchDrinksRecommendation,
  fetchMealsRecommendation } from '../../utils/fetchAPI';
import { RecommendationType } from '../../types';
import './RecommendationCard.css';

function RecommendationCard(recipeCategory: string) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);

  const fetchRecommendations = async () => {
    const MAX_RECOMMENDATIONS = 6;
    const MIN_RECOMMENDATIONS = 0;
    const recipes = recipeCategory === 'meals'
      ? await fetchMealsRecommendation() : await fetchDrinksRecommendation();
    const recommendationsData = recipes.slice(MIN_RECOMMENDATIONS, MAX_RECOMMENDATIONS);
    setRecommendations(recommendationsData);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="card">
      <motion.div ref={ carouselRef } className="carousel">
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={ { right: 600, left: -600 } }
        >
          {recommendations.map((recommendation, index) => (
            <motion.div
              className="item"
              key={ recipeCategory === 'meals'
                ? recommendation.idMeal : recommendation.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ recipeCategory === 'meals'
                  ? recommendation.strMealThumb : recommendation.strDrinkThumb }
                alt={ recipeCategory === 'meals'
                  ? recommendation.strMeal : recommendation.strDrink }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                { recipeCategory === 'meals'
                  ? recommendation.strMeal : recommendation.strDrink }
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RecommendationCard;

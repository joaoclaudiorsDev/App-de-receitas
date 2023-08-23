import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinksRecommendation,
  fetchMealsRecommendation } from '../../utils/fetchAPI';
import { RecommendationType } from '../../types';
import './RecommendationCard.css';

function RecommendationCard() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);

  const fetchRecommendations = async () => {
    const MAX_RECOMMENDATIONS = 6;
    const MIN_RECOMMENDATIONS = 0;
    const recipes = pathname.includes('meals')
      ? await fetchDrinksRecommendation() : await fetchMealsRecommendation();
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
          initial={ { x: 600 } }
        >
          {recommendations.map((recommendation, index) => (
            <motion.div
              className="item"
              key={ pathname.includes('meals')
                ? recommendation.idDrink : recommendation.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ pathname.includes('meals')
                  ? recommendation.strDrinkThumb : recommendation.strMealThumb }
                alt={ pathname.includes('meals')
                  ? recommendation.strDrink : recommendation.strMeal }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                { pathname.includes('meals')
                  ? recommendation.strDrink : recommendation.strMeal }
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RecommendationCard;

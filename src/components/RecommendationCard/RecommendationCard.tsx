import { motion } from 'framer-motion';

function RecommendationCard(recommendations: RecommendationsType) {
  return (
    <div className="card">
      <motion.div className="carousel">
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={ { left: -1800, right: 0 } }
        >
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={ recommendation.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ recommendation.strMealThumb } alt={ recommendation.strMeal } />
              <p data-testid={ `${index}-recommendation-title` }>
                { recommendation.strMeal }
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RecommendationCard;

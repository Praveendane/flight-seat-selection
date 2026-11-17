
import { Leaf, Drumstick, Coffee, Utensils } from "lucide-react";

const meals = [
  {
    id: "vegetarian",
    name: "Vegetarian Meal",
    description: "Rice, dal and fresh vegetables",
    price: 250,
    icon: Leaf,
  },
  {
    id: "non-vegetarian",
    name: "Non-Vegetarian Meal",
    description: "Chicken meal with delicious sides",
    price: 350,
    icon: Drumstick,
  },
  {
    id: "none",
    name: "No Meal",
    description: "Travel without a meal",
    price: 0,
    icon: Coffee,
  },
];

function MealSelection({
  activePassengerId,
  getPassengerMeal,
  onMealSelect,
}) {
  const selectedMeal = getPassengerMeal(activePassengerId);

  return (
    <section className="meal-selection">
      <div className="meal-heading">
        <div>
          <p className="eyebrow">IN-FLIGHT DINING</p>
          <h2>Choose Your Meal</h2>
          <p className="meal-subtitle">
            Select a meal for your active passenger.
          </p>
        </div>

        <Utensils size={23} aria-hidden="true" />
      </div>

      <div className="meal-options">
        {meals.map((meal) => {
          const MealIcon = meal.icon;
          const isSelected = selectedMeal === meal.id;

          return (
            <button
              type="button"
              key={meal.id}
              className={`meal-card ${isSelected ? "selected" : ""}`}
              onClick={() => onMealSelect(meal.id)}
              aria-pressed={isSelected}
              aria-label={`${meal.name}, ${
                meal.price === 0 ? "Free" : `₹${meal.price}`
              }`}
            >
              <div className="meal-icon">
                <MealIcon size={23} aria-hidden="true" />
              </div>

              <div className="meal-details">
                <strong>{meal.name}</strong>
                <span>{meal.description}</span>
              </div>

              <div className="meal-price">
                {meal.price === 0 ? "Free" : `₹${meal.price}`}
              </div>

              <div className="meal-radio" aria-hidden="true">
                {isSelected && <span />}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MealSelection;

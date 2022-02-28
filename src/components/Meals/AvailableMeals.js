import mealsData from "../../res/js/fakeMealsData.js";
import classes from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./Mealitem/MealItem.js";

const AvailableMeals = () => {
  const [meals, setMeals] = useState();

  useEffect(() => {
    setMeals(mealsData);
  }, []);

  return (
    <section className={classes.meals}>
      <ul>
        {meals &&
          meals.map((meal) => {
            return (
              <li>
                <Card>
                  <MealItem
                    id={meal.id}
                    key={meal.id}
                    name={meal.name}
                    price={meal.price}
                    description={meal.description}
                  />
                </Card>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default AvailableMeals;

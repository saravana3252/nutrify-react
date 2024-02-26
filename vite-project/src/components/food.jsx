import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

function Food(props) {
  const [eatenQuantity, setEatenQuantity] = useState(100);
  const [food, setFood] = useState({});
  const [infood, setinFood] = useState({});
  const loggedData = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFood(props.food);
    setinFood(props.food);
    console.log(loggedData);
  }, [props.food]);

  function calculateMacros(event) {
    if (event.target.value.length != 0) {
      let quantity = Number(event.target.value);
      setEatenQuantity(quantity);
      let copyfood = { ...food };

      copyfood.protein = (infood.protein * quantity) / 100;
      copyfood.fiber = (infood.fiber * quantity) / 100;
      copyfood.fat = (infood.fat * quantity) / 100;
      copyfood.carbohydrates = (infood.carbohydrates * quantity) / 100;
      copyfood.calories = (infood.calories * quantity) / 100;
      console.log(copyfood);
      setFood(copyfood);
    }
  }

  function trackMacros() {
    let track = {
      user: loggedData.loggedUser.userId,
      food: food._id,
      details: {
        calories: food.calories,
        protein: food.protein,
        carbohydrates: food.carbohydrates,
        fat: food.fat,
        fiber: food.fiber,
      },
      quantity: eatenQuantity,
    };
    console.log(track);
    fetch('http://localhost:8000/track', {
      method: 'POST',
      body: JSON.stringify(track),
      headers: {
        Authorization: `Bearer ${loggedData.loggedUser.token}`,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/track');
  }

  return (
    <div className="food-container">
      <div className="img-food">
        <img src={food.imgUrl}></img>
      </div>
      <h1 className="food-h1">
        {food.name} {food.calories} KCAL for {eatenQuantity}G
      </h1>
      <div className="nutrient-container">
        <div className="nutrient">
          <p className="nutri-title">protein</p>
          <p className="nutri-value">{food.protein}g</p>
        </div>
        <div className="nutrient">
          <p className="nutri-title">fiber</p>
          <p className="nutri-value">{food.fiber}g</p>
        </div>
        <div className="nutrient">
          <p className="nutri-title">fat</p>
          <p className="nutri-value">{food.fat}g</p>
        </div>
        <div className="nutrient">
          <p className="nutri-title">carbohydrates</p>
          <p className="nutri-value">{food.carbohydrates}g</p>
        </div>
      </div>
      <input
        type="number"
        className="form-control"
        placeholder="enter quantity"
        onChange={calculateMacros}
      ></input>
      <br></br>
      <button className="btn btn-md btn-primary" onClick={trackMacros}>
        TRACK
      </button>
    </div>
  );
}
export default Food;

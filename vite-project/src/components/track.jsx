import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { userContext } from '../context/userContext';
import Header from './header';

function Track() {
  const loggedData = useContext(userContext);
  const [foodData, setfoodData] = useState([]);
  const [date, setDate] = useState(new Date());

  let [total, setTotal] = useState({
    totalProtein: 0,
    totalFats: 0,
    totalFiber: 0,
    totalCarbs: 0,
    totalCalories: 0,
  });

  function CalculateToTMac() {
    let totalcopy = {
      totalProtein: 0,
      totalFats: 0,
      totalFiber: 0,
      totalCarbs: 0,
      totalCalories: 0,
    };
    foodData.forEach((foodData) => {
      totalcopy.totalProtein += foodData.details.protein;
      totalcopy.totalFats += foodData.details.fat;
      totalcopy.totalFiber += foodData.details.fiber;
      totalcopy.totalCarbs += foodData.details.carbohydrates;
      totalcopy.totalCalories += foodData.details.calories;
    });
    setTotal(totalcopy);
    console.log(totalcopy);
  }

  useEffect(() => {
    CalculateToTMac();
  }, [foodData]);

  useEffect(() => {
    fetch(
      `http://localhost:8000/track/${
        loggedData.loggedUser.userId
      }/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loggedData.loggedUser.token}`,
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setfoodData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <>
      <Header></Header>
      <div className="inp-dateCon">
        <input
          className="inp-date"
          type="date"
          onChange={(event) => {
            setDate(new Date(event.target.value));
          }}
        ></input>
      </div>
      {foodData.map((data) => {
        return (
          <>
            <section className="diet-container">
              <div className="items">
                <h1>
                  {data.food.name} {data.details.calories} KCAL for{' '}
                  {data.quantity}G
                </h1>

                <p>
                  protein {data.details.protein}g fat {data.details.fat}g fiber
                  {data.details.fiber}g carbohydrates{' '}
                  {data.details.carbohydrates}g
                </p>
              </div>
            </section>
          </>
        );
      })}

      <div className="items">
        <h1>{total.totalCalories} KCAL</h1>
        <p>
          protein {total.totalProtein}g fat {total.totalFats}g fiber
          {total.totalFiber}g carbohydrates {total.totalCarbs}g
        </p>
      </div>
    </>
  );
}

export default Track;

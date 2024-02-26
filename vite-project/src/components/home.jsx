import Header from './header';
import { userContext } from '../context/userContext';
import { useContext } from 'react';
import { useState } from 'react';
import Food from './food';
import DisMessage from './disMessage';

function Home() {
  const loggedData = useContext(userContext);
  const [foodData, setfoodData] = useState([]);
  const [food, setFood] = useState(null);

  function inpTrack(event) {
    if (event.target.value.length !== 0) {
      fetch(`http://localhost:8000/foods/${event.target.value}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loggedData.loggedUser.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === undefined) {
            setfoodData(data);
          } else {
            setfoodData([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(foodData);
    } else {
      setfoodData([]);
    }
  }

  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="track-container">
        <input
          type="search"
          className="inp-track"
          placeholder="search food"
          onChange={inpTrack}
        />
        <div className="search-container">
          {foodData.length !== 0 ? (
            <div className="item-section">
              {foodData.map((item) => {
                return (
                  <p
                    className="item"
                    key={item._id}
                    onClick={() => {
                      setFood(item);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          ) : null}
        </div>

        {food != null ? <Food food={food}></Food> : <DisMessage></DisMessage>}
      </div>
    </>
  );
}
export default Home;

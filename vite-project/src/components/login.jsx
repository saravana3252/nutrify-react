import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });
  const loggedData = useContext(userContext);

  const navigate = useNavigate();

  function HandleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setMessage({ type: 'error', text: 'email does not exist' });
        } else if (res.status === 403) {
          setMessage({ type: 'error', text: 'incorrect password' });
        }

        setTimeout(() => {
          setMessage({ type: 'invisible-msg', text: 'dummy text' });
        }, 5000);
        return res.json();
      })

      .then((datas) => {
        console.log(datas);
        if (datas.token !== undefined) {
          localStorage.setItem('nutrify-users', JSON.stringify(datas));
          loggedData.setloggedUser(datas);
          console.log(loggedData);
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function HandleInput(event) {
    setData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }
  return (
    <>
      <section className="form-container ">
        <form className="form form-login" onSubmit={HandleSubmit}>
          <h1>Start Your Fitness</h1>
          <input
            className="form-control"
            type="email"
            placeholder="enter your email"
            required
            onChange={HandleInput}
            name="email"
            value={data.email}
          ></input>
          <input
            className="form-control"
            type="password"
            placeholder="enter your password"
            required
            maxLength={10}
            onChange={HandleInput}
            name="password"
            value={data.password}
          ></input>
          <button className="btn btn-md btn-primary">LOGIN</button>
          <p className="p-regis">
            Not Registered ?
            <Link className="link-regis" to="/register">
              Register
            </Link>
          </p>
          <p className={message.type}>{message.text}</p>
        </form>
      </section>
    </>
  );
}

export default Login;

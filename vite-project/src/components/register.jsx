import { json, Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  let [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });

  let [message, setMessage] = useState({
    type: '',
    text: '',
  });
  function HandleSubmit(event) {
    event.preventDefault();
    console.log(data);
    fetch('http://localhost:8000/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((messageData) => {
        setMessage({ type: 'success', text: messageData.message });
      });

    setTimeout(() => {
      setMessage({ type: 'invisible-msg', text: 'dummy text' });
    }, 5000);
  }

  function HandleInput(event) {
    setData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }

  return (
    <section className="form-container">
      <form className="form form-reg" onSubmit={HandleSubmit}>
        <h1>Start Your Fitness</h1>
        <input
          className="form-control"
          type="text"
          placeholder="enter your name"
          required
          onChange={HandleInput}
          name="name"
          value={data.name}
        ></input>
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
        <input
          className="form-control"
          type="number"
          placeholder="enter your age"
          min={10}
          max={50}
          required
          onChange={HandleInput}
          name="age"
          value={data.age}
        ></input>
        <button className="btn btn-md btn-primary" onC>
          REGISTER
        </button>
        <p className="p-regis">
          Already Registered ?
          <Link className="link-log" to="/login">
            Login
          </Link>
        </p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
}

export default Register;

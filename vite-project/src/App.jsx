import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import { useContext, useState, useEffect } from 'react';
import { userContext } from './context/userContext';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Private from './components/private';
import Track from './components/track';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
  useEffect(() => {
    console.log(loggedUser);
  });
  let [loggedUser, setloggedUser] = useState(
    JSON.parse(localStorage.getItem('nutrify-users'))
  );
  return (
    <>
      <userContext.Provider value={{ loggedUser, setloggedUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/home" element={<Private Component={Home} />} />
            <Route path="/track" element={<Private Component={Track} />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;

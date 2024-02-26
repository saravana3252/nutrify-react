import { userContext } from '../context/userContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  let loggedData = useContext(userContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('nutrify-users');
    loggedData.setloggedUser(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg mynav">
        <div className="container-fluid mycont">
          <a class="navbar-brand" href="#">
            NUTRIFY-FRESH
          </a>
          <button
            className="navbar-toggler myicon"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon myicon navbar-dark"></span>
          </button>
          <div className="collapse navbar-collapse myulnav " id="navbarNav">
            <ul className="navbar-nav ms-auto myul">
              <li className="nav-item myli">
                <Link to="/home" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item  myli ">
                <Link to="/track" className="nav-link active">
                  TRACK
                </Link>
              </li>
              <li className="nav-item  myli">
                <Link to="/#" className="nav-link active" onClick={logOut}>
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;

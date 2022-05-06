import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getCurrentUserId } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = useSelector(getCurrentUserId());

  const toggleNavbar = () => {
    setShowNavbar((prevState) => !prevState);
  };

  const checkIsLoggedIn = () => {
    return isLoggedIn ? "nav-link" : "nav-link disabled";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient mb-3">
      <div className="container-fluid">
        <Link aria-current="page" to="/">
          <h2>
            <span className="badge bg-light text-dark">Notepad</span>
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={"collapse navbar-collapse" + (showNavbar ? " show" : "")}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={checkIsLoggedIn()}
                aria-current="page"
                to={`/tasks/${userId}`}
              >
                Список заметок
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                <span className="text-white">Вход/Регистрация</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

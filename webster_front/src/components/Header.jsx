import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logoutClick = () => {
    dispatch(logout());
    navigate('/');
    location.reload();
  };
  return user.user ? (
    <>
      <div className="header-container">
        <div className="header-logo-container">
          <div className="h-14 w-28">
            <img
              src="logo.png"
              alt="logo"
              className="header-logo"
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
        </div>
        <div className="header-links-container">
          <Link
            to="/"
            className="flex glow text justify-center items-center text-lg m-5 text-beige hover:animate-pulse"
          >
            Workspace
          </Link>
          <Link
            to="/posts"
            className="flex glow text justify-center items-center text-lg m-5 text-beige hover:animate-pulse"
          >
            Posts
          </Link>
          <Link
            to="/profile"
            className="flex glow text justify-center items-center text-lg m-5 text-beige hover:animate-pulse"
          >
            Profile
          </Link>
        </div>
        <div className="header-logout-container">
          <div className="header-logout-div">
            <button className="header-log-button purple" onClick={logoutClick}>
              <p className='text-white'>Logout</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 text-red-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="header-container">
        <div className="header-logo-container">
          <div className="h-14 w-28">
            <img
              src="logo.png"
              alt="logo"
              className="header-logo"
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
        </div>
        <div className="header-logout-container">
          <div className="header-logout-div">
            <button
              className="header-log-button purple"
              onClick={() => {
                navigate('/');
              }}
            >
              <p className='text-white'>Log in</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 text-emerald-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

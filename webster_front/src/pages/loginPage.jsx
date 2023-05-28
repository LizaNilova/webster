import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice.js';
import '../styles/loginPage.scss';
import { userProfile } from '../redux/userSlice.js';
import '../styles/glitch.scss';

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userProfile());
    if (status === 'The user is authorized') {
      navigate('/');
    }
    console.log(status);
    setErrorText(status);
    if (status !== 'The user is authorized' && status) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
    }
  }, [status, dispatch, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(
        loginUser({
          username_or_email: login,
          password,
        })
      );
      setErrorText(status);
    } catch (error) {
      // console.log(error);
    }
  };

  const closeError = () => {
    setErrorVisible(false);
  };
  console.log(status)
  return (
    <form onSubmit={(e) => e.preventDefault()} className="main-container">
      <div className="login-card diagonal-gridlines card-border bb-login">
        <div className="glitch-box">
          <h3 className="glitch-text">sign in</h3>
        </div>
        {/* <p className='p-0 m-0 text-end text-[#ff2c6d]'>{status}</p> */}
        <div className="separator"></div>
        <div className="flex flex-col justify-center items-center w-full">
          <div
            className={`field my-3 w-2/3 ${
              status?.username?.constraints[0] ? 'error' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <label className="glow text">Login/email</label>
              <span className="text-[#ff2c6d]">
                {status?.username?.constraints[0]
                  ? status?.username?.constraints[0]
                  : ''}
              </span>
            </div>
            <input
              type="text"
              className="text-white p-2"
              //   required="required"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className={`field my-3 w-2/3 ${
              status?.password?.constraints[0] ? 'error' : ''
            }`}>
            <div className="flex justify-between items-center">
              <label className="glow text">Password</label>
              <span className="text-[#ff2c6d]">
                {status?.password?.constraints[0]
                  ? status?.password?.constraints[0]
                  : ''}
              </span>
            </div>
            <input
              type="password"
              className="text-white p-2"
              //   required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* {errorVisible && (
                        <div className="flex flex-col rounded-lg bg-purple-400 p-2 pt-1 bg-opacity-20 border-0">
                            <div className="flex justify-end">
                                <Link
                                    className="flex text-center justify-center w-fit h-fit rounded-sm pr-1 pl-1 text-xs text-beige"
                                    onClick={closeError}
                                >
                                    x
                                </Link>
                            </div>

                            <p className="items-center text-sm mb-2 text-yellow-500">
                                <b>{errorText}</b>
                            </p>
                        </div>
                    )} */}

          {/* {!errorVisible && (
                        <div className="flex flex-col p-2 pt-1 opacity-0 border-0">
                            <div className="flex justify-end">
                                <Link
                                    className="flex text-center justify-center w-fit h-fit rounded-sm pr-1 pl-1 text-xs text-beige"
                                    onClick={closeError}
                                >
                                    x
                                </Link>
                            </div>

                            <p className="items-center text-sm mb-2 text-yellow-500">
                                <b>{errorText}</b>
                            </p>
                        </div>
                    )} */}

          <div className="flex flex-col gap-2 mt-3 items-center justify-center">
            <Link
              to="/auth/resetPassword"
              className="flex justify-center items-center text-xs text-beige hover:text-light-beige hover:transition-[1s]"
            >
              Forgot password?
            </Link>
            <div className="w-fit">
              <button
                className="button btn-skew"
                type="submit"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </div>
            <Link
              to="/registration"
              className="flex justify-center items-center text-xs m-3 text-beige hover:text-light-beige hover:transition-[1s]"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

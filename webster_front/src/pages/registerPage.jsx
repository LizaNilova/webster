import React from 'react';
import { useState } from 'react';
import { registerUser, setRegErrorTexts } from '../redux/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../styles/registerPage.scss';
import '../styles/glitch.scss';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatError, setRepeatError] = useState('');

  const { status } = useSelector((state) => state.auth);
  const { regErrorTexts } = useSelector((state) => state.auth);
  const { eventId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'Send mail' && eventId) {
      navigate(`/confirm/${eventId}`);
    }
  }, [status, navigate, eventId]);

  useEffect(() => {
    if (regErrorTexts?.password) {
      setRepeatPassword('');
      setPassword('');
    }
  }, [regErrorTexts]);

  const handleSubmit = () => {
    try {
      dispatch(
        registerUser({
          login,
          password,
          email,
          passwordComfirm: repeatPassword,
        })
      );
      if (eventId) {
        navigate(`/confirm/${eventId}`);
      }
      checkPasswords();
    } catch (error) {
      console.log(error);
    }
  };

  const checkPasswords = () => {
    if (password !== repeatPassword) {
      if (repeatPassword !== '') {
        setRepeatError("Passwords don't match");
        setRepeatPassword('');
      } else {
        if (!regErrorTexts?.password) {
          setRepeatError('Please, repeat password here');
        }
      }
    } else {
      setRepeatError('');
    }
  };
  console.log('regErrorTexts', regErrorTexts);
  return (
    <form onSubmit={(e) => e.preventDefault()} className="main-container">
      <div className="card diagonal-gridlines card-border bb">
        <div className="glitch-box">
          <h3 className="glitch-text text-[25px]" data-text="sign up">
            sign up
          </h3>
        </div>

        <div className={`flex flex-col field w-full ${regErrorTexts?.login ? 'error' : ''}`}>
          <div className="flex flex-row justify-between items-center">
            <label className="glowtext">Login</label>
            <p className="text-red-600">{regErrorTexts?.login}</p>
          </div>
          <input
            type="text"
            // required="required"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="text-white p-1"
          />
        </div>

        <div className={`flex flex-col field w-full ${regErrorTexts?.email ? 'error' : ''}`}>
          <div className="flex flex-row justify-between items-center">
            <label className="glowtext">
              Email
              {/* <p className="text-red-600">АЩИБКА</p> */}
            </label>
            <p className="text-red-600">{regErrorTexts?.email}</p>
          </div>
          <input
            type="text"
            // required="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white p-1"
          />
        </div>

        <div className={`flex flex-col field w-full ${regErrorTexts?.password ? 'error' : ''}`}>
          <div className="flex flex-row justify-between items-center">
            <label className="glowtext">
              Password
              {/* <p className="text-red-600">АЩИБКА</p> */}
            </label>
            <p className="text-red-600">{regErrorTexts?.password}</p>
          </div>
          <input
            type="password"
            // required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white p-1"
          />
        </div>
        <div className={`flex flex-col field w-full ${regErrorTexts?.passwordConfirm ? 'error' : ''}`}>
          <div className="flex flex-row justify-between items-center">
            <label className="glowtext">
              Confirm password
              {/* <p className="text-red-600">АЩИБКА</p> */}
            </label>
            <p className="text-red-600">{regErrorTexts?.passwordConfirm}</p>
          </div>
          <input
            type="password"
            // required="required"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="text-white p-1"
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-fit mt-5">
            <button
              className="button btn-skew"
              type="submit"
              onClick={handleSubmit}
            >
              Create account
            </button>
          </div>
          <Link
            to="/"
            className="flex justify-center items-center text-xs m-5 text-beige hover:text-gray-200 hover:transition-[1s]"
            onClick={setRegErrorTexts()}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </form>
  );
};

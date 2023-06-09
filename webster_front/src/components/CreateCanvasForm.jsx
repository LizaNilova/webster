import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurProject, setData } from '../redux/CanvasSlice';
import '../styles/Forms.css';
import '../styles/glitch.scss';
const CreateCanvasForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: 'Unnamed',
    width: null,
    height: null,
    color: '#FFFFFF',
    errMessage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errMessage: '',
    }));
  };

  const handleSubmit = () => {
    if (state.width < 100 || state.height < 100) {
      setState((prevState) => ({
        ...prevState,
        errMessage: 'Width and height can`t be less then 100 px',
      }));
    }
    if (state.width && state.height && state.name) {
      dispatch(
        setData({
          width: state.width,
          height: state.height,
          color: state.color,
          name: state.name,
        })
      );
      dispatch(setCurProject(null));
      closeForm();
    }
  };
  return (
    <div className="form-background">
      <div className="form-container">
        {/*content*/}
        <div className="form-content-container">
          {/*header*/}
          <div className="form-header-container">
            <div className="glitch-box">
              <h3
                className="glow text glitch-text"
                data-text="Project creation"
              >
                Project creation
              </h3>
            </div>
            <button
              className="p-1 red ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/*body*/}
          <div className="form-body-container">
            <div className="form-body-item-container field purple">
              <label className="glow text">Name of the project:</label>
              <input
                type={'text'}
                className="w-2/3 text-white form-body-item-input"
                name="name"
                onChange={handleChange}
                placeholder="name ... "
                defaultValue={'Unnamed'}
              />
            </div>
            <div className="form-body-item-container glow text purple">
              Choose the width and height of canvas.
            </div>
            <div className="form-body-item-container">
              <div className="flex items-center w-full field">
                <label className="text-beige mr-4 glow text">Width: </label>
                <input
                  type={'number'}
                  className="w-full text-white form-body-item-input"
                  name="width"
                  onChange={handleChange}
                  placeholder="width"
                />
              </div>
              <div className="flex items-center w-full field">
                <label className="text-beige mx-4 glow text">Height: </label>
                <input
                  type={'number'}
                  className="w-full text-white form-body-item-input"
                  name="height"
                  onChange={handleChange}
                  placeholder="height"
                />
              </div>
            </div>
            <div className="form-body-item-container">
              <label className='glow text'>Choose background color: </label>
              <input
                className="form-body-item-input-color"
                type="color"
                name="color"
                onChange={handleChange}
                defaultValue={'#FFFFFF'}
              />
            </div>
            <div className="form-error-message">{state.errMessage}</div>
          </div>
          {/*footer*/}
          <div className="form-footer-container">
            <button
              className="text-pink-700 red hover:text-white background-transparent font-bold uppercase px-3 py-2 text-sm outline-none mr-1 mb-1 ease-linear transition-all duration-350"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
              type="button"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCanvasForm;

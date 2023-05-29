import React from 'react';
import '../styles/styleModalDelete.scss'
import '../styles/glitch.scss'

const ConfirmForm = ({ closeForm, confirmAction, action }) => {
  return (
    <div className="form-background">
      <div className="form-container">
        {/*content*/}
        <div className="form-content-container">
          {/*header*/}
          <div className="form-header-container">
            <div className="glitch-box">
                <h3 className="form-header-title glitch-text" data-text={action}>{action}</h3>
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
            <div className="w-full form-body-item-container">
              <label className="text-center glow text w-full text-2xl font-semibold text-red-600">
                Are you sure ?
              </label>
            </div>
          </div>
          {/*footer*/}
          <div className="form-footer-container">
            <button
              className="text-pink-700 red background-transparent font-bold uppercase px-3 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-350"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-600 green text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
              type="button"
              onClick={confirmAction}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;

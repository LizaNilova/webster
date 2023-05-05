import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setWidthHeight } from './redux/CanvasSlice';

const CreateCanvasForm = ({ closeForm }) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: null,
        width: null,
        height: null,
        color: '#000000',
        errMessage: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setState(prevState => ({
            ...prevState,
            [name]: value,
            errMessage: ''
        }));
    }

    const handleSubmit = () => {
        if(state.width < 100 || state.height < 100)
        {
            setState(prevState => ({
                ...prevState,
                errMessage: 'Width and height can`t be less then 100 px'
            }));
        }
        if(state.width && state.height && state.name)
        {
            dispatch(setWidthHeight({width: state.width, height: state.height, color: state.color}));
            closeForm();
        }
    }
    return (
        <div className="text-white justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-2 mx-auto w-1/2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-grey-pastel font-serif">
                            Event creation
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeForm}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative px-8 py-3 flex flex-col m-1">
                        <div className='pb-1 my-1 flex items-center justify-around w-full text-xl text-beige'>
                            <label>Name of the project:</label>
                            <input type={"text"}
                                className="border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-2/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                name='name' onChange={handleChange}
                                placeholder='name ... '
                            />
                        </div>
                        <div className='pb-1 my-1 flex items-center justify-center w-full text-xl text-beige'>
                            Choose the width and height of canvas.
                        </div>
                        <div className='p-1 my-1 flex items-center w-full justify-around'>
                            <label className='text-beige'>Width: </label>
                            <input type={"number"}
                                className="border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-1/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                name='width' onChange={handleChange}
                                placeholder='width'
                            />
                            <label className='text-beige'>Height: </label>
                            <input type={"number"}
                                className="border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-1/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                name='height' onChange={handleChange}
                                placeholder='height'
                            />
                        </div>
                        <div className='w-full flex items-center justify-around text-xl text-beige'>
                            <label>Choose background color: </label>
                            <input className='w-1/3 rounded-sm' type='color' name='color' onChange={handleChange}/>
                        </div>
                        <div className='text-red-500 text-2xl font-semibold underline underline-offset-4 text-center w-full m-1 p-1'>
                            {state.errMessage}
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-350"
                            type="button"
                            onClick={closeForm}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={handleSubmit}
                        >Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCanvasForm;

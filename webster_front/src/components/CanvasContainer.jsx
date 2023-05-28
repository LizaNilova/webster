import { FabricJSCanvas } from 'fabricjs-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/CanvasSlice';

const CanvasContainer = ({ name, onReady }) => {
    const dispatch = useDispatch();

    const [changingName, setChanging] = useState(false);

    const onSaveClick = () => {
        setChanging(false);
        dispatch(setName(document.getElementById('input-name').value));
    }
    // if(name)
    return (
        <div className='w-4/6 max-h-screen min-h-screen flex flex-col items-center m-2 sticky top-10 z-10' >
            <div className='w-full p-2 text-3xl font-semibold flex items-center justify-center mb-2 '>
                {!changingName && <p onClick={() => { setChanging(true) }} className='hover:cursor-pointer'>{name}</p>}
                {changingName &&
                    <>
                        <input id='input-name' type='text' className='border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-1/3 rounded-full outline-none text-black p-2 bg-light-beige text-2xl' defaultValue={name} />
                        <button className='ml-2 w-1/7 bg-purple-700 text-xl' onClick={onSaveClick}>Save</button>
                    </>
                }
            </div>

            <div className='w-full flex justify-center overflow-hidden ' id='viewport-container'>
                <FabricJSCanvas onReady={onReady} />
            </div>
        </div>
    );
}

export default CanvasContainer;

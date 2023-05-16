import { FabricJSCanvas } from 'fabricjs-react';
import React from 'react';

const CanvasContainer = ({name, onReady}) => {

    return (
        <div className='w-4/6 max-h-screen min-h-screen flex flex-col items-center m-2' >
            <div className='w-full p-2 text-3xl font-semibold text-center'>{name}</div>
            <div className='w-full flex justify-center overflow-hidden' id='viewport-container'>
            <FabricJSCanvas onReady={onReady}/>
            </div>
        </div>
    );
}

export default CanvasContainer;

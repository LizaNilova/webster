import { FabricJSCanvas } from 'fabricjs-react';
import React from 'react';

const CanvasContainer = ({name, onReady}) => {

    return (
        <div className='w-4/6 max-h-screen min-h-screen flex flex-col items-center m-2 overflow-auto' >
            <div className='w-full p-2 text-3xl font-semibold text-center'>{name}</div>
            <FabricJSCanvas onReady={onReady} />
        </div>
    );
}

export default CanvasContainer;

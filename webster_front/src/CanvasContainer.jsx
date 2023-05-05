import { FabricJSCanvas } from 'fabricjs-react';
import React from 'react';

const CanvasContainer = ({onReady}) => {

    return (
        <div className='w-4/6 max-h-screen min-h-screen flex flex-col items-center m-2 overflow-auto' >
            <FabricJSCanvas onReady={onReady} />
        </div>
    );
}

export default CanvasContainer;

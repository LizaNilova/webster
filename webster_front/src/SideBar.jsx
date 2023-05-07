import React from 'react';

const SideBar = ({createCanvasClick,  clearCanvasClick, undoClick, redoClick}) => {
    return (
        <div className='w-1/6 h-full min-h-screen flex flex-col items-center p-2 border-r-2 border-purple-900'>
            <button onClick={createCanvasClick} className='w-2/3 bg-purple-700 m-2'>Create new canvas</button>
            <button onClick={clearCanvasClick} className='w-2/3 bg-purple-700 m-2'>Clear canvas</button>
            <button onClick={undoClick} className='w-2/3 bg-purple-700 m-2'>Undo</button>
            <button onClick={redoClick} className='w-2/3 bg-purple-700 m-2'>Redo</button>
        </div>
    );
}

export default SideBar;

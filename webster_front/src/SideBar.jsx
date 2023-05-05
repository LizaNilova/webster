import React from 'react';
import { useSelector } from 'react-redux';

const SideBar = ({createCanvasClick, toggleDrawingClick, removeSelectedClick, clearCanvasClick, undoClick, redoClick}) => {
    let canvasData = useSelector(state => state.canvas);
    return (
        <div className='w-1/6 h-full min-h-screen flex flex-col items-center p-2 border-r-2 border-purple-900'>
            <button onClick={createCanvasClick} className='w-2/3 bg-purple-700 m-2'>Create new canvas</button>
            <button onClick={toggleDrawingClick} className={canvasData.mode === 'drawing' ? 'w-2/3 bg-purple-700 opacity-60 m-2 border-green-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Drawing mode</button>
            <button onClick={removeSelectedClick} className='w-2/3 bg-purple-700 m-2'>Remove selected object</button>
            <button onClick={clearCanvasClick} className='w-2/3 bg-purple-700 m-2'>Clear canvas</button>
            <button onClick={undoClick} className='w-2/3 bg-purple-700 m-2'>Undo</button>
            <button onClick={redoClick} className='w-2/3 bg-purple-700 m-2'>Redo</button>
        </div>
    );
}

export default SideBar;

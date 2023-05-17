import React from 'react';

const SideBar = ({ canvasData, createCanvasClick, clearCanvasClick, undoClick, redoClick, onUploadImage, saveAsPNG, saveCanvasState, restoreCanvasState }) => {
    return (
        <div className='w-1/6 min-h-screen flex flex-col items-center p-2 border-r-2 border-purple-900'>
            <p className='w-full m-3 py-2 text-center text-xl font-semibold border-y border-purple-800'>Create new canvas</p>
            <button onClick={createCanvasClick} className='w-2/3 bg-purple-700 m-2'>Create new canvas</button>
            {
                canvasData && canvasData.width > 0 &&
                <>
                    <p className='w-full m-3 py-2 text-center text-xl font-semibold border-y border-purple-800'>Add image to canvas</p>
                    <input type='file' className='w-3/4 m-2' accept='image/*' onChange={onUploadImage}/>
                    <p className='w-full m-3 py-2 text-center text-xl font-semibold border-y border-purple-800'>Actions with canvas</p>
                    <button onClick={saveAsPNG} className='w-2/3 bg-purple-700 m-2'>Export as PNG</button>
                    <button onClick={saveCanvasState} className='w-2/3 bg-purple-700 m-2'>Save canvas</button>
                    <button onClick={restoreCanvasState} className='w-2/3 bg-purple-700 m-2'>Restore canvas (from save)</button>
                    <button onClick={clearCanvasClick} className='w-2/3 bg-purple-700 m-2'>Clear canvas</button>
                    {/* <button onClick={undoClick} className='w-2/3 bg-purple-700 m-2'>Undo</button>
                    <button onClick={redoClick} className='w-2/3 bg-purple-700 m-2'>Redo</button> */}
                </>
            }
        </div>
    );
}

export default SideBar;

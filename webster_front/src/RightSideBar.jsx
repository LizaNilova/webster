import React, { useState } from 'react';

const RightSideBar = ({ canvasData, brushSize = 1, brushColor = '#000', setBrushSize = ()=>{return}, toggleDrawingClick, removeSelectedClick, setBrushColor }) => {
    const [brushStateSize, setBrushStateSize] = useState(brushSize);
    const [brushStateColor, setBrushStateColor] = useState(brushColor);

    return (
        <div className='w-1/6 h-full min-h-screen flex flex-col items-center p-2 border-l-2 border-purple-900'>
            <button onClick={toggleDrawingClick} className={canvasData?.mode === 'drawing' ? 'w-2/3 bg-purple-700 opacity-60 m-2 border-green-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Drawing mode</button>
            <button onClick={removeSelectedClick} className='w-2/3 bg-purple-700 m-2'>Remove selected object</button>
            {
                canvasData?.mode === 'drawing' &&
                <>
                    <label className="block mb-2 text-lg">Brush size: {brushStateSize}</label>
                    <input type="range" min="1" max="15" defaultValue="1" step='1' onChange={(e) => { setBrushSize(Number(e.target.value)); setBrushStateSize(e.target.value) }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                    <label className='mt-3 text-lg'>Brush color: {brushStateColor} </label>
                    <input className='w-1/3 rounded-sm' type='color' name='brushColor' value={brushStateColor} onChange={(e)=>{setBrushColor(e.target.value); setBrushStateColor(e.target.value)}} defaultValue={"#000"}/>
                </>
            }
        </div>
    );
}

export default RightSideBar;

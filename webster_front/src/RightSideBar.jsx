import React, { useEffect, useState } from 'react';
import './styles/RightSideBar.css'
const RightSideBar = ({
    canvasData,
    brushData = {
        brushColor: null,
        brushSize: null,
        brushShadow: null
    },
    setBrushSize = () => { return },
    toggleDrawingClick,
    removeSelectedClick,
    setBrushColor,
    groupClick,
    unGroupClick,
    applyFilter,
    applyFilterValue }) => {

    const [brushStateSize, setBrushStateSize] = useState(brushData.brushSize);
    const [brushStateColor, setBrushStateColor] = useState(brushData.brushColor);
    const [brushShadow, setBrushShadow] = useState({ color: brushData.brushShadow?.color, blur: brushData.brushShadow?.blur, offset: brushData.brushShadow?.offsetX });

    useEffect(() => {
        setBrushStateSize(brushData.brushSize);
        setBrushStateColor(brushData.brushColor);
        setBrushShadow({ color: brushData.brushShadow?.color, blur: brushData.brushShadow?.blur, offset: brushData.brushShadow?.offsetX });
    }, [brushData]);



    // console.log(brushData)

    return (
        <div className='w-1/6 min-h-screen flex flex-col items-center p-2 border-l-2 border-purple-900'>
            {
                canvasData.width > 0 &&
                <>
                    <p className='sidebar-item-title'>
                        Drawing
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </p>                    <button onClick={toggleDrawingClick} className={canvasData?.mode === 'drawing' ? 'w-2/3 bg-purple-700 opacity-60 m-2 border-green-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Toggle drawing</button>

                    {
                        canvasData?.mode === 'drawing' &&
                        <>
                            <label className="block mb-2 text-lg">Brush size: {brushStateSize}</label>
                            <input type="range" min="1" max="15" defaultValue="1" step='1' onChange={(e) => { setBrushSize(Number(e.target.value)); setBrushStateSize(e.target.value) }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                            <label className='mt-3 mb-1 text-lg'>Brush color: {brushStateColor} </label>
                            <input className='w-1/3 rounded-sm' type='color' name='brushColor' value={brushStateColor} onChange={(e) => { setBrushColor(e.target.value); setBrushStateColor(e.target.value) }} defaultValue={"#000"} />
                            <label className='mt-2 mb-1 text-lg'>Shadow color: {brushShadow?.color} </label>
                            <input className='w-1/3 rounded-sm' type='color' name='brushColor' value={brushStateColor} onChange={(e) => { setBrushColor(e.target.value); setBrushStateColor(e.target.value) }} defaultValue={"#000"} />
                            <label className='mt-2 mb-1 text-lg'>Shadow blur: {brushShadow?.blur} </label>
                            <input type="range" min="1" max="15" defaultValue="0" step='1' onChange={(e) => { setBrushSize(Number(e.target.value)); setBrushStateSize(e.target.value) }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                            <label className='mt-2 mb-1 text-lg'>Shadow offset: {brushShadow?.offset} </label>
                            <input type="range" min="1" max="15" defaultValue="0" step='1' onChange={(e) => { setBrushSize(Number(e.target.value)); setBrushStateSize(e.target.value) }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                        </>
                    }
                    {/* <div className='w-full flex justify-center m-2 mb-4'>
                        <button className='bg-purple-700 m-2 outline-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                            </svg>
                        </button>
                        <button className='bg-purple-700 m-2 outline-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                            </svg>
                        </button>
                        <button className='bg-purple-700 m-2 outline-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div> */}
                    <p className='sidebar-item-title'>
                        Actions with selected
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </p>
                    <button onClick={groupClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-2/3 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Group</button>
                    <button onClick={unGroupClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-2/3 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Ungroup</button>
                    <button onClick={removeSelectedClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-3/4 bg-gray-700 opacity-60 m-1 border-red-500 outline-none' : 'w-3/4 bg-purple-700 m-1 active:border-green-500 outline-none'}>Remove selected object(s)</button>
                    {
                        <>
                            <p className='sidebar-item-title'>
                                Filters
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </p>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(0, e.target.checked && new fabric.Image.filters.Grayscale()) }} />
                                    <p className='pl-2 text-lg'>Grayscale</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(1, e.target.checked && new fabric.Image.filters.Invert()) }} />
                                    <p className='pl-2 text-lg'>Invert</p>
                                </div>
                            </div>
                            <p className='sidebar-item-title'>
                                Colormatrix filters
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </p>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(3, e.target.checked && new fabric.Image.filters.Sepia()) }} />
                                    <p className='pl-2 text-lg'>Sepia</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(19, e.target.checked && new fabric.Image.filters.BlackWhite()) }} />
                                    <p className='pl-2 text-lg'>Black\White</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(4, e.target.checked && new fabric.Image.filters.Brownie()) }} />
                                    <p className='pl-2 text-lg'>Brownie</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(9, e.target.checked && new fabric.Image.filters.Vintage()) }} />
                                    <p className='pl-2 text-lg'>Vintage</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(18, e.target.checked && new fabric.Image.filters.Kodachrome()) }} />
                                    <p className='pl-2 text-lg'>Kodachrome</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { applyFilter(14, e.target.checked && new fabric.Image.filters.Technicolor()) }} />
                                    <p className='pl-2 text-lg'>Technicolor</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => { applyFilter(15, e.target.checked && new fabric.Image.filters.Polaroid()) }} />
                                    <p className='pl-2 text-lg'>Polaroid</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => { 
                                            applyFilter(2, e.target.checked && new fabric.Image.filters.RemoveColor({
                                                distance: 0,
                                                color: '#FFFFFF',
                                            })) 
                                        }} />
                                    <p className='pl-2 text-lg'>Remove color</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <p className='pr-2 text-lg'>Color: </p>
                                    <input type='color' className='' defaultValue={'#FFFFFF'}
                                        onChange={(e)=>{applyFilterValue(2, 'color', e.target.value);}} />
                                </div>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <p className='pr-2 text-lg'>Distance: </p>
                                    <input type='range' className='' min={0} max={1} step={0.1} defaultValue={0}
                                        onChange={(e)=>{applyFilterValue(2, 'distance', e.target.value);}} />
                                </div>
                            </div>

                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => { 
                                            applyFilter(5, e.target.checked && new fabric.Image.filters.Brightness({
                                                brightness: 0,
                                            })) 
                                        }} />
                                    <p className='pl-2 text-lg'>Brightness</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={0}
                                        onChange={(e)=>{applyFilterValue(5, 'brightness', e.target.value);}} />
                                </div>
                            </div>

                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' disabled
                                        onClick={(e) => {
                                            applyFilter(17, e.target.checked && new fabric.Image.filters.Gamma({
                                                gamma:[1,1,1]
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Gamma</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Red: </p>
                                    <input type='range' className='' />
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Green: </p>
                                    <input type='range' className='' />
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Blue: </p>
                                    <input type='range' className='' />
                                </div>
                            </div>

                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5' 
                                        onClick={(e) => {
                                            applyFilter(6, e.target.checked && new fabric.Image.filters.Contrast({
                                                contrast: 0
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Contrast</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={0} 
                                        onChange={(e)=>{applyFilterValue(6, 'contrast', e.target.value);}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(7, e.target.checked && new fabric.Image.filters.Saturation({
                                                saturation: 0
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Saturation</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={0} 
                                        onChange={(e)=>{applyFilterValue(7, 'saturation', e.target.value);}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(8, e.target.checked && new fabric.Image.filters.Vibrance({
                                                vibrance: 0
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Vibrance</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={0} 
                                        onChange={(e)=>{applyFilterValue(8, 'saturation', e.target.value);}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(21, e.target.checked && new fabric.Image.filters.HueRotation({
                                                rotation: 0
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Hue</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={0} 
                                        onChange={(e)=>{applyFilterValue(21, 'rotation', e.target.value);}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(9, e.target.checked && new fabric.Image.filters.Noise({
                                                noise: 100
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Noise</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={0} max={1000} step={10} defaultValue={100} 
                                        onChange={(e)=>{applyFilterValue(9, 'noise', parseInt(e.target.value, 10));}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(10, e.target.checked && new fabric.Image.filters.Pixelate({
                                                blocksize: 4
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Pixelate</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={2} max={20} step={1} defaultValue={4} 
                                        onChange={(e)=>{applyFilterValue(10, 'blocksize', parseInt(e.target.value, 10));}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(11, e.target.checked && new fabric.Image.filters.Blur({
                                                blur: 0
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Blur</p>
                                </div>
                                <div className='w-full flex items-center justify-center p-1'>
                                    <p className='pr-2 text-lg'>Value: </p>
                                    <input type='range' className='' min={0} max={1} step={0.1} defaultValue={0} 
                                        onChange={(e)=>{applyFilterValue(11, 'blur', parseFloat(e.target.value));}} />
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                    <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(12, e.target.checked && new fabric.Image.filters.Convolute({
                                                matrix: [0, -1, 0,
                                                        -1, 5, -1,
                                                        0, -1, 0]
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Sharpen</p>
                                </div>
                            </div>
                            <div className='sidebar-item-container'>
                                <div className='w-full flex items-center justify-center p-2'>
                                <input type='checkbox' className='w-5 h-5'
                                        onClick={(e) => {
                                            applyFilter(13, e.target.checked && new fabric.Image.filters.Convolute({
                                                matrix: [ 1,   1,  1,
                                                    1, 0.7, -1,
                                                   -1,  -1, -1 ]
                                            }))
                                        }} />
                                    <p className='pl-2 text-lg'>Emboss</p>
                                </div>
                            </div>

                        </>
                    }

                </>
            }

        </div>
    );
}

export default RightSideBar;

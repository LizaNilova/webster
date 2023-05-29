import React, { useEffect, useState } from 'react';
import '../styles/SideBars.css'

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
    applyFilterValue,
    selectedObject,
    rotate,
    changeBrushShadow,
    toggleEraser,
    onChangeHeight,
    onChangeWidth,
    applyTextFilter,
    centerObject }) => {

    const [brushStateSize, setBrushStateSize] = useState(brushData.brushSize);
    const [brushStateColor, setBrushStateColor] = useState(brushData.brushColor);
    const [brushShadow, setBrushShadow] = useState({ color: brushData.brushShadow?.color, blur: brushData.brushShadow?.blur, offset: brushData.brushShadow?.offsetX });

    useEffect(() => {
        setBrushStateSize(brushData.brushSize);
        setBrushStateColor(brushData.brushColor);
        setBrushShadow({ color: brushData.brushShadow?.color, blur: brushData.brushShadow?.blur, offset: brushData.brushShadow?.offsetX });
    }, [brushData]);



    // console.log(selectedObject?.type)

    return (
        <div className='w-1/6 min-h-screen flex flex-col items-center p-2 border-l-2 border-purple-900'>
            {
                canvasData.width > 0 &&
                <>
                    <p className='sidebar-item-title' onClick={() => {
                        let ac = document.getElementById('drawing-actions-container');
                        ac.classList.toggle('hidden');
                        let ac_up = document.getElementById('drawing-chevron-up');
                        let ac_down = document.getElementById('drawing-chevron-down');
                        ac_up.classList.toggle('hidden');
                        ac_down.classList.toggle('hidden');
                    }}>
                        Drawing
                        <svg id='drawing-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg id='drawing-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </p>
                    <div className='w-full text-center hidden' id='drawing-actions-container'>
                        {/* <button onClick={toggleDrawingClick} className={canvasData?.mode === 'drawing' ? 'w-2/3 bg-purple-700 opacity-60 m-2 border-green-500 outline-none' : 'w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'}>Toggle drawing</button> */}
                        <div className='w-full flex justify-center mb-4'>
                            {/* <button className='bg-purple-700 mx-1 outline-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                                </svg>
                            </button> */}
                            <button onClick={toggleDrawingClick} className={canvasData?.mode === 'drawing' ? 'bg-purple-700 opacity-60 mx-2 border-green-500 outline-none' : 'bg-purple-700 mx-2 active:border-green-500 outline-none'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                </svg>
                            </button>
                            <button onClick={toggleEraser} className={canvasData?.mode === 'eraser' ? 'bg-purple-700 opacity-60 mx-2 border-green-500 outline-none' : 'bg-purple-700 mx-2 active:border-green-500 outline-none'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><path fill="currentColor" d="m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95l-4.95 4.95Z" /></svg>
                            </button>
                        </div>
                    </div>

                    {
                        (canvasData?.mode === 'drawing' || canvasData?.mode === 'eraser') &&
                        <>
                            <label className="block mb-2 text-lg">{canvasData?.mode === 'drawing' ? 'Brush' : 'Eraser'} size: {brushStateSize}</label>
                            <input type="range" min="1" max="15" value={brushStateSize} step='1' onChange={(e) => { setBrushSize(Number(e.target.value)); setBrushStateSize(e.target.value) }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                            {
                                canvasData?.mode === 'drawing' &&
                                <>
                                    <label className='mt-3 mb-1 text-lg'>Brush color: {brushStateColor} </label>
                                    <input className='w-1/3 rounded-sm' type='color' name='brushColor' value={brushStateColor} onChange={(e) => { setBrushColor(e.target.value); setBrushStateColor(e.target.value) }} defaultValue={"#000"} />

                                    <label className='mt-2 mb-1 text-lg'>Shadow color: {brushShadow?.color} </label>
                                    <input className='w-1/3 rounded-sm' type='color' name='shadowColor' value={brushShadow?.color} onChange={(e) => {
                                        setBrushShadow(prevState => ({
                                            ...prevState,
                                            color: e.target.value,
                                        }));
                                        changeBrushShadow(e.target.value, brushShadow.blur, brushShadow.offset);
                                    }} defaultValue={"#000"} />
                                    <label className='mt-2 mb-1 text-lg'>Shadow blur: {brushShadow?.blur} </label>
                                    <input type="range" min="1" max="15" defaultValue={brushShadow?.blur} step='1' onChange={(e) => {
                                        setBrushShadow(prevState => ({
                                            ...prevState,
                                            blur: e.target.value,
                                        }));
                                        changeBrushShadow(brushShadow.color, e.target.value, brushShadow.offset);
                                    }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                                    <label className='mt-2 mb-1 text-lg'>Shadow offset: {brushShadow?.offset} </label>
                                    <input type="range" min="1" max="15" defaultValue={brushShadow?.offset} step='1' onChange={(e) => {
                                        setBrushShadow(prevState => ({
                                            ...prevState,
                                            offset: e.target.value,
                                        }));
                                        changeBrushShadow(brushShadow.color, brushShadow.blur, e.target.value);
                                    }} className="w-3/4 h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"></input>
                                </>
                            }

                        </>
                    }
                    {
                        selectedObject &&
                        <div className='w-full'>
                            <p className='sidebar-item-title' onClick={() => {
                                let ac = document.getElementById('selected-actions-container');
                                ac.classList.toggle('hidden');
                                let ac_up = document.getElementById('actions-chevron-up');
                                let ac_down = document.getElementById('actions-chevron-down');
                                ac_up.classList.toggle('hidden');
                                ac_down.classList.toggle('hidden');
                            }}>
                                Actions with selected
                                <svg id='actions-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <svg id='actions-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </p>
                            <div className='w-full text-center hidden' id='selected-actions-container'>
                                <div className='w-full flex justify-center items-center mb-1'>
                                    <button className='w-1/3 bg-purple-700 m-2 flex items-center justify-center' onClick={() => {
                                        rotate('left');
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </button>
                                    <button className='w-1/3 bg-purple-700 m-2 flex items-center justify-center' onClick={() => {
                                        rotate('right');
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 leading-none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='w-full flex justify-center items-center mb-1'>
                                    <div className='w-1/3 flex flex-col mx-2'>
                                        <label>Height:</label>
                                        <input onChange={(e) => { onChangeHeight(e.target.value) }} type='number' min='1' defaultValue={Math.ceil(selectedObject.height)} className='border-2 border-purple-500 focus:border-emerald-600 focus:border-2 rounded-md outline-none text-black p-1 bg-light-beige' />
                                    </div>
                                    <div className='w-1/3 flex flex-col mx-2'>
                                        <label>Width:</label>
                                        <input onChange={(e) => { onChangeWidth(e.target.value) }} type='number' min='1' defaultValue={Math.ceil(selectedObject.width)} className='border-2 border-purple-500 focus:border-emerald-600 focus:border-2 rounded-md outline-none text-black p-1 bg-light-beige' />
                                    </div>
                                </div>
                                <button onClick={centerObject} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-3/4 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-3/4 bg-purple-700 my-2 active:border-green-500 outline-none'}>Center</button>
                                <button onClick={groupClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-3/4 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-3/4 bg-purple-700 my-2 active:border-green-500 outline-none'}>Group</button>
                                <button onClick={unGroupClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-3/4 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-3/4 bg-purple-700 my-2 active:border-green-500 outline-none'}>Ungroup</button>
                                <button onClick={removeSelectedClick} disabled={canvasData?.mode === 'drawing'} className={canvasData?.mode === 'drawing' ? 'w-3/4 bg-gray-700 opacity-60 m-2 border-red-500 outline-none' : 'w-3/4 bg-purple-700 my-2 active:border-green-500 outline-none'}>Remove selected object(s)</button>
                            </div>
                        </div>
                    }

                    {
                        selectedObject?.type === 'image' &&
                        //className='h-80 overflow-y-auto'
                        <div className='w-full'>
                            <p className='sidebar-item-title' onClick={() => {
                                let fc = document.getElementById('filters-container');
                                fc.classList.toggle('hidden');
                                let fc_up = document.getElementById('filters-chevron-up');
                                let fc_down = document.getElementById('filters-chevron-down');
                                fc_up.classList.toggle('hidden');
                                fc_down.classList.toggle('hidden');
                            }}>
                                Filters
                                <svg id='filters-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <svg id='filters-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </p>
                            <div className='w-full hidden' id='filters-container'>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[0]}
                                            onClick={(e) => { applyFilter(0, e.target.checked && new fabric.Image.filters.Grayscale()) }} />
                                        <p className='pl-2 text-lg'>Grayscale</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[1]}
                                            onClick={(e) => { applyFilter(1, e.target.checked && new fabric.Image.filters.Invert()) }} />
                                        <p className='pl-2 text-lg'>Invert</p>
                                    </div>
                                </div>
                            </div>

                            <p className='sidebar-item-title' onClick={() => {
                                let clmfc = document.getElementById('colormatrix-filters-container');
                                clmfc.classList.toggle('hidden');
                                let clmfc_up = document.getElementById('colormatrix-filters-chevron-up');
                                let clmfc_down = document.getElementById('colormatrix-filters-chevron-down');
                                clmfc_up.classList.toggle('hidden');
                                clmfc_down.classList.toggle('hidden');
                            }}>
                                Colormatrix filters
                                <svg id='colormatrix-filters-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <svg id='colormatrix-filters-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </p>
                            <div className='w-full hidden' id='colormatrix-filters-container'>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[3]}
                                            onClick={(e) => { applyFilter(3, e.target.checked && new fabric.Image.filters.Sepia()) }} />
                                        <p className='pl-2 text-lg'>Sepia</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[19]}
                                            onClick={(e) => { applyFilter(19, e.target.checked && new fabric.Image.filters.BlackWhite()) }} />
                                        <p className='pl-2 text-lg'>Black\White</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[4]}
                                            onClick={(e) => { applyFilter(4, e.target.checked && new fabric.Image.filters.Brownie()) }} />
                                        <p className='pl-2 text-lg'>Brownie</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[9]}
                                            onClick={(e) => { applyFilter(9, e.target.checked && new fabric.Image.filters.Vintage()) }} />
                                        <p className='pl-2 text-lg'>Vintage</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[18]}
                                            onClick={(e) => { applyFilter(18, e.target.checked && new fabric.Image.filters.Kodachrome()) }} />
                                        <p className='pl-2 text-lg'>Kodachrome</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[14]}
                                            onClick={(e) => { applyFilter(14, e.target.checked && new fabric.Image.filters.Technicolor()) }} />
                                        <p className='pl-2 text-lg'>Technicolor</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[15]}
                                            onClick={(e) => { applyFilter(15, e.target.checked && new fabric.Image.filters.Polaroid()) }} />
                                        <p className='pl-2 text-lg'>Polaroid</p>
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[2]}
                                            onClick={(e) => {
                                                let color = document.getElementById('color').value;
                                                let distance = document.getElementById('distance').value;
                                                applyFilter(2, e.target.checked && new fabric.Image.filters.RemoveColor({
                                                    distance: distance,
                                                    color: color,
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Remove color</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <p className='pr-2 text-lg'>Color: </p>
                                        <input type='color' className='' defaultValue={selectedObject.filters[2]?.color || '#FFFFFF'} id='color'
                                            onChange={(e) => { applyFilterValue(2, 'color', e.target.value); }} />
                                    </div>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <p className='pr-2 text-lg'>Distance: </p>
                                        <input type='range' className='' min={0} max={1} step={0.1} defaultValue={selectedObject.filters[2]?.distance || 0} id='distance'
                                            onChange={(e) => { applyFilterValue(2, 'distance', e.target.value); }} />
                                    </div>
                                </div>

                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[5]}
                                            onClick={(e) => {
                                                // console.log(document.getElementById('brightness').value);
                                                applyFilter(5, e.target.checked && new fabric.Image.filters.Brightness({
                                                    brightness: document.getElementById('brightness').value,
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Brightness</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={selectedObject.filters[5]?.brightness || 0} id='brightness'
                                            onChange={(e) => { applyFilterValue(5, 'brightness', e.target.value); }} />
                                    </div>
                                </div>

                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[17]}
                                            onClick={(e) => {
                                                let v1 = document.getElementById('gamma-v1').value;
                                                let v2 = document.getElementById('gamma-v2').value;
                                                let v3 = document.getElementById('gamma-v3').value;
                                                applyFilter(17, e.target.checked && new fabric.Image.filters.Gamma({
                                                    gamma: [v1, v2, v3]
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Gamma</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Red: </p>
                                        <input type='range' className='' min={0.1} max={2.2} step={0.1} defaultValue={selectedObject.filters[17]?.gamma?.length && selectedObject.filters[17]?.gamma[0] || 1} id='gamma-v1'
                                            onChange={(e) => {
                                                let gamma = selectedObject.filters[17]?.gamma;
                                                gamma[0] = e.target.value;
                                                applyFilterValue(17, 'gamma', gamma);
                                            }} />
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Green: </p>
                                        <input type='range' className='' min={0.1} max={2.2} step={0.1} defaultValue={selectedObject.filters[17]?.gamma?.length && selectedObject.filters[17]?.gamma[1] || 1} id='gamma-v2'
                                            onChange={(e) => {
                                                let gamma = selectedObject.filters[17]?.gamma;
                                                gamma[1] = e.target.value;
                                                applyFilterValue(17, 'gamma', gamma);
                                            }} />
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Blue: </p>
                                        <input type='range' className='' min={0.1} max={2.2} step={0.1} defaultValue={selectedObject.filters[17]?.gamma?.length && selectedObject.filters[17]?.gamma[2] || 1} id='gamma-v3'
                                            onChange={(e) => {
                                                let gamma = selectedObject.filters[17]?.gamma;
                                                gamma[2] = e.target.value;
                                                applyFilterValue(17, 'gamma', gamma);
                                            }} />
                                    </div>
                                </div>

                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[6]}
                                            onClick={(e) => {
                                                applyFilter(6, e.target.checked && new fabric.Image.filters.Contrast({
                                                    contrast: document.getElementById('contrast').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Contrast</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={selectedObject.filters[6]?.contrast || 0} id='contrast'
                                            onChange={(e) => { applyFilterValue(6, 'contrast', e.target.value); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[7]}
                                            onClick={(e) => {
                                                applyFilter(7, e.target.checked && new fabric.Image.filters.Saturation({
                                                    saturation: document.getElementById('saturation').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Saturation</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={selectedObject.filters[7]?.saturation || 0} id='saturation'
                                            onChange={(e) => { applyFilterValue(7, 'saturation', e.target.value); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[8]}
                                            onClick={(e) => {
                                                applyFilter(8, e.target.checked && new fabric.Image.filters.Vibrance({
                                                    vibrance: document.getElementById('vibrance').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Vibrance</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={selectedObject.filters[8]?.vibrance || 0} id='vibrance'
                                            onChange={(e) => { applyFilterValue(8, 'vibrance', e.target.value); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[21]}
                                            onClick={(e) => {
                                                applyFilter(21, e.target.checked && new fabric.Image.filters.HueRotation({
                                                    rotation: document.getElementById('rotation').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Hue</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={-1} max={1} step={0.1} defaultValue={selectedObject.filters[21]?.rotation || 0} id='rotation'
                                            onChange={(e) => { applyFilterValue(21, 'rotation', e.target.value); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[9]}
                                            onClick={(e) => {
                                                applyFilter(9, e.target.checked && new fabric.Image.filters.Noise({
                                                    noise: document.getElementById('noise').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Noise</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={0} max={1000} step={10} defaultValue={selectedObject.filters[9]?.noise || 100} id='noise'
                                            onChange={(e) => { applyFilterValue(9, 'noise', parseInt(e.target.value, 10)); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[10]}
                                            onClick={(e) => {
                                                applyFilter(10, e.target.checked && new fabric.Image.filters.Pixelate({
                                                    blocksize: document.getElementById('blocksize').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Pixelate</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={2} max={20} step={1} defaultValue={selectedObject.filters[10]?.blocksize || 4} id='blocksize'
                                            onChange={(e) => { applyFilterValue(10, 'blocksize', parseInt(e.target.value, 10)); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[11]}
                                            onClick={(e) => {
                                                applyFilter(11, e.target.checked && new fabric.Image.filters.Blur({
                                                    blur: document.getElementById('blur').value
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Blur</p>
                                    </div>
                                    <div className='w-full flex items-center justify-center p-1'>
                                        <p className='pr-2 text-lg'>Value: </p>
                                        <input type='range' className='' min={0} max={1} step={0.1} defaultValue={selectedObject.filters[11]?.blur || 0} id='blur'
                                            onChange={(e) => { applyFilterValue(11, 'blur', parseFloat(e.target.value)); }} />
                                    </div>
                                </div>
                                <div className='sidebar-item-container'>
                                    <div className='w-full flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[12]}
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
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={selectedObject.filters[13]}
                                            onClick={(e) => {
                                                applyFilter(13, e.target.checked && new fabric.Image.filters.Convolute({
                                                    matrix: [1, 1, 1,
                                                        1, 0.7, -1,
                                                        -1, -1, -1]
                                                }))
                                            }} />
                                        <p className='pl-2 text-lg'>Emboss</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selectedObject?.type === 'i-text' &&
                        <div className='w-full'>
                            <p className='sidebar-item-title' onClick={() => {
                                let ac = document.getElementById('selected-text-container');
                                ac.classList.toggle('hidden');
                                let ac_up = document.getElementById('selected-text-chevron-up');
                                let ac_down = document.getElementById('selected-text-chevron-down');
                                ac_up.classList.toggle('hidden');
                                ac_down.classList.toggle('hidden');
                            }}>
                                Selected text
                                <svg id='selected-text-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <svg id='selected-text-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </p>
                            <div className='w-full text-center my-2 hidden' id='selected-text-container'>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl'>Font family:</label>
                                    <select className='p-1.5'
                                        onChange={(e) => {
                                            applyTextFilter('fontFamily', e.target.value);
                                        }} defaultValue={selectedObject?.fontFamily}>
                                        <option value='Times New Roman'>Times new roman</option>
                                        <option value='Send Flowers'>Send Flowers</option>
                                    </select>
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl'>Font size: {selectedObject?.fontSize}</label>
                                    <input className='py-1.5' type='range' min='10' max='99' step='1' defaultValue={selectedObject?.fontSize} onChange={(e) => {
                                        applyTextFilter('fontSize', e.target.value);
                                    }} />
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl'>Font weight:</label>
                                    <select className='p-1.5' onChange={(e) => {
                                        applyTextFilter('fontWeight', e.target.value);
                                    }} defaultValue={selectedObject?.fontWeight}>
                                        <option value='normal'>Normal</option>
                                        <option value='bold'>Bold</option>
                                    </select>
                                </div>

                                <div className='w-full flex justify-center items-center mb-1'>
                                    <label className='w-1/2 my-2 text-xl'>Underline:</label>
                                    <input className='p-1.5 w-5 h-5' type='checkbox' defaultChecked={selectedObject?.underline} onClick={(e) => {
                                        applyTextFilter('underline', e.target.checked && true);
                                    }} />
                                </div>
                                <div className='w-full flex justify-center items-center mb-1'>
                                    <label className='w-1/2 my-2 text-xl'>Overline:</label>
                                    <input className='p-1.5 w-5 h-5' type='checkbox' defaultChecked={selectedObject?.overline} onClick={(e) => {
                                        applyTextFilter('overline', e.target.checked && true);
                                    }} />
                                </div>
                                <div className='w-full flex justify-center items-center mb-1'>
                                    <label className='w-1/2 my-2 text-xl'>Line through:</label>
                                    <input className='p-1.5 w-5 h-5' type='checkbox' defaultChecked={selectedObject?.overline} onClick={(e) => {
                                        applyTextFilter('linethrough', e.target.checked && true);
                                    }} />
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <p className='w-full my-2 text-xl'>Font style: </p>
                                    <select className='p-1.5' onChange={(e) => {
                                        applyTextFilter('fontStyle', e.target.value);
                                    }} defaultValue={selectedObject?.fontStyle || 'normal'}>
                                        <option value='normal'>Normal</option>
                                        <option value='italic'>Italic</option>
                                    </select>
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <div className='w-full flex flex-col my-2'>
                                        <div className='w-full'>
                                            <label className='my-1 text-lg'>Stroke color and width:</label>
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-around'>
                                        <div className='w-1/2 flex flex-col items-center'>
                                            {/* <label className='my-1 text-xl'>Colo</label> */}
                                            <input className='w-3/4 h-6' type='color' onChange={(e) => {
                                                applyTextFilter('stroke', e.target.value);
                                            }} defaultValue={selectedObject?.stroke || '#fff'} />
                                        </div>
                                        <div className='w-1/2 flex flex-col items-center'>
                                            {/* <label className='my-1 text-xl'>Stroke width:</label> */}
                                            <input className='w-3/4 h-6' type='range' min='0' max='4' step='1' onChange={(e) => {
                                                applyTextFilter('strokeWidth', e.target.value);
                                            }} defaultValue={selectedObject?.strokeWidth || '1'} />
                                        </div>
                                    </div>

                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl'>Text align:</label>
                                    <select className='p-1.5' onChange={(e) => {
                                        applyTextFilter('textAlign', e.target.value);
                                    }} defaultValue={selectedObject?.textAlign || 'left'}>
                                        <option value='left'>Left</option>
                                        <option value='center'>Center</option>
                                        <option vlaue='right'>Right</option>
                                        <option vlaue='justify'>Justify</option>
                                        <option value='justify-left'>Justify-left</option>
                                        <option value='justify-center'>Justify-center</option>
                                        <option value='justify-right'>Justify-right</option>
                                    </select>
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl' >Line height: {selectedObject?.lineHeight}</label>
                                    <input className='py-1.5' type='range' min='1' max='5' step='1' onChange={(e) => {
                                        applyTextFilter('lineHeight', e.target.value);
                                    }} defaultValue={selectedObject?.lineHeight || 1} />
                                </div>

                                <div className='w-full flex flex-col justify-center items-center mb-1'>
                                    <label className='w-full my-2 text-xl' >Text background color:</label>
                                    <input className='w-1/2' type='color' onChange={(e) => {
                                        applyTextFilter('textBackgroundColor', e.target.value);
                                    }} defaultValue={selectedObject?.textBackgroundColor} />
                                </div>

                            </div>
                        </div>
                    }

                </>
            }

        </div>
    );
}

export default RightSideBar;

import React from 'react';

const SideBar = ({ canvasData, openForm, clearCanvasClick,
    undoClick, redoClick, addImageToCanvas, setBackgroundImage, exportAsImage, saveCanvasState, restoreCanvasState, onChangeBGColor, addText, createProject, updateProject }) => {
        return (
        <div className='w-1/6 min-h-screen flex flex-col items-center p-2 border-r-2 border-purple-900'>
            <p className='sidebar-item-title hover:cursor-default'>Create new canvas</p>
            <button onClick={()=>{openForm('Create')}} className='w-2/3 bg-purple-700 m-2'>Create new canvas</button>
            <button onClick={()=>{openForm('Select project')}} className='w-2/3 bg-purple-700 m-2'>Load project</button>
            {localStorage.getItem('savedState') && !canvasData.curProject?.id && <button onClick={restoreCanvasState} className='w-2/3 bg-purple-700 m-2'>Load last saved project</button>}
            {canvasData && canvasData.name && !canvasData.curProject?.id && <button onClick={createProject} className='w-2/3 bg-purple-700 m-2'>Create project</button> }
            {canvasData && canvasData.name && canvasData.curProject?.id && <button onClick={updateProject} className='w-2/3 bg-purple-700 m-2'>Update project</button>}
            {
                canvasData && canvasData.width > 0 &&
                <>
                    <p className='sidebar-item-title'
                        onClick={() => {
                            let ac = document.getElementById('canvas-actions-container');
                            ac.classList.toggle('hidden');
                            let ac_up = document.getElementById('canvas-actions-chevron-up');
                            let ac_down = document.getElementById('canvas-actions-chevron-down');
                            ac_up.classList.toggle('hidden');
                            ac_down.classList.toggle('hidden');
                        }}>
                        Canvas
                        <svg id='canvas-actions-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg id='canvas-actions-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </p>
                    <div className='w-full text-center hidden' id='canvas-actions-container'>
                        <div className='w-full flex'>
                            <button onClick={() => {
                                exportAsImage('png');
                            }} className='w-2/3 bg-purple-700 m-1.5'>Export as PNG</button>
                            <button onClick={() => {
                                exportAsImage('jpeg');
                            }} className='w-2/3 bg-purple-700 m-1.5'>Export as JPEG</button>
                        </div>
                        <div className='w-full flex items-center py-1 my-1'>
                            <label className='p-1'>Set background color: </label>
                            <input type='color' className='w-1/3 rounded-sm mr-1' defaultValue={canvasData.color} onChange={onChangeBGColor} />
                        </div>
                        {/* <button className='w-2/3 bg-purple-700 m-2'>Change</button> */}
                        <button onClick={saveCanvasState} className='w-2/3 bg-purple-700 m-2'>Save canvas (locally)</button>
                        {/* <button onClick={restoreCanvasState} className='w-2/3 bg-purple-700 m-2'>Restore canvas (local save)</button> */}
                        <button onClick={clearCanvasClick} className='w-2/3 bg-purple-700 m-2'>Clear canvas</button>
                    </div>
                    <p className='sidebar-item-title' onClick={() => {
                        let ac = document.getElementById('add-image-container');
                        ac.classList.toggle('hidden');
                        let ac_up = document.getElementById('add-image-chevron-up');
                        let ac_down = document.getElementById('add-image-chevron-down');
                        ac_up.classList.toggle('hidden');
                        ac_down.classList.toggle('hidden');
                    }}>
                        Image
                        <svg id='add-image-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg id='add-image-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </p>
                    <div className='w-full text-center hidden' id='add-image-container'>

                        <input type='file' className='w-3/4 m-2' accept='image/*' id='image-upload' />
                        <div className='w-full flex'>
                            <button onClick={() => {
                                let file = document.getElementById('image-upload').files[0];
                                // console.log(file);
                                if (file)
                                    addImageToCanvas(file)
                            }} className='w-1/3 bg-purple-700 m-1'>Add</button>
                            <button onClick={() => {
                                let file = document.getElementById('image-upload').files[0];
                                // console.log(file);
                                if (file)
                                    setBackgroundImage(file)
                            }} className='w-2/3 bg-purple-700 m-1 text-sm'>Background</button>
                        </div>
                    </div>
                    <p className='sidebar-item-title'
                        onClick={() => {
                            let ac = document.getElementById('text-actions-container');
                            ac.classList.toggle('hidden');
                            let ac_up = document.getElementById('text-actions-chevron-up');
                            let ac_down = document.getElementById('text-actions-chevron-down');
                            ac_up.classList.toggle('hidden');
                            ac_down.classList.toggle('hidden');
                        }}>
                        Text
                        <svg id='text-actions-chevron-up' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                        <svg id='text-actions-chevron-down' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hidden">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </p>
                    <div className='w-full text-center hidden' id='text-actions-container'>
                        {/* <div className='sidebar-item-container'>
                            <div className='w-full flex items-center justify-center p-2'>
                                <p className='pr-2 text-lg'>Text:</p>
                                <input type='text' className='w-2/3 border-2 border-purple-500 focus:border-emerald-600 focus:border-2 rounded-md outline-none text-black p-1 bg-light-beige' 
                                    id='text' />
                            </div>
                        </div> */}
                        <button onClick={addText} className='w-2/3 bg-purple-700 m-2'>Add text</button>
                    </div>
                    {/* <button onClick={undoClick} className='w-2/3 bg-purple-700 m-2'>Undo</button>
                    <button onClick={redoClick} className='w-2/3 bg-purple-700 m-2'>Redo</button> */}
                </>
            }
        </div>
    );
}

export default SideBar;

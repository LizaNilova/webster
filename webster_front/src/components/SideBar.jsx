import React from 'react';

const SideBar = ({
  canvasData,
  openForm,
  clearCanvasClick,
  undoClick,
  redoClick,
  addImageToCanvas,
  setBackgroundImage,
  exportAsImage,
  saveCanvasState,
  restoreCanvasState,
  onChangeBGColor,
  addText,
  createProject,
  updateProject,
}) => {
  return (
    <div className="w-1/6 min-h-screen flex flex-col items-center p-2 border-r-2 border-purple-900">
      <p className="sidebar-item-title hover:cursor-default glow text">
        Create new canvas
      </p>
      <button
        onClick={() => {
          openForm('Create');
        }}
        className="w-2/3 bg-purple-700 m-2 purple"
      >
        Create new canvas
      </button>
      <button
        onClick={() => {
          openForm('Select project');
        }}
        className="w-2/3 bg-purple-700 m-2 purple"
      >
        Load project
      </button>
      {localStorage.getItem('savedState') && !canvasData.curProject?.id && (
        <button
          onClick={restoreCanvasState}
          className="w-2/3 bg-purple-700 m-2 purple"
        >
          Load last saved project
        </button>
      )}
      {canvasData && canvasData.name && !canvasData.curProject?.id && (
        <button
          onClick={createProject}
          className="w-2/3 bg-purple-700 m-2 purple"
        >
          Create project
        </button>
      )}
      {canvasData && canvasData.name && canvasData.curProject?.id && (
        <button
          onClick={updateProject}
          className="w-2/3 bg-purple-700 m-2 purple"
        >
          Update project
        </button>
      )}
      {canvasData && canvasData.width > 0 && (
        <>
          <p
            className="sidebar-item-title glow text"
            onClick={() => {
              let ac = document.getElementById('canvas-actions-container');
              ac.classList.toggle('hidden');
              let ac_up = document.getElementById('canvas-actions-chevron-up');
              let ac_down = document.getElementById(
                'canvas-actions-chevron-down'
              );
              ac_up.classList.toggle('hidden');
              ac_down.classList.toggle('hidden');
            }}
          >
            Canvas
            <svg
              id="canvas-actions-chevron-up"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <svg
              id="canvas-actions-chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </p>
          <div
            className="w-full text-center hidden"
            id="canvas-actions-container"
          >
            <div className="w-full flex">
              <button
                onClick={() => {
                  exportAsImage('png');
                }}
                className="w-2/3 bg-purple-700 m-1.5 purple"
              >
                Export as PNG
              </button>
              <button
                onClick={() => {
                  exportAsImage('jpeg');
                }}
                className="w-2/3 bg-purple-700 m-1.5 purple"
              >
                Export as JPEG
              </button>
            </div>
            <div className="w-full flex items-center py-1 my-1">
              <label className="p-1 glow text">Set background color: </label>
              <input
                type="color"
                className="w-1/3 rounded-sm mr-1"
                defaultValue={canvasData.color}
                onChange={onChangeBGColor}
              />
            </div>
            {/* <button className='w-2/3 bg-purple-700 m-2'>Change</button> */}
            <button
              onClick={saveCanvasState}
              className="w-2/3 bg-purple-700 m-2 purple"
            >
              Save canvas (locally)
            </button>
            {/* <button onClick={restoreCanvasState} className='w-2/3 bg-purple-700 m-2'>Restore canvas (local save)</button> */}
            <button
              onClick={clearCanvasClick}
              className="w-2/3 bg-purple-700 m-2 purple"
            >
              Clear canvas
            </button>
          </div>
          <p
            className="sidebar-item-title glow text"
            onClick={() => {
              let ac = document.getElementById('add-image-container');
              ac.classList.toggle('hidden');
              let ac_up = document.getElementById('add-image-chevron-up');
              let ac_down = document.getElementById('add-image-chevron-down');
              ac_up.classList.toggle('hidden');
              ac_down.classList.toggle('hidden');
            }}
          >
            Image
            <svg
              id="add-image-chevron-up"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <svg
              id="add-image-chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </p>
          <div className="w-full text-center hidden" id="add-image-container">
            <label class="block">
              <span class="sr-only">Choose File</span>
              <input
                type="file"
                class="block purple w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white` hover:file:bg-purple-700 transition"
                accept="image/*"
                id="image-upload"
              />
            </label>
            <div className="w-full flex">
              <button
                onClick={() => {
                  let file = document.getElementById('image-upload').files[0];
                  // console.log(file);
                  if (file) addImageToCanvas(file);
                }}
                className="w-1/3 bg-purple-700 m-1 purple"
              >
                Add
              </button>
              <button
                onClick={() => {
                  let file = document.getElementById('image-upload').files[0];
                  // console.log(file);
                  if (file) setBackgroundImage(file);
                }}
                className="w-2/3 bg-purple-700 m-1 text-sm purple"
              >
                Background
              </button>
            </div>
            <div className='w-full flex flex-col'>
                        <button onClick={()=>{openForm('Select background')}} className='w-5/6 bg-purple-700 m-2'>Choose background</button>
                        <button onClick={()=>{openForm('Select element')}} className='w-5/6 bg-purple-700 m-2'>Choose rofl element</button>
                        <button onClick={()=>{openForm('Select ui')}} className='w-5/6 bg-purple-700 m-2'>Choose UI element</button>
            </div>
          </div>
          <p
            className="sidebar-item-title glow text"
            onClick={() => {
              let ac = document.getElementById('text-actions-container');
              ac.classList.toggle('hidden');
              let ac_up = document.getElementById('text-actions-chevron-up');
              let ac_down = document.getElementById(
                'text-actions-chevron-down'
              );
              ac_up.classList.toggle('hidden');
              ac_down.classList.toggle('hidden');
            }}
          >
            Text
            <svg
              id="text-actions-chevron-up"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
            <svg
              id="text-actions-chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </p>
          <div
            className="w-full text-center hidden"
            id="text-actions-container"
          >
            <button
              onClick={addText}
              className="w-2/3 bg-purple-700 m-2 purple"
            >
              Add text
            </button>
          </div>
          {/* <button onClick={undoClick} className='w-2/3 bg-purple-700 m-2'>Undo</button>
                    <button onClick={redoClick} className='w-2/3 bg-purple-700 m-2'>Redo</button> */}
        </>
      )}
    </div>
  );
};

export default SideBar;

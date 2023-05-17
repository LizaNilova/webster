import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import CanvasContainer from './CanvasContainer';
import CreateCanvasForm from './createCanvasForm';
import { useDispatch, useSelector } from 'react-redux';
import { useFabricJSEditor } from 'fabricjs-react';
import { setMode } from './redux/CanvasSlice';
import RightSideBar from './RightSideBar';
import { download } from './functions/download';

const MainPage = () => {
  const dispatch = useDispatch();
  let canvasData = useSelector(state => state.canvas);

  const { editor, onReady } = useFabricJSEditor();

  const [history, setHistory] = useState([]);

  const [listeners, setListeners] = useState([]);

  const [savedCanvasState, setCanvasState] = useState(null);

  const [openedForm, changeFormState] = useState(null);

  // const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    editor.canvas.setWidth(canvasData.width);
    editor.canvas.setHeight(canvasData.height);
    editor.canvas.setBackgroundColor(canvasData.color);
    editor.canvas.svgViewportTransformation = false;
    // editor.canvas.setBackgroundImage('https://c8.alamy.com/comp/B12HTK/a-gold-coloured-picture-frame-with-beige-canvas-border-isolated-on-B12HTK.jpg')

    // if (!editor.canvas.__eventListeners["mouse:wheel"]) {
    //   editor.canvas.on('mouse:wheel', function (opt) {
    //     var delta = opt.e.deltaY;
    //     var zoom = editor.canvas.getZoom();
    //     zoom *= 0.999 ** delta;
    //     if (zoom > 3) zoom = 3;
    //     if (zoom < 0.4) zoom = 0.4;
    //     // editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //     editor.canvas.setZoom(zoom);
    //     opt.e.preventDefault();
    //     opt.e.stopPropagation();
    //     var vpt = this.viewportTransform;
    //     // console.log(vpt)
    //     // if (zoom < 0.4) {
    //     //   vpt[4] = 200 - 1000 * zoom / 2;
    //     //   vpt[5] = 200 - 1000 * zoom / 2;
    //     // } else {
    //     //   if (vpt[4] >= 0) {
    //     //     vpt[4] = 0;
    //     //   } else if (vpt[4] < -(editor.canvas.getWidth() - 1000 * zoom)) {
    //     //     vpt[4] = -(editor.canvas.getWidth() - 1000 * zoom);
    //     //   }
    //     //   if (vpt[5] >= 0) {
    //     //     vpt[5] = 0;
    //     //   } else if (vpt[5] < -(editor.canvas.getHeight() - 670 * zoom)) {
    //     //     vpt[5] = -(editor.canvas.getHeight() - 670 * zoom);
    //     //   }
    //     // }
    //   })
    // }

    // if (listeners.findIndex(name => name === "selection:created") < 0) {

    //   editor.canvas.on("selection:created", (opt) => {

    //     let selected_object = opt.selected;
    //     console.log(selected_object[0].type);
    //     // setSelectedObject(selected_object[0]);

    //   })

    //   let newListeners = listeners;
    //   newListeners.push("selection:created");
    //   setListeners(newListeners);
    // }


    // if (!editor.canvas.__eventListeners["selection:updated"]) {
    //   editor.canvas.on("selection:updated", (opt) => {
    //     let selected_object = opt.selected;
    //     console.log(selected_object);
    //   })
    //   let newListeners = listeners;
    //   newListeners.push("selection:updated");
    //   setListeners(newListeners);
    // }

    // if (!editor.canvas.__eventListeners["selection:cleared"]) {
    //   editor.canvas.on("selection:cleared", (opt) => {
    //     // setSelectedObject(null);
    //   })
    //   let newListeners = listeners;
    //   newListeners.push("selection:cleared");
    //   setListeners(newListeners);
    // }


    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        // console.log(editor.canvas);
        if (evt.ctrlKey === true) {
          editor.canvas.setCursor('grab');
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          // var vpt = this.viewportTransform;
          // console.log(vpt)
          // if(vpt[4] <= 0) vpt[4] = 0;
          // vpt[4] += e.clientX - this.lastPosX;
          // vpt[5] += e.clientY - this.lastPosY;
          let viewport_container = document.getElementById('viewport-container').getBoundingClientRect();
          console.log(viewport_container.width, viewport_container.height)
          var zoom = +editor.canvas.getZoom().toFixed(2);
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          if (vpt[4] < 0) {
            if (vpt[4] < -(editor.canvas.getWidth() - viewport_container.width) / 2) {
              vpt[4] = -(editor.canvas.getWidth() - viewport_container.width) / 2;
            }
          } else {
            if (vpt[4] > (editor.canvas.getWidth() - viewport_container.width) / 2) {
              vpt[4] = (editor.canvas.getWidth() - viewport_container.width) / 2;
            }
          }
          if (vpt[5] < 0) {
            if (vpt[5] < -(editor.canvas.getHeight() - viewport_container.height)) {
              vpt[5] = -(editor.canvas.getHeight() - viewport_container.height);
            }
          } else {
            vpt[5] = 0;
          }
          if (editor.canvas.getWidth() <= viewport_container.width) {
            vpt[4] = 0;
          }
          if (editor.canvas.getHeight() <= viewport_container.height) {
            vpt[5] = 0;
          }

          // if (vpt[4] >= 0) {
          //   vpt[4] = 0;
          // } else if (vpt[4] < -(editor.canvas.getWidth() - 1000 * zoom)) {
          //   vpt[4] = -(editor.canvas.getWidth() - 1000 * zoom);
          // }
          // if (vpt[5] >= 0) {
          //   vpt[5] = 0;
          // } else if (vpt[5] < -(editor.canvas.getHeight() - 670 * zoom)) {
          //   vpt[5] = -(editor.canvas.getHeight() - 670 * zoom);
          // }

          console.log(vpt);
          this.requestRenderAll();
          // editor.canvas.setViewportTransform(vpt);
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }



    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
        // console.log(editor.canvas);
      });
    }

    editor.canvas.renderAll();


  }, [canvasData, editor?.canvas]);

  const closeForm = () => {
    changeFormState(null);
  }

  const createCanvasClick = () => {
    changeFormState('Create');
  }

  const toggleDrawingClick = () => {
    if (canvasData.mode !== 'drawing') {
      editor.canvas.isDrawingMode = true;
      editor.canvas.selection = false;
      editor.canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: '#000',
      });
      dispatch(setMode('drawing'));
    } else {
      editor.canvas.isDrawingMode = false;
      editor.canvas.selection = true;
      dispatch(setMode('default'));
    }
  }

  const clearCanvasClick = () => {
    editor.canvas.getObjects().forEach((obj) => {
      if (obj !== editor.canvas.backgroundImage) {
        editor.canvas.remove(obj);
      }
    })
    setHistory([]);
    editor.canvas.renderAll();
  }

  const removeSelectedClick = () => {
    console.log('Object:', editor.canvas.getActiveObject(), 'Objects:', editor.canvas.getActiveObjects())
    let newHistory = history;
    // console.log(editor.canvas.getActiveObject());
    // newHistory.push(editor.canvas.getActiveObject());
    // editor.canvas.remove(editor.canvas.getActiveObject());
    newHistory.push(...editor.canvas.getActiveObjects());
    editor.canvas.remove(...editor.canvas.getActiveObjects());
    editor.canvas.discardActiveObject();
    // console.log('new', newHistory, 'hist', history);
    setHistory(newHistory);
  };

  const undoClick = () => {
    if (editor.canvas._objects.length > 0) {
      let newHistory = history;
      newHistory.push(editor.canvas._objects.pop());
      setHistory(newHistory);
    }
    editor.canvas.renderAll();
  }

  const redoClick = () => {
    // console.log('Redo: ', history, editor.canvas._objects);
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
    // editor.canvas.renderAll();
  }

  const setBrushSize = (width) => {
    // console.log(width);
    editor.canvas.freeDrawingBrush.width = width;
    // editor.canvas.renderAll();
  }

  const setBrushColor = (color) => {
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }

  const onUploadImage = (e) => {
    // console.log(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (function (f) {
      return function (e) {
        // Here you can use `e.target.result` or `this.result`
        // and `f.name`.
        console.log(e.target.result);
        fabric.Image.fromURL(e.target.result, (img) => {
          console.log(img)
          editor.canvas.add(img);
          editor.canvas.viewportCenterObject(img);
        })
      };
    })(file);
    reader.readAsDataURL(file);
  }

  const uploadBackgroundImage = () => {

  }

  const saveAsPNG = () => {
    var vpt = editor.canvas.viewportTransform;
    vpt[4] = 0;
    vpt[5] = 0;
    editor.canvas.setViewportTransform(vpt);
    editor.canvas.renderAll();
    let canvasUrl = editor.canvas.toDataURL();
    download(canvasUrl, canvasData.name + '.png');
    console.log(canvasUrl);
  }

  const groupObjects = () => {
    if (!editor.canvas.getActiveObject()) {
      return;
    }
    if (editor.canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    editor.canvas.getActiveObject().toGroup();
    editor.canvas.requestRenderAll();
  }

  const unGroupObjects = () => {
    if (!editor.canvas.getActiveObject()) {
      return;
    }
    if (editor.canvas.getActiveObject().type !== 'group') {
      return;
    }
    editor.canvas.getActiveObject().toActiveSelection();
    editor.canvas.requestRenderAll();
  }

  const saveCanvasState = () => {
    setCanvasState(editor.canvas.toJSON());
  }

  const restoreCanvasState = () => { 
    editor.canvas.loadFromJSON(savedCanvasState);
  }

  const changeShadow = (color, blur, offset) => {

  }

  const applyFilter = (index, filter) => {
    let obj = editor?.canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    editor?.canvas.requestRenderAll();
  }

  const applyFilterValue = (index, prop, value) => {
    let obj = editor?.canvas.getActiveObject();
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      obj.applyFilters();
      editor?.canvas.requestRenderAll();
    }
  }


  // console.log(history);
  // console.log(editor?.canvas.freeDrawingBrush);

  return (
    <>
      {openedForm && <CreateCanvasForm closeForm={closeForm} />}
      <Header />
      <div className='w-full h-full min-h-screen flex bg-dark-purple'>
        <SideBar
          canvasData={canvasData}
          createCanvasClick={createCanvasClick}
          clearCanvasClick={clearCanvasClick}
          redoClick={redoClick}
          undoClick={undoClick}
          onUploadImage={onUploadImage}
          saveAsPNG={saveAsPNG}
          saveCanvasState={saveCanvasState}
          restoreCanvasState={restoreCanvasState}
        />

        <CanvasContainer name={canvasData?.name} onReady={onReady} />

        <RightSideBar
          canvasData={canvasData}
          brushData={{
            brushSize: editor?.canvas.freeDrawingBrush.width,
            brushColor: editor?.canvas.freeDrawingBrush.color,
            brushShadow: editor?.canvas.freeDrawingBrush.shadow
          }}
          toggleDrawingClick={toggleDrawingClick}
          removeSelectedClick={removeSelectedClick}
          // mode={canvasData?.mode} 
          setBrushSize={setBrushSize}
          setBrushColor={setBrushColor}
          groupClick={groupObjects}
          unGroupClick={unGroupObjects}
          applyFilter={applyFilter}
          applyFilterValue={applyFilterValue}
          selectedObject={editor?.canvas.getActiveObject()}
        />

      </div>
    </>
  );
}

export default MainPage;

import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import CanvasContainer from '../components/CanvasContainer';
import CreateCanvasForm from '../components/CreateCanvasForm';
import { useDispatch, useSelector } from 'react-redux';
import { useFabricJSEditor } from 'fabricjs-react';
import { createProject, setCurProject, setData, setMode, updateProject } from '../redux/CanvasSlice';
import RightSideBar from '../components/RightSideBar';
import { download } from '../functions/download';
import { dataURItoBlob } from '../functions/toBlob';
import ChooseProject from '../components/ChooseProject';
// import fabric from 'fabric';


const MainPage = () => {
  const dispatch = useDispatch();
  let canvasData = useSelector(state => state.canvas);

  const { editor, onReady } = useFabricJSEditor();

  const [history, setHistory] = useState([]);

  const [openedForm, changeFormState] = useState(null);

  useEffect(() => {

    if (!editor || !fabric) {
      return;
    }

    // if(editor.canvas.width === canvasData.width) return;
    // editor?.canvas.dispose();
    // editor.canvas = fabric.;
    if(canvasData?.curProject?.setting)
    {
      console.log('111');
      editor.canvas.loadFromJSON(canvasData?.curProject?.setting);
    } else{
      console.log('else');
      clearCanvasClick()
    } 
      
    // editor.canvas.loadFromJSON(JSON.parse(canvasData?.curProject.setting));

    editor.canvas.setWidth(canvasData.width);
    editor.canvas.setHeight(canvasData.height);
    editor.canvas.setBackgroundColor(canvasData.color);
    editor.canvas.svgViewportTransformation = false;

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
  }, [canvasData.curProject, canvasData.width, canvasData.height, editor?.canvas]);

  const closeForm = () => {
    changeFormState(null);
  }

  const openForm = (form) => {
    changeFormState(form);
  }

  const toggleDrawingClick = () => {
    if (canvasData.mode !== 'drawing') {
      editor.canvas.isDrawingMode = true;
      editor.canvas.selection = false;
      editor.canvas.freeDrawingBrush = new fabric.PencilBrush(editor.canvas);
      editor.canvas.freeDrawingBrush.width = 1;
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

  const toggleEraser = () => {
    if (canvasData.mode !== 'eraser') {
      dispatch(setMode('eraser'));
      editor.canvas.isDrawingMode = true;
      editor.canvas.selection = false;
      editor.canvas.freeDrawingBrush = new fabric.EraserBrush(editor.canvas);
      editor.canvas.freeDrawingBrush.width = 10;
      editor.canvas.freeDrawingBrush.shadow = null;
      // editor.canvas.requestRenderAll()
    } else {
      dispatch(setMode('default'));
      editor.canvas.freeDrawingBrush = new fabric.PencilBrush(editor.canvas);
      editor.canvas.freeDrawingBrush.width = 1;
      editor.canvas.isDrawingMode = false;
      editor.canvas.selection = true;
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
    // console.log('undo')
    // editor.canvas.undo();
    // if (editor.canvas._objects.length > 0) {
    //   let newHistory = history;
    //   newHistory.push(editor.canvas._objects.pop());
    //   setHistory(newHistory);
    // }
    // editor.canvas.renderAll();

  }

  const redoClick = () => {
    // console.log('Redo: ', history, editor.canvas._objects);
    // if (history.length > 0) {
    //   editor.canvas.add(history.pop());
    // }
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

  const addImageToCanvas = (file) => {
    // console.log(e.target.files[0]);
    const reader = new FileReader();
    // const file = e.target.files[0];
    reader.onload = (function (f) {
      return function (e) {
        // Here you can use `e.target.result` or `this.result`
        // and `f.name`.
        console.log(e.target.result);
        fabric.Image.fromURL(e.target.result, (img) => {
          console.log(img)
          let imageTextureSize = img.width > img.height ? img.width : img.height;

          if (imageTextureSize > fabric.textureSize) {
            fabric.textureSize = imageTextureSize;
          }
          if (img.width >= canvasData.width)
            img.scaleToWidth(canvasData.width - 10, false)
          if (img.height >= canvasData.height)
            img.scaleToHeight(canvasData.height - 10, false)
          editor.canvas.add(img);
          editor.canvas.viewportCenterObject(img);
        })
      };
    })(file);
    reader.readAsDataURL(file);
  }

  const setBackgroundImage = (file) => {
    const reader = new FileReader();
    reader.onload = (function (f) {
      return function (e) {
        console.log(e.target.result);
        fabric.Image.fromURL(e.target.result, (img) => {
          console.log(img)
          // editor.canvas.add(img);
          // editor.canvas.viewportCenterObject(img);
          // if(img.width != canvasData.width)
          //   img.scaleToWidth(canvasData.width, false)
          // if(img.height != canvasData.height)
          //   img.scaleToHeight(canvasData.height, false)
          editor.canvas.setBackgroundImage(img);
          editor.canvas.requestRenderAll();
        })
      };
    })(file);
    reader.readAsDataURL(file);
  }

  const exportAsImage = (type) => {
    var vpt = editor.canvas.viewportTransform;
    vpt[4] = 0;
    vpt[5] = 0;
    editor.canvas.setViewportTransform(vpt);
    editor.canvas.renderAll();
    let canvasUrl = editor.canvas.toDataURL(`image/${type}`);
    download(canvasUrl, canvasData.name + `.${type}`);
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
    let jsonState = editor.canvas.toJSON();
    jsonState.width = canvasData.width;
    jsonState.height = canvasData.height;
    jsonState.name = canvasData.name;
    jsonState.color = canvasData.color;
    console.log(jsonState);
    localStorage.setItem('savedState', JSON.stringify(jsonState));
    // setCanvasState(editor.canvas.toJSON());
  }

  const restoreCanvasState = () => {
    let jsonState = localStorage.getItem('savedState');
    let str = JSON.parse(jsonState);
    dispatch(setData({ width: str?.width, height: str?.height, color: str?.color, name: str?.name, json: jsonState }))
    // console.log(jsonState);
    if (jsonState) {
      clearCanvasClick();
      editor.canvas.loadFromJSON(jsonState);
    }

    // editor.canvas.loadFromJSON(savedCanvasState);
  }

  const createProjectClick = () => {
    let jsonState = editor.canvas.toJSON();
    jsonState.width = canvasData.width;
    jsonState.height = canvasData.height;
    // jsonState.name = canvasData.name;
    jsonState.color = canvasData.color;

    var vpt = editor.canvas.viewportTransform;
    vpt[4] = 0;
    vpt[5] = 0;
    editor.canvas.setViewportTransform(vpt);
    editor.canvas.renderAll();
    let canvasUrl = editor.canvas.toDataURL(`image/png`);
    let blob = dataURItoBlob(canvasUrl);


    console.log('json:', JSON.stringify(jsonState), 'file:', blob, 'name', canvasData.name);

    let fd = new FormData();
    fd.append('name', canvasData.name);
    fd.append('image', blob);
    fd.append('setting', JSON.stringify(jsonState));
    dispatch(createProject(fd));
  }

  const changeBrushShadow = (color, blur, offset) => {
    // console.log(editor.canvas.freeDrawingBrush.shadow)
    // console.log(color, blur, offset)
    editor.canvas.freeDrawingBrush.shadow.color = color;
    editor.canvas.freeDrawingBrush.shadow.blur = blur;
    editor.canvas.freeDrawingBrush.shadow.offsetX = offset;
    editor.canvas.freeDrawingBrush.shadow.offsetY = offset;
    editor.canvas.requestRenderAll();
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

  const rotate = (direction) => {
    let obj = editor.canvas.getActiveObject();
    let angle = obj.angle;
    if (direction === 'right') {
      if (angle >= 360) angle = 0;
      obj.rotate(angle + 90);
      editor.canvas.requestRenderAll();
    } else {
      if (angle <= 0) angle = 360;
      obj.rotate(angle - 90);
      editor.canvas.requestRenderAll();
    }
  }

  const onChangeBGColor = (e) => {
    editor.canvas.setBackgroundColor(e.target.value);
    editor.canvas.requestRenderAll();
  }

  const onChangeHeight = (value) => {
    editor.canvas.getActiveObject().scaleToHeight(value, false);
    editor.canvas.requestRenderAll()
  }

  const onChangeWidth = (value) => {
    editor.canvas.getActiveObject().scaleToWidth(value, false);
    editor.canvas.requestRenderAll()
  }

  const addText = () => {
    let text = new fabric.IText('Text ...');
    editor.canvas.add(text);
    editor.canvas.viewportCenterObject(text);
    editor.canvas.requestRenderAll()
  }

  const applyTextFilter = (filterName, value) => {
    console.log(filterName, value);
    let text = editor.canvas.getActiveObject();
    // text[filterName] = value;
    text.set(filterName, value);
    editor.canvas.requestRenderAll();
  }

  const loadProject = (projectData) => {
    // console.log(JSON.parse(projectData.setting));
    let parsed = JSON.parse(projectData.setting);
    dispatch(setCurProject(projectData));
    dispatch(setData({ width: parsed?.width, height: parsed?.height, color: parsed?.color, name: projectData.name, json: projectData.setting }))
    if (projectData.setting) {
      clearCanvasClick()
      editor.canvas.loadFromJSON(projectData.setting);
    }
  }


  const updateProjectClick = () => {
    let jsonState = editor.canvas.toJSON();
    jsonState.width = canvasData.width;
    jsonState.height = canvasData.height;
    // jsonState.name = canvasData.name;
    jsonState.color = canvasData.color;

    var vpt = editor.canvas.viewportTransform;
    vpt[4] = 0;
    vpt[5] = 0;
    editor.canvas.setViewportTransform(vpt);
    editor.canvas.renderAll();
    let canvasUrl = editor.canvas.toDataURL(`image/png`);
    let blob = dataURItoBlob(canvasUrl);


    console.log('json:', JSON.stringify(jsonState), 'file:', blob, 'name', canvasData.name);

    let fd = new FormData();
    fd.append('image', blob);
    fd.append('setting', JSON.stringify(jsonState));
    dispatch(updateProject({id: canvasData.curProject.id, formData: fd }));
  }

  return (
    <>
      {openedForm === 'Create' && <CreateCanvasForm closeForm={closeForm} />}
      {openedForm === 'Select project' && <ChooseProject closeForm={closeForm} loadProject={loadProject}/> }
      {/* <SaveAndPostForm /> */}
      <div className='w-full h-full min-h-screen flex bg-dark-purple text-white'>
        <SideBar
          canvasData={canvasData}
          openForm={openForm}
          clearCanvasClick={clearCanvasClick}
          redoClick={redoClick}
          undoClick={undoClick}
          addImageToCanvas={addImageToCanvas}
          setBackgroundImage={setBackgroundImage}
          exportAsImage={exportAsImage}
          saveCanvasState={saveCanvasState}
          restoreCanvasState={restoreCanvasState}
          onChangeBGColor={onChangeBGColor}
          addText={addText}
          createProject={createProjectClick}
          updateProject={updateProjectClick}
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
          rotate={rotate}
          changeBrushShadow={changeBrushShadow}
          toggleEraser={toggleEraser}
          onChangeHeight={onChangeHeight}
          onChangeWidth={onChangeWidth}
          applyTextFilter={applyTextFilter}
        />

      </div>
    </>
  );
}

export default MainPage;

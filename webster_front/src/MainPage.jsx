import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import CanvasContainer from './CanvasContainer';
import CreateCanvasForm from './createCanvasForm';
import { useDispatch, useSelector } from 'react-redux';
import { useFabricJSEditor } from 'fabricjs-react';
import { setMode } from './redux/CanvasSlice';
import RightSideBar from './RightSideBar';

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
        editor.canvas.setWidth(canvasData.width);
        editor.canvas.setHeight(canvasData.height);
        editor.canvas.setBackgroundColor(canvasData.color);
    }, [canvasData, editor]);

    const closeForm = () => {
        changeFormState(null);
    }
    const createCanvasClick = () => {
        changeFormState('Create');
    }

    const toggleDrawingClick = () => {
        if(canvasData.mode !== 'drawing')
        {
            editor.canvas.isDrawingMode = true;
            dispatch(setMode('drawing'));
        } else {
            editor.canvas.isDrawingMode = false;
            dispatch(setMode('default'));
        }
    }

    const clearCanvasClick = () => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length);
        let newHistory = history;
        newHistory.splice(0, newHistory.length);
        setHistory(newHistory);
        editor.canvas.renderAll();
    }

    const removeSelectedClick = () => {
        let newHistory = history;
        // console.log(editor.canvas.getActiveObject());
        newHistory.push(editor.canvas.getActiveObject());
        editor.canvas.remove(editor.canvas.getActiveObject());
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
        console.log('Redo: ', history, editor.canvas._objects)
        if (history.length > 0) {
            editor.canvas.add(history.pop());
        }
        // editor.canvas.renderAll();
    }
    
    console.log(history)
    return(
        <>
            { openedForm && <CreateCanvasForm closeForm={closeForm}/> }
            <Header />
            <div className='w-full h-full min-h-screen flex bg-dark-purple'>
                <SideBar 
                    createCanvasClick={createCanvasClick} 
                    toggleDrawingClick={toggleDrawingClick} 
                    removeSelectedClick={removeSelectedClick}
                    clearCanvasClick={clearCanvasClick}
                    redoClick={redoClick}
                    undoClick={undoClick}/>
                <CanvasContainer onReady={onReady}/>
                <RightSideBar />
            </div>
        </>
    );
}

export default MainPage;

import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./App.css";

export default function Example() {
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
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
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
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
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL(
      "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
      (image) => {
        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas)
        );
      }
    );
  };
    // console.log('history init')
    // editor.canvas._historyInit();
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

  const fromSvg = () => {
    fabric.loadSVGFromString(
      `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
    <desc>Created with Fabric.js 5.3.0</desc>
    <defs>
    </defs>
    <g transform="matrix(1 0 0 1 662.5 750)"  >
      <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg" x="-662.5" y="-750" width="1325" height="1500"></image>
    </g>
    <g transform="matrix(1 0 0 1 120.5 120.5)"  >
    <circle style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" r="20" />
    </g>
    <g transform="matrix(1 0 0 1 245.5 200.5)"  >
    <line style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x1="-75" y1="-50" x2="75" y2="50" />
    </g>
    <g transform="matrix(1 0 0 1 141.4 220.03)" style=""  >
        <text xml:space="preserve" font-family="Arial" font-size="16" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(53,54,58); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-16.9" y="-5.46" >inset</tspan><tspan x="-16.9" y="15.51" >text</tspan></text>
    </g>
    <g transform="matrix(1 0 0 1 268.5 98.5)"  >
    <rect style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  x="-20" y="-20" rx="0" ry="0" width="40" height="40" />
    </g>
    </svg>`,
      (objects, options) => {
        editor.canvas._objects.splice(0, editor.canvas._objects.length);
        editor.canvas.backgroundImage = objects[0];
        const newObj = objects.filter((_, index) => index !== 0);
        newObj.forEach((object) => {
          editor.canvas.add(object);
        });

        editor.canvas.renderAll();
      }
    );
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  const toggleSize = () => {
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12);
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };
  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };
  const addText = () => {
    editor.addText("inset text");
  };

  const exportSVG = () => {
    const svg = editor.canvas.toSVG();
    console.info(svg);
  };

  return (
    <div className="App">
      <h1>FabricJS React Sample</h1>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle} disabled={!cropImage}>
        Add Rectangle
      </button>
      <button onClick={addText} disabled={!cropImage}>
        Add Text
      </button>
      <button onClick={toggleDraw} disabled={!cropImage}>
        Toggle draw
      </button>
      <button onClick={clear} disabled={!cropImage}>
        Clear
      </button>
      <button onClick={undo} disabled={!cropImage}>
        Undo
      </button>
      <button onClick={redo} disabled={!cropImage}>
        Redo
      </button>
      <button onClick={toggleSize} disabled={!cropImage}>
        ToggleSize
      </button>
      <button onClick={removeSelectedObject} disabled={!cropImage}>
        Delete
      </button>
      <button onClick={(e) => setCropImage(!cropImage)}>Crop</button>
      <label disabled={!cropImage}>
        <input
          disabled={!cropImage}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <button onClick={exportSVG} disabled={!cropImage}>
        {" "}
        ToSVG
      </button>
      <button onClick={fromSvg} disabled={!cropImage}>
        fromsvg
      </button>

      <div
        style={{
          border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
          width: "500px",
          height: "500px"
        }}
      >
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
}

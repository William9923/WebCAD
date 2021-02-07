/* Application Constant */
export const vertexScriptType = "x-shader/x-vertex";
export const fragmentScriptType = "x-shader/x-fragment";

export const vertexScriptId = "vertex-shader";
export const fragmentScriptId = "fragment-shader";

export const positionalAttr = "vPosition";
export const colorAttr = "vColor";

export const maxNumberOfPoints = 200000;

import {render} from './shared/utils.js';

/* Application Context */
export let context = {
    gl: null,
    canvas : null,

    bufferId : null,
    cbufferId : null,

    mouseClicked : false,
    currentColor : [0,0,0],
    
    points : [],
    colors: [],
    dots: [],
    startIdx : [],
    types : [],
    mode: "line",
}

// export const mouseDownFreeDrawEvent = () => {
//     context.mouseClicked = true; 
//     context.mode = "paint"; 
// }

// export const mouseUpFreeDrawEvent = () => {
//     context.mouseClicked = false;
//     context.currPoints = []
// }

// export const mouseMovingFreeDrawEvent = (event) => {
//     if (context.mouseClicked && context.mode === "paint") {
//         let x = -1 + 2 * event.offsetX / context.canvas.width;
//         let y = -1 + 2 * (context.canvas.height- event.offsetY) / context.canvas.height;
//         context.currPoints.push(vec2(x,y));
//         render(context);
//     }
// }

const lengthDotType = (type) => {
    switch(type) {
        case "line" : return 2;
        case "square" : return 4;
        case "polygon" : return 5;
    }
}

export const mouseDownLineEvent = (event) => {
    context.mouseClicked = true;
    context.mode = "line";

    context.types.push(context.mode);
    context.dots.push(lengthDotType(context.mode));
    context.startIdx.push(
        context.startIdx.length > 0 ? 
            context.startIdx[context.startIdx.length-1] + lengthDotType(context.types[context.types.length - 1]) 
            : 0
    );
    
    let x = -1 + 2 * event.offsetX / context.canvas.width;
    let y = -1 + 2 * (context.canvas.height- event.offsetY) / context.canvas.height;
    
    // for start point and last point
    for (let i = 0; i < 2; i++) {
        context.points.push(vec2(x,y));
    }

}

export const mouseUpLineEvent = () => {
    context.mouseClicked = false;
}

export const mouseMovingLineEvent = (event) => {
    if (context.mouseClicked && context.mode === "line") {
        let x = -1 + 2 * event.offsetX / context.canvas.width;
        let y = -1 + 2 * (context.canvas.height- event.offsetY) / context.canvas.height;
        let lastIndex = context.points.length - 1;
        context.points[lastIndex] = vec2(x,y);
        render(context);
    }
}

export const mouseDownSquareEvent = () => {

}

export const mouseUpSquareEvent = () => {

}

export const mouseMovingSquareEvent = (event) => {

}
export const mouseDownPolygonEvent = () => {

}

export const mouseUpPolygonEvent = () => {

}

export const mouseMovingPolygonEvent = (event) => {

}

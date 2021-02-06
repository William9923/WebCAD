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

    lineColor : [0,0,0],

    currPoints : [],
    colors: [],
    points: [],

    lineWidth: 5
}

export const mouseDownEvent = () => {
    context.mouseClicked = true; 
    console.log(vec2);
    console.log("down");
}

export const mouseUpEvent = () => {
    context.mouseClicked = false;
    context.currPoints = []
    console.log("up");
}

export const mouseMovingEvent = (event) => {
    if (context.mouseClicked) {
        context.currPoints.push(vec2(-1 + 2 * event.offsetX / context.canvas.width, -1 + 2 * (context.canvas.height- event.offsetY) / context.canvas.height));
        console.log(context.currPoints);
        
        render(context);
        console.log(context.currPoints);
    }
    
}

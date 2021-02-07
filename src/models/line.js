import { context, threshold } from '../app.js';
import { lengthDotType } from '../shared/utils.js';

import { render } from '../shared/utils.js';
import { euclidianDistance } from '../shared/math.js';


export const mouseDownLineEvent = (event, context) => {
    context.mouseClicked = true;
    context.mode = "line";

    context.types.push(context.mode);
    context.dots.push(lengthDotType(context.mode));
    context.startIdx.push(
        context.startIdx.length > 0 ?
            context.startIdx[context.startIdx.length - 1] + lengthDotType(context.types[context.types.length - 1])
            : 0
    );

    let x = -1 + 2 * event.offsetX / context.canvas.width;
    let y = -1 + 2 * (context.canvas.height - event.offsetY) / context.canvas.height;

    // for start point and last point
    for (let i = 0; i < 2; i++) {
        context.points.push(vec2(x, y));
    }

}

export const mouseUpLineEvent = (context) => {
    context.mouseClicked = false;
}

export const mouseMovingLineEvent = (event) => {
    if (context.mouseClicked && context.mode === "line") {
        let x = -1 + 2 * event.offsetX / context.canvas.width;
        let y = -1 + 2 * (context.canvas.height - event.offsetY) / context.canvas.height;
        let lastIndex = context.points.length - 1;
        context.points[lastIndex] = vec2(x, y);
        render(context);
    }
}

export const mouseDownEditLineEvent = (event, context) => {

    context.mouseClicked = true;
    context.mode = "edit-line"

    let x = -1 + 2 * event.offsetX / context.canvas.width;
    let y = -1 + 2 * (context.canvas.height - event.offsetY) / context.canvas.height;

    let minIdx = -1;
    let min = 999;

    context.types.forEach((val, idx) => {

        if (val === "line") {
            let arrIdx = context.startIdx[idx];
            let startLine = context.points[arrIdx];
            let endLine = context.points[arrIdx + 1];

            const firstDistance = euclidianDistance(startLine, vec2(x, y));
            const secondDistance = euclidianDistance(endLine, vec2(x, y));

            if (firstDistance < threshold && firstDistance < min) {
                min = firstDistance;
                minIdx = arrIdx;
            }

            if (secondDistance < threshold && secondDistance < min) {
                min = secondDistance;
                minIdx = arrIdx + 1;
            }
        }

    });

    // threshold passed, found target
    if (minIdx != -1 && min != 999) {
        context.editPointsIdx = minIdx;
    }

}

export const mouseUpEditLineEvent = (context) => {

    context.mouseClicked = false;
    context.editPointsIdx = -1; // default
}

export const mouseMovingEditLineEvent = (event, context) => {

    if (context.mouseClicked && context.editPointsIdx != -1
        && context.editPointsIdx < context.points.length
        && context.mode === "edit-line") {
        let x = -1 + 2 * event.offsetX / context.canvas.width;
        let y = -1 + 2 * (context.canvas.height - event.offsetY) / context.canvas.height;

        context.points[context.editPointsIdx] = vec2(x, y);
        render(context);
    }

}

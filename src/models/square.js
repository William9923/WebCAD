import { threshold } from '../app.js';
import { lengthDotType } from '../shared/utils.js';

import { render, createSquare } from '../shared/utils.js';

export const mouseDownSquareEvent = (event, context) => {
    context.mouseClicked = true;
    context.mode = "square";

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
    for (let i = 0; i < 4; i++) {
        context.points.push(vec2(x, y));
    }
}

export const mouseUpSquareEvent = (context) => {
    context.mouseClicked = false;
}

export const mouseMovingSquareEvent = (event, context) => {
    if (context.mouseClicked && context.mode === "square") {
        console.log("Square Event Moving");
        let x = -1 + 2 * event.offsetX / context.canvas.width;
        let y = -1 + 2 * (context.canvas.height - event.offsetY) / context.canvas.height;
        let lastIndex = (context.points.length - 4);

        const arrOfPoints = createSquare(context.points[lastIndex], vec2(x, y), context);

        const [forthPoints, thirdPoints, secondPoints, ...rest] = arrOfPoints.reverse();

        context.points[lastIndex + 1] = secondPoints;
        context.points[lastIndex + 2] = thirdPoints;
        context.points[lastIndex + 3] = forthPoints;

        render(context);
    }

}
import { Context } from '../models/Context.js';
import Line, { createLineVectorColor } from '../models/Line.js';
import Square, { createSquareVectorColor } from '../models/Square.js';

export const clear = () => {
    Context.getInstance().reset();
    render();
}

const createDots = () => Context.getInstance().getShapes().map(shape => shape.getNDots());

const createPoints = () => {
    const shapes = Context.getInstance().getShapes();
    const points = [];
    shapes.forEach(shape => {
        points.push(...shape.getPoints())
    });
    return points;
}

const createStartIdx = () => {
    const startIdx = [0];
    const shapes = Context.getInstance().getShapes();
    for (let i = 0; i < shapes.length - 1; i++) {
        startIdx.push(startIdx[i] + shapes[i].getNDots());
    }
    if (shapes.length === 0) {
        startIdx.pop();
    }
    return startIdx;
}

const createColors = () => {
    const shapes = Context.getInstance().getShapes();
    const colors = [];
    shapes.forEach(shape => {
        switch (shape.getShapeType()) {
            case "line":
                colors.push(...createLineVectorColor(shape.getColor()));
                break;
            case "square":
                colors.push(...createSquareVectorColor(shape.getColor()));
                break;
        }
    });
    return colors;
}

export const render = () => {

    const bufferId = Context.getInstance().getBufferId();
    const cbufferId = Context.getInstance().getCBufferId();
    const shapes = Context.getInstance().getShapes();

    const dots = createDots();
    const points = createPoints();
    const colors = createColors();
    const startIdx = createStartIdx();
    let gl = Context.getInstance().getGl();

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    /* Validate */
    if (colors.length != points.length) {
        throw new Error("Colors and Points length not matched");
    }

    if (dots.length != startIdx.length) {
        throw new Error("Dots and startIdx length not matched");
    }

    /* Draw the shapes */
    shapes.forEach((shape, idx) => {
        switch (shape.getShapeType()) {
            case "line":
                gl.drawArrays(gl.LINES, startIdx[idx], dots[idx]);
                break;
            case "square":
                gl.drawArrays(gl.TRIANGLE_FAN, startIdx[idx], dots[idx]);
                break;
        }
    })
}

import { Context } from '../models/Context.js';

import { render } from '../shared/utils.js';
import { euclidianDistance } from '../shared/math.js';
import { threshold } from '../shared/constant.js';
import Square, { findCrossPoint } from '../models/Square.js';

export const mouseDownSquareEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();
    Context.getInstance().changeMode("square");
    Context.getInstance().addShape(new Square(vec2(x, y), vec2(x, y), Context.getInstance().getColor()));
}

export const mouseUpSquareEvent = () => {
    Context.getInstance().releaseClick();
    render();
}

export const mouseMovingSquareEvent = (event) => {
    if (Context.getInstance().isClicked() && Context.getInstance().getMode() === "square") {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;
        const lastShape = Context.getInstance().getShapes().pop();
        Context.getInstance().addShape(new Square(lastShape.getPoints()[0], vec2(x, y), Context.getInstance().getColor()));
        render();
    }
}

export const mouseDownEditSquareEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();
    Context.getInstance().changeMode("edit-square");

    let minIdx = -1;
    let min = 999;
    let nPoint = -1;

    const shapes = Context.getInstance().getShapes();
    shapes.forEach((shape, idx) => {
        if (shape.getShapeType() === "square") {
            const points = shape.getPoints();
            for (let i = 0; i < points.length; i++) {
                const distance = euclidianDistance(points[i], vec2(x, y));
                if (distance < min && distance < threshold) {
                    min = distance;
                    minIdx = idx;
                    nPoint = i;
                }
            }
        }
    });

    // threshold passed, found target
    if (minIdx != -1 && min != 999) {
        const square = Context.getInstance().getShapes()[minIdx];
        square.setColor(Context.getInstance().getColor());
        Context.getInstance().getShapes().splice(minIdx, 1);
        Context.getInstance().getShapes().push(square);

        const balancePoint = findCrossPoint(square.getPoints(), square.getPoints()[nPoint]);
        Context.getInstance()._editShapeControlPointIdx = balancePoint;
    }

}

export const mouseUpEditSquareEvent = () => {
    Context.getInstance().releaseClick();
    Context.getInstance()._editShapeControlPointIdx = -1;
    render();
}

export const mouseMovingEditSquareEvent = (event) => {

    const mode = Context.getInstance().getMode();
    if (Context.getInstance().isClicked() && mode === "edit-square" && Context.getInstance()._editShapeControlPointIdx != -1) {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

        const lastIdx = Context.getInstance().getShapes().length - 1;

        console.log(Context.getInstance().getShapes()[lastIdx]);
        Context.getInstance().getShapes()[lastIdx] = new Square(Context.getInstance()._editShapeControlPointIdx, vec2(x, y), Context.getInstance().getColor())
        render();
    }
}
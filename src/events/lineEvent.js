import { Context } from '../models/Context.js';

import { render } from '../shared/utils.js';
import { euclidianDistance } from '../shared/math.js';
import { threshold } from '../shared/constant.js';
import Line from '../models/line.js';

export const mouseDownLineEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();
    Context.getInstance().changeMode("line");
    Context.getInstance().addShape(new Line(vec2(x, y), vec2(x, y), Context.getInstance().getColor()));
}

export const mouseUpLineEvent = () => {
    Context.getInstance().releaseClick();
    render();
}

export const mouseMovingLineEvent = (event) => {
    if (Context.getInstance().isClicked() && Context.getInstance().getMode() === "line") {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

        const lastIndex = Context.getInstance().getShapes().length - 1;
        Context.getInstance().getShapes()[lastIndex].setPoint(vec2(x, y), 1);
        render();
    }
    
}

export const mouseDownEditLineEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();
    Context.getInstance().changeMode("edit-line");

    let minIdx = -1;
    let min = 999;
    let nPoint = -1;

    const shapes = Context.getInstance().getShapes();
    shapes.forEach((shape, idx) => {
        if (shape.getShapeType() === "line") {
            const [firstPoint, secondPoint] = shape.getPoints();
            const firstDistance = euclidianDistance(firstPoint, vec2(x, y));
            const secondDistance = euclidianDistance(secondPoint, vec2(x, y));

            if (firstDistance < threshold && firstDistance < min) {
                min = firstDistance;
                minIdx = idx;
                nPoint = 0;
            }

            if (secondDistance < threshold && secondDistance < min) {
                min = secondDistance;
                minIdx = idx;
                nPoint = 1;
            }
        }
    })

    // threshold passed, found target
    if (minIdx != -1 && min != 999) {
        const line = Context.getInstance().getShapes()[minIdx];
        Context.getInstance().getShapes().splice(minIdx,1);
        Context.getInstance().getShapes().push(line);
        Context.getInstance()._editShapeControlPointIdx = nPoint;
    }
    
}

export const mouseUpEditLineEvent = () => {
    Context.getInstance().releaseClick();
    Context.getInstance()._editShapeControlPointIdx = -1;
    render();
}

export const mouseMovingEditLineEvent = (event) => {

    const mode = Context.getInstance().getMode();

    if (Context.getInstance().isClicked() && mode === "edit-line") {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;
        const lastIdx = Context.getInstance().getShapes().length - 1;
        Context.getInstance().getShapes()[lastIdx].setPoint(vec2(x, y), Context.getInstance()._editShapeControlPointIdx);
        render();
    }
    
}

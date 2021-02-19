import { Context } from '../models/Context.js';

import { render } from '../shared/utils.js';
import { euclidianDistance } from '../shared/math.js';
import { threshold } from '../shared/constant.js';
import Polygon from '../models/polygon.js';
import Line from '../models/line.js';

export const mouseDownPolygonEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();

    let minIdx = -1;
    let min = 999;
    let nPoint = -1;

    const shapes = Context.getInstance().getShapes();
    shapes.forEach((shape, idx) => {
        if (shape.getShapeType() === "line") {
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

    // Get first point in the first line
    let lenShapes = Context.getInstance().getShapes().length
    // Get number of polygon vertices
    let nPolygon = Context.getInstance().getNPolygon();
    // Get the first point in the polygon
    let firstPoint = Context.getInstance().getShapes()[lenShapes - nPolygon + 1][0];
    // Current point
    let point = Context.getInstance().getShapes()[minIdx].getPoints();

    // threshold passed, found target
    if (minIdx != -1 && min != 999) {
        // if equals the first point of the line, then polygon complete.
        if (point[0] === firstPoint[0] && point[1] === firstPoint[1]) {
            Context.getInstance().finishPolygon();
        }
    }

    if (!Context.getInstance().isPolygonFinished()) { // If not finished, draw a line
        Context.getInstance().changeMode("line");
        Context.getInstance().addShape(new Line(vec2(x, y), vec2(x, y), Context.getInstance().getColor()));
        // Add the new vertex to the count
        Context.getInstance().addPolygonVertex(point);
    } else { // If finished, then pop all of the lines and draw the polygon
        for (var i = 1; i <= Context.getInstance().getNPolygon(); i++) {
            Context.getInstance().getShapes().pop();
        }
        // fetch vertices and color, push polygon to shape array
        let arrVertices = Context.getInstance().getPolygonVertices();
        Context.getInstance().addShape(new Polygon(arrVertices, Context.getInstance().getColor()));
    }
}

export const mouseUpPolygonEvent = () => {
    render();
}

export const mouseMovingPolygonEvent = (event) => {
    // Draw lines until it's finished
    if (!Context.getInstance().isPolygonFinished() > 0 && Context.getInstance().getMode() === "polygon") {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;
        const lastShape = Context.getInstance().getShapes().pop();
        Context.getInstance().addShape(new Line(lastShape.getPoints()[0], vec2(x, y), Context.getInstance().getColor()));
        render();
    }
}
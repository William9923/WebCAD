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

    var curPoint = null;

    if (Context.getInstance().getNPolygon() > 0) {
        
        // Alternating for the polygon construction: after 1st vertex, whenever clicked means storing new vertex to array
        if (Context.getInstance().getNPolygon() > 1) {
            const lastIndex = Context.getInstance().getShapes().length - 1;
            const nextVertex = Context.getInstance().getShapes()[lastIndex].getPoints()[1];
            Context.getInstance().addPolygonVertex(nextVertex);
        }

        /* Threshold point block begin */
        let minIdx = -1;
        let min = 999;
        let nPoint = -1;

        const shapes = Context.getInstance().getShapes();
        const shapelen = shapes.length;
        shapes.forEach((shape, idx) => {
            if (shape.getShapeType() === "line" && idx < shapelen - 1) {
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
        let firstPoint = Context.getInstance().getShapes()[lenShapes - nPolygon + 1].getPoints()[0];

        console.log(Context.getInstance().getPolygonVertices());
        console.log(firstPoint);
    
        // threshold passed, found target
        if (minIdx != -1 && min != 999) {
            // Current point
            curPoint = Context.getInstance().getShapes()[minIdx].getPoints()[0];
            // if equals the first point of the line, then polygon complete.
            if (curPoint[0] === firstPoint[0] && curPoint[1] === firstPoint[1]) {
                console.log("IWAW MASHOK");
                Context.getInstance().finishPolygon();
            }
        }
        /* Threshold point block end */
    }
    
    if (!curPoint) {
        curPoint = vec2(x,y);
    }

    if (!Context.getInstance().isPolygonFinished()) { // If not finished, draw a line
        if (Context.getInstance().getNPolygon() == 0) {
            Context.getInstance().changeMode("line");
            Context.getInstance().addShape(new Line(vec2(x, y), vec2(x, y), Context.getInstance().getColor()));
            Context.getInstance().addPolygonVertex(vec2(x,y));
        }
    } else { // If finished, then pop all of the lines and draw the polygon
        for (var i = 1; i < Context.getInstance().getNPolygon(); i++) {
            Context.getInstance().getShapes().pop();
        }
        // fetch vertices and color, push polygon to shape array
        let arrVertices = Context.getInstance().getPolygonVertices();
        Context.getInstance().addShape(new Polygon(arrVertices, Context.getInstance().getColor()));
        // flush all polygon
        Context.getInstance().flushPolygon();
    }
}

export const mouseUpPolygonEvent = () => {
    Context.getInstance().releaseClick();
    const lastIndex = Context.getInstance().getShapes().length - 1;
    const nextVertex = Context.getInstance().getShapes()[lastIndex].getPoints()[1];
    
    // Alternating for the polygon construction: for the 1st vertex, whenever unclicked means storing new vertex to array
    if (Context.getInstance().getNPolygon() == 1) {
        Context.getInstance().addPolygonVertex(nextVertex);
    }

    Context.getInstance().changeMode("line");
    Context.getInstance().addShape(new Line(nextVertex, nextVertex, Context.getInstance().getColor()));
    render();
}

export const mouseMovingPolygonEvent = (event) => {
    // Satiesfied condition when clicked on the first vertex OR unclicked for the rest of the vertices, all while the polygon is not finished
    let satisfied = (Context.getInstance().isClicked() && Context.getInstance().getNPolygon() == 1) || (!Context.getInstance().isClicked() && Context.getInstance().getNPolygon() > 1);
    satisfied = satisfied && !Context.getInstance().isPolygonFinished();
    // Draw lines until it's finished
    if (satisfied) {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;
        const lastIndex = Context.getInstance().getShapes().length - 1;
        Context.getInstance().getShapes()[lastIndex].setPoint(vec2(x, y), 1);
        render();
    }
}
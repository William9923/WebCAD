/* eslint no-console:0 consistent-return:0 */
"use strict";

import Shape from './Shape.js';

export default class Polygon extends Shape {
    constructor(arrayofPoints, color) {
        super(createPolygon(arrayOfPoints), color);
        this._startPoint = startPoint;
        this._type = "square";
    }

    setPoint(newPoint, idx) {
        const startPoint = this._startPoint;
        this._points = createPolygon(startPoint, newPoint);
    }
}

const createPolygon = (arrPoints) => {
    return arrPoints;
}

export const createSquareVectorColor = (arr, color) => {
    const colors = []
    for (let i = 0; i < arr.length; i++) {
        colors.push([...color]);
    }

    return colors;
} 

export const findCrossPoint = (points, start) => {
    return points.filter(point => point[0] != start[0] && point[1] != start[1])[0];
}
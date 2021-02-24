/* eslint no-console:0 consistent-return:0 */
"use strict";

export default class Shape {
    constructor(points, color) {
        this._points = points;
        this._color = color;
        this._type = "shape";
    }

    getShapeType() {
        return this._type;
    }

    getPoints() {
        return this._points;
    }

    getColor() {
        return this._color;
    }

    getNDots() {
        return this._points.length;
    }

    setColor(color) {
        this._color = color;
    }

    setPoint(newPoint, idx) {
        this._points[idx] = newPoint;
    }
}
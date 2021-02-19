/* eslint no-console:0 consistent-return:0 */
"use strict";

import Shape from './Shape.js';

export default class Polygon extends Shape {
    constructor(arrayOfPoints, color) {
        super(createPolygon(arrayOfPoints), color);
        this._arr = arrayOfPoints;
        this._color = color;
        this._type = "polygon";
    }

    getArrayOfPoints() {
        return this._arr;
    }
}

const createPolygon = (arrPoints) => {
    return arrPoints;
}

export const createPolygonVectorColor = (arr, color) => {
    const colors = [];
    for (let i = 0; i < arr.length; i++) {
        colors.push([...color]);
    }

    return colors;
} 
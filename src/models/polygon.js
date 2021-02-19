/* eslint no-console:0 consistent-return:0 */
"use strict";

import Shape from './Shape.js';

export default class Polygon extends Shape {
    constructor(arrayOfPoints, color) {
        super(createPolygon(arrayOfPoints), nvert, color);
        this._color = color;
        this._type = "polygon";
    }
}

const createPolygon = (arrPoints) => {
    return arrPoints;
}

export const createPolygonVectorColor = (arr, color) => {
    const colors = []
    for (let i = 0; i < arr.length; i++) {
        colors.push([...color]);
    }

    return colors;
} 
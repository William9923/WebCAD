/* eslint no-console:0 consistent-return:0 */
"use strict";

import Shape from './Shape.js';

export default class Line extends Shape {
    constructor(startPoint, endPoint, color) {
        super([startPoint, endPoint], color);
        this._type = "line";
    }

    
}

export const createLineVectorColor = (color) => {
    const colors = []
    for (let i = 0; i < 2; i++) {
        colors.push([...color]);
    }

    return colors;
} 
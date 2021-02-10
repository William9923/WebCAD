/* eslint no-console:0 consistent-return:0 */
"use strict";

import Shape from './Shape.js';

export default class Square extends Shape {
    constructor(startPoint, endPoint, color) {
        super(createSquare(startPoint, endPoint), color);
        this._startPoint = startPoint;
        this._type = "square";
    }

    setPoint(newPoint, idx) {
        const startPoint = this._startPoint;
        this._points = createSquare(startPoint, newPoint);
    }
}
const quadran = (x, y) => {
    if (x == 1 && y == 1) {
        return 1;
    } else if (x == -1 && y == 1) {
        return 3;
    } else if (x == -1 && y == -1) {
        return 2;
    } else {
        return 4;
    }
}

const createSquare = (start, end) => {
    let delta_x = Math.abs(end[0] - start[0]);
    let delta_y = Math.abs(end[1] - start[1]);
    let delta = Math.max(delta_x, delta_y);

    let beta_x = (end[0] - start[0]) < 0 ? -1 : 1;
    let beta_y = (end[1] - start[1] > 0) ? -1 : 1;

    delta_x = delta * beta_x;
    delta_y = delta * beta_y;

    switch (quadran(beta_x, beta_y)) {
        case 1:
            return [
                vec2(start[0], start[1]),
                vec2(start[0] + delta_x, start[1]),
                vec2(start[0] + delta_x, start[1] - delta_y),
                vec2(start[0], start[1] - delta_y)
            ];
        default:
            return [
                vec2(start[0], start[1]),
                vec2(start[0], start[1] - delta_y),
                vec2(start[0] + delta_x, start[1] - delta_y),
                vec2(start[0] + delta_x, start[1]),
            ];
    }
}

export const createSquareVectorColor = (color) => {
    const colors = []
    for (let i = 0; i < 4; i++) {
        colors.push([...color]);
    }

    return colors;
} 

export const findCrossPoint = (points, start) => {
    return points.filter(point => point[0] != start[0] && point[1] != start[1])[0];
}
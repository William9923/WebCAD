/* eslint no-console:0 consistent-return:0 */
"use strict";

export default class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    getPoints() {
        return vec2(this._x, this._y);
    }

    setX(digit) {
        this._x = digit;
    }

    setY(digit) {
        this._y = digit;
    }
}
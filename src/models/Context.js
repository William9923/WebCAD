/* eslint no-console:0 consistent-return:0 */
"use strict";

export class Context {

    static _instance;

    constructor() {
        // event context
        this._mouseClick = false;

        this._gl = null;
        this._canvas = null;

        this._mode = "";

        // editing context
        this._editShapeIdx = -1;
        this._editShapeControlPointIdx = -1;

        // shape memory context
        this._shapes = [];

        this._currentColor = [0, 0, 0];

        // polygon data
        this._polygonFinished = false;
        this._nPolygon = 0; // How many vertices
        this._arrPolygonVertices = []; // list of vertices
    }

    reset() {
        this._mouseClick = false;
        this._shapes = [];
        // editing context
        this._editShapeIdx = -1;
        this._editShapeControlPointIdx = -1;
        this._polygonFinished = false;
        this._nPolygon = 0;
    }

    static getInstance() {
        if (Context._instance) {
            return Context._instance;
        }
        Context._instance = new Context();
        return Context._instance;
    }

    setGl(gl) {
        this._gl = gl;
    }

    setBufferId(id) {
        this._bufferId = id;
    }

    setCBufferId(id) {
        this._cBufferId = id;
    }

    setCanvas(canvas) {
        this._canvas = canvas;
    }

    setColor(color) {
        this._currentColor = color;
    }

    getColor() {
        return this._currentColor;
    }

    getGl() {
        return this._gl;
    }

    getBufferId() {
        return this._bufferId;
    }

    getCBufferId() {
        return this._cBufferId;
    }

    getCanvas() {
        return this._canvas;
    }

    getMode() {
        return this._mode;
    }

    click() {
        this._mouseClick = true;
    }

    releaseClick() {
        this._mouseClick = false;
    }

    isClicked() {
        return this._mouseClick;
    }

    getShapes() {
        return this._shapes;
    }

    setShapes(shapes) {
        this._shapes = shapes;
    }

    addShape(shape) {
        this._shapes.push(shape);
    }

    changeMode(mode) {
        this._mode = mode;
    }

    finishPolygon() {
        this._polygonFinished = true;
    }

    isPolygonFinished() {
        return this._polygonFinished;
    }

    addPolygonVertex(point) {
        this._nPolygon++;
        this._arrPolygonVertices.push(point);
    }

    getNPolygon() {
        return this._nPolygon;
    }

    getPolygonVertices() {
        return this._arrPolygonVertices;
    }

    popPolygonVertex() {
        this._arrPolygonVertices.pop();
    }

    flushPolygon() {
        this._nPolygon = 0;
        this._arrPolygonVertices = [];
        this._polygonFinished = false;
    }
}

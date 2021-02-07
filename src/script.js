/* eslint no-console:0 consistent-return:0 */
"use strict";

import { init } from './shared/init.js';
import { context } from './app.js';

import { mouseDownLineEvent, mouseUpLineEvent, mouseMovingLineEvent } from './models/line.js';
import { mouseDownEditLineEvent, mouseUpEditLineEvent, mouseMovingEditLineEvent } from './models/line.js';

import {mouseDownSquareEvent, mouseMovingSquareEvent, mouseUpSquareEvent} from './models/square.js'; 

import { clear } from './shared/utils.js';

const attachEventListener = (context) => {

    context.canvas.addEventListener("mousemove", function (event) {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseMovingEditLineEvent(event, context);
                break;
            case "square":
                mouseMovingSquareEvent(event, context);
                break;
            default:
                mouseMovingLineEvent(event, context);
                break;
        }
    });

    context.canvas.addEventListener("mousedown", function (event) {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseDownEditLineEvent(event, context);
                break;
            case "square":
                mouseDownSquareEvent(event, context);
                break;
            default:
                mouseDownLineEvent(event, context);
                break;
        }
    });

    context.canvas.addEventListener("mouseup", function () {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseUpEditLineEvent(context);
                break;
            case "square":
                mouseUpSquareEvent(context);
                break;
            default:
                mouseUpLineEvent(context);
                break;
        }
    });

    document.querySelector("#resetBtn").addEventListener("click", function () {
        clear(context);
    });
}

const main = () => {
    init(context);
    attachEventListener(context);
}

window.onload = main;
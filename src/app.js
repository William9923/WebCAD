/* eslint no-console:0 consistent-return:0 */
"use strict";

import { init } from './shared/init.js';
import { Context } from './models/Context.js';

import { mouseDownLineEvent, mouseUpLineEvent, mouseMovingLineEvent } from './events/lineEvent.js';
import { mouseDownEditLineEvent, mouseUpEditLineEvent, mouseMovingEditLineEvent } from './events/lineEvent.js';

import { mouseDownSquareEvent, mouseMovingSquareEvent, mouseUpSquareEvent } from './events/squareEvent.js';

import { clear, render } from './shared/utils.js';

const attachEventListener = () => {
    const canvas = Context.getInstance().getCanvas();
    canvas.addEventListener("mousemove", function (event) {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseMovingEditLineEvent(event);
                break;
            case "square":
                mouseMovingSquareEvent(event);
                break;
            default:
                mouseMovingLineEvent(event);
                break;
        }
    });

    canvas.addEventListener("mousedown", function (event) {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseDownEditLineEvent(event);
                break;
            case "square":
                mouseDownSquareEvent(event);
                break;
            default:
                mouseDownLineEvent(event);
                break;
        }
    });

    canvas.addEventListener("mouseup", function () {
        let val = document.querySelector("#selector-model").value;
        switch (val) {
            case "paint":
                break;
            case "edit-line":
                mouseUpEditLineEvent();
                break;
            case "square":
                mouseUpSquareEvent();
                break;
            default:
                mouseUpLineEvent();
                break;
        }

    });

    document.querySelector("#resetBtn").addEventListener("click", function () {
        clear();
    });
}

const main = () => {
    init();
    attachEventListener();
}

window.onload = main;
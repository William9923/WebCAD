/* eslint no-console:0 consistent-return:0 */
"use strict";

import { init } from './shared/init.js';
import { context, mouseDownEvent, mouseUpEvent, mouseMovingEvent } from './app.js';
import { clear } from './shared/utils.js';

const attachEventListener = (context) => {
    context.canvas.addEventListener("mousemove", function (event) {
        mouseMovingEvent(event, context);
    });

    context.canvas.addEventListener("mousedown", function () {
        mouseDownEvent()
    });

    context.canvas.addEventListener("mouseup", function () {
        mouseUpEvent()
    });

    document.querySelector(".menu-button1").addEventListener("click", function () {
        clear(context);
    });
}

const main = () => {
    init(context);
    attachEventListener(context);

    context.currPoints = [];
    
}

window.onload = main;
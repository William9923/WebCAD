/* eslint no-console:0 consistent-return:0 */
"use strict";

import { init } from './shared/init.js';
import { context,  mouseDownLineEvent,  mouseUpLineEvent, mouseMovingLineEvent } from './app.js';
import { clear } from './shared/utils.js';

const attachEventListener = (context) => {

    context.canvas.addEventListener("mousemove", function (event) {
        let val = document.querySelector("#selector-model").value;
        console.log(val);
        switch (val) {
            case "paint" : 
                break;
            default: 
                mouseMovingLineEvent(event);
                break;
           }
    });

    context.canvas.addEventListener("mousedown", function (event) {
        let val = document.querySelector("#selector-model").value;
        console.log(val);
        switch (val) {
            case "paint" : 
                break;
            default : 
                mouseDownLineEvent(event);
                break;
        }
    });

    context.canvas.addEventListener("mouseup", function () {
        let val = document.querySelector("#selector-model").value;
        console.log(val);
        switch (val) {
            case "paint" : 
                break;
            default : 
                mouseUpLineEvent();
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
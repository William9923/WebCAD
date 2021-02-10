/* eslint no-console:0 consistent-return:0 */
"use strict";

import { init } from './shared/init.js';
import { Context } from './models/Context.js';

import { mouseDownLineEvent, mouseUpLineEvent, mouseMovingLineEvent } from './events/lineEvent.js';
import { mouseDownEditLineEvent, mouseUpEditLineEvent, mouseMovingEditLineEvent } from './events/lineEvent.js';

import { mouseDownSquareEvent, mouseMovingSquareEvent, mouseUpSquareEvent } from './events/squareEvent.js';
import { mouseDownEditSquareEvent, mouseMovingEditSquareEvent, mouseUpEditSquareEvent } from './events/squareEvent.js';

import { clear, render, parseImport, prepareExport } from './shared/utils.js';

let file = null;

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
            case "edit-square":
                mouseMovingEditSquareEvent(event);
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
            case "edit-square":
                mouseDownEditSquareEvent(event);
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
            case "edit-square":
                mouseUpEditSquareEvent();
                break;
            default:
                mouseUpLineEvent();
                break;
        }

    });

    document.querySelector("#resetBtn").addEventListener("click", function () {
        clear();
    });

    document.querySelector("#file-import").addEventListener("change", function (event) {
        file = event.target.files[0];

        if (!file) {
            alert("File is not supported for this web application");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            parseImport(content);
            render();
        }
        reader.onerror = (e) => {
            const error = e.target.error;
            console.error(`Error occured while reading ${file.name}`, error);
            alert("File is not supported for this web application");
        }
        reader.readAsText(file)
    });

    document.querySelector("#exportBtn").addEventListener('click', function () {
        const data = "data:text/json;charset=utf-8," + encodeURIComponent(prepareExport());

        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", data);
        downloadAnchorNode.setAttribute("download", "Testing" + ".json");

        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

    })
}

const main = () => {
    init();
    attachEventListener();
}

window.onload = main;
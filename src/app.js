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
}

const attachExternalFileListener = () => {
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

    });

}

const attachColorPickerListener = () => {
    document.querySelector("#color-input").addEventListener("change", function (event) {
        const val = event.target.value;

        document.querySelector("#color-input").value = val;

        const hex_code = val.split("");
        const red = parseInt(hex_code[1] + hex_code[2], 16);
        const green = parseInt(hex_code[3] + hex_code[4], 16);
        const blue = parseInt(hex_code[5] + hex_code[6], 16);

        Context.getInstance().setColor([red/255.0, green/255.0, blue/255.0]);
        console.log("tes");
        console.log(Context.getInstance().getColor());
    });
}

const main = () => {
    init();
    attachEventListener();
    attachExternalFileListener();
    attachColorPickerListener();
}

window.onload = main;
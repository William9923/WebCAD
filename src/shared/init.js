/* eslint no-console:0 consistent-return:0 */
"use strict";

import {
    fragmentScriptId, maxNumberOfPoints,
    colorAttr, positionalAttr,
    vertexScriptId
} from '../app.js';

export const init = (context) => {

    let canvas = document.getElementById("glCanvas");
    let gl = WebGLUtils.setupWebGL(canvas);

    // Checking if web gl initialize in the user browser
    if (!gl) {
        alert("Unable to initialize WebGL. User browser currently not supporting web gl");
        return;
    }
    // configure Web GL 
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    let program = initShaders(gl, vertexScriptId, fragmentScriptId)

    gl.useProgram(program);

    // Vertex buffer
    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumberOfPoints, gl.STATIC_DRAW);
    let vPosition = gl.getAttribLocation(program, positionalAttr);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Color buffer
    let cbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumberOfPoints, gl.STATIC_DRAW);
    let vColor = gl.getAttribLocation(program, colorAttr);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    context.cbufferId = cbufferId;
    context.bufferId = bufferId;
    context.canvas = canvas;
    context.gl = gl;

    // Bind Event Listener
}

const createShader = (gl, type, source) => {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

const loadSource = (id) => document.querySelector(`#${id}`).text;

const createProgram = (gl, vertexShader, fragmentShader) => {
    let program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
        return program;
    }

    console.log(gl.getProgramLogInfo(program));
    gl.deleteProgram(program);
}

const initShaders = (gl, vertexShaderId, fragmentShaderId) => {
    var vertShdr;
    var fragShdr;

    var vertElem = document.getElementById(vertexShaderId);
    if (!vertElem) {
        alert("Unable to load vertex shader " + vertexShaderId);
        return -1;
    }
    else {
        vertShdr = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShdr, vertElem.text);
        gl.compileShader(vertShdr);
        if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {
            var msg = "Vertex shader failed to compile.  The error log is:"
                + "<pre>" + gl.getShaderInfoLog(vertShdr) + "</pre>";
            alert(msg);
            return -1;
        }
    }

    var fragElem = document.getElementById(fragmentShaderId);
    if (!fragElem) {
        alert("Unable to load vertex shader " + fragmentShaderId);
        return -1;
    }
    else {
        fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShdr, fragElem.text);
        gl.compileShader(fragShdr);
        if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {
            var msg = "Fragment shader failed to compile.  The error log is:"
                + "<pre>" + gl.getShaderInfoLog(fragShdr) + "</pre>";
            alert(msg);
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertShdr);
    gl.attachShader(program, fragShdr);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var msg = "Shader program failed to link.  The error log is:"
            + "<pre>" + gl.getProgramInfoLog(program) + "</pre>";
        alert(msg);
        return -1;
    }

    return program;
}



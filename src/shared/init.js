import { Context } from '../models/Context.js';
import { colorAttr, fragmentScriptId, vertexScriptId, positionalAttr, maxNumberOfPoints } from '../shared/constant.js';

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

export const init = () => {

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

    /* setup context */
    Context.getInstance().setCanvas(canvas);
    Context.getInstance().setCBufferId(cbufferId);
    Context.getInstance().setGl(gl);
    Context.getInstance().setBufferId(bufferId);
}


/* Application Constant */
export const vertexScriptType = "x-shader/x-vertex";
export const fragmentScriptType = "x-shader/x-fragment";

export const vertexScriptId = "vertex-shader";
export const fragmentScriptId = "fragment-shader";

export const positionalAttr = "vPosition";
export const colorAttr = "vColor";

export const threshold = 0.1;

/* Application Context */
export var context = {
    gl: null,
    canvas: null,

    bufferId: null,
    cbufferId: null,

    mouseClicked: false,
    currentColor: [0, 0, 0],

    points: [],
    colors: [],
    dots: [],
    startIdx: [],
    types: [],
    mode: "",

    editPointsIdx: -1
}
export const clear = (context) => {

    context.mouseClicked = false;

    context.points = [];
    context.colors = [];
    context.dots = [];
    context.startIdx = [];
    context.types = [];
    context.mode = "";

    context.editPointsIdx = -1;
    render(context);
}

export const lengthDotType = (type) => {
    switch (type) {
        case "line": return 2;
        case "square": return 4;
        case "polygon": return 5;
    }
}


// const createLine = (begin, end, lineWidth) => {
//     // get initial and final pts on a line, return rectangle with width
//     var width = lineWidth * 0.001;
//     var beta = (Math.PI / 2.0) - Math.atan2(end[1] - begin[1], end[0] - begin[0]);
//     var delta_x = Math.cos(beta) * width;
//     var delta_y = Math.sin(beta) * width;
//     return [vec2(begin[0] - delta_x, begin[1] + delta_y),
//     vec2(begin[0] + delta_x, begin[1] - delta_y),
//     vec2(end[0] + delta_x, end[1] - delta_y),
//     vec2(end[0] - delta_x, end[1] + delta_y)];
// }

export const render = (context) => {

    let { bufferId, cbufferId, dots, points, colors, gl, types, startIdx } = context;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    for (let i = 0; i < types.length; i++) {
        if (types[i] === "line") {
            gl.drawArrays(gl.LINES, startIdx[i], dots[i]);
        } else if (types[i] === "square") {
            gl.drawArrays(gl.TRIANGLE_FAN, startIdx[i], dots[i]);
        }
    }
    context.gl = gl;
}

const quadran = (x, y) => {
    if (x == 1 && y == 1) {
        return 1;
    } else if (x == -1 && y == 1) {
        return 3;
    } else if (x == -1 && y == -1) {
        return 2;
    } else {
        return 4;
    }

}

export const createSquare = (start, end) => {
    let delta_x = Math.abs(end[0] - start[0]);
    let delta_y = Math.abs(end[1] - start[1]);
    let delta = Math.max(delta_x, delta_y);

    let beta_x = (end[0] - start[0]) < 0 ? -1 : 1;
    let beta_y = (end[1] - start[1] > 0) ? -1 : 1;

    delta_x = delta * beta_x;
    delta_y = delta * beta_y;

    switch (quadran(beta_x, beta_y)) {
        case 1:
            return [
                vec2(start[0], start[1]),
                vec2(start[0] + delta_x, start[1]),
                vec2(start[0] + delta_x, start[1] - delta_y),
                vec2(start[0], start[1] - delta_y)
            ];
        default:
            return [
                vec2(start[0], start[1]),
                vec2(start[0], start[1] - delta_y),
                vec2(start[0] + delta_x, start[1] - delta_y),
                vec2(start[0] + delta_x, start[1]),
            ];
    }
}

export const createPolygon = () => { }
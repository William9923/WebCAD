export const clear = (context) => {
    context.points = [];
    context.currPoints = [];
    context.colors = [];
    render(context);
}

const createLine = (begin, end, lineWidth) => {
    // get initial and final pts on a line, return rectangle with width
    var width = lineWidth * 0.001;
    var beta = (Math.PI / 2.0) - Math.atan2(end[1] - begin[1], end[0] - begin[0]);
    var delta_x = Math.cos(beta) * width;
    var delta_y = Math.sin(beta) * width;
    return [vec2(begin[0] - delta_x, begin[1] + delta_y),
    vec2(begin[0] + delta_x, begin[1] - delta_y),
    vec2(end[0] + delta_x, end[1] - delta_y),
    vec2(end[0] - delta_x, end[1] + delta_y)];
}

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
        }
    }
    context.gl = gl;
}

export const createSquare = (start, end) => {

    let beta = (Math.PI / 2.0) - Math.atan2(end[1] - begin[1], end[0] - begin[0]);
    let delta = Math.cos(beta) * width;

    return [
        vec2(start[0], start[1]),
        vec2(start[0] + delta, start[1]),
        vec2(start[0] + delta, start[1] + delta),
        vec2(start[0], start[1] + delta)
    ];

}

export const createPolygon = () => {}
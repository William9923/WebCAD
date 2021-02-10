import { Context } from '../models/Context.js';

import { render } from '../shared/utils.js';
import { euclidianDistance } from '../shared/math.js';
import { threshold } from '../shared/constant.js';
import Square from '../models/Square.js';

export const mouseDownSquareEvent = (event) => {

    const canvas = Context.getInstance().getCanvas();
    const x = -1 + 2 * event.offsetX / canvas.width;
    const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;

    Context.getInstance().click();
    Context.getInstance().changeMode("square");
    Context.getInstance().addShape(new Square(vec2(x, y), vec2(x, y), Context.getInstance().getColor()));
}

export const mouseUpSquareEvent = () => {
    Context.getInstance().releaseClick();
    render();
}

export const mouseMovingSquareEvent = (event) => {
    if (Context.getInstance().isClicked() && Context.getInstance().getMode() === "square") {
        const canvas = Context.getInstance().getCanvas();
        const x = -1 + 2 * event.offsetX / canvas.width;
        const y = -1 + 2 * (canvas.height - event.offsetY) / canvas.height;
        const lastShape = Context.getInstance().getShapes().pop();
        Context.getInstance().addShape(new Square(lastShape.getPoints()[0], vec2(x, y), Context.getInstance().getColor()));
        render();
    }
    
}
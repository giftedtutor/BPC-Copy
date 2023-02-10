/* eslint-disable prefer-template */
/* eslint-disable semi */
import React, { useRef, useEffect } from 'react'
import { CutOptimizer, Shape } from "cut-optimizer";

const NpmCutting = props => {

    const canvasRef = useRef(null)
    //Shapes array 
    const shapes = [
        new Shape(10, 22),
        new Shape(12, 220),
        new Shape(13, 230),
        new Shape(13, 20),
        new Shape(120, 241),
        new Shape(120, 241),
        new Shape(120, 241),
        new Shape(120, 241),
        new Shape(120, 241),
        new Shape(120, 241),
        new Shape(120, 241)

    ];

    const cut_opt = new CutOptimizer(500, 500); // CutOptimizer(500, 500); 
    const optimizedsShapes = cut_opt.optimize(shapes);

    const drawShapes = (shapes) => {
        const canvas = canvasRef.current
    const contex = canvas.getContext('2d')
        console.log(shapes)
        contex.strokeStyle = 'black';
        shapes.items.forEach((shape, index) => {
            contex.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
         
            contex.fillRect(shape.x, shape.y, shape.width, shape.height)
            contex.fillText(index, shape.x, shape.y);
            contex.textAlign = 'left';
        });
    }
 
    useEffect(() => {
        drawShapes(optimizedsShapes);
        // console.log(cut_opt);
    }, [optimizedsShapes])


    return <canvas  ref={canvasRef} {...props} />
}

export default NpmCutting
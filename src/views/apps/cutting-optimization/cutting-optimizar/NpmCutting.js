/* eslint-disable prefer-template */
/* eslint-disable semi */
import React from 'react'
import { CutOptimizer, Shape } from "cut-optimizer";
const NpmCutting = () => {

    const cut_opt = new CutOptimizer(300, 300);

    const shapes = [
        new Shape(100, 290),
        new Shape(100, 200),
        new Shape(100, 100)
        // new Shape(13, 20),
        // new Shape(120, 241),
        // new Shape(23, 20)
    ]

    const arr = cut_opt.optimize(shapes)
    console.log('Shapes::::', arr)
    return (
        <div style={{
            height: 300,
            width: 300,
            // height: arr.height,
            // width:  arr.width,
            border: '1px solid black',
            margin: 30,
            overflow: 'hidden'
         
        }}>
            {
                arr.items.map((data, index) => {
                    return (
                        <div style={{
                            height: data.height,
                            width: data.width,
                            marginLeft: data.x,
                            marginTop: (data.y + 20),
                            position: 'absolute',
                            // boxSizing: 'border-box',
                            // border: '1px solid red',
                            overflow: 'hidden',
                            backgroundColor: `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
                        }}
                  
                        >
                            <span> {index}</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default NpmCutting

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { Children, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./CuttedSheet.css";
import * as htmlToImage from 'html-to-image'
import line_background2 from '../../../../assets/images/cutting-optimizar/line_background2.jpg'
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap";
import ResultTable from "./ResultTable";
import generatePDF from "./pdfCuttedSheet";

const CuttedSheet = ({ piecesValues, stockPiecesValues, setPiecesValues, piecesValuesCurrentIndex }) => {
    const domEl = useRef(null)

    // get the height of the div
    const parentDivRef = useRef(null);
    // const divHeight = parentDivRef.current.offsetHeight;
    const [divHeight, setDivHeight] = useState(0);
    const [DesignImageUrl, setDesignImageUrl] = useState('')
    console.log("piecesValues", piecesValues);
    console.log("stockPiecesValues", stockPiecesValues);

    const [textOpen, setTextOpen] = useState(false);
    const [overflowActive, setOverflowActive] = useState(false);
    const sheetWidtHeightRef = useRef();
    const [overflowStyle, setOverflowStyle] = useState({
        overflow: ''
    })
    const [TOTAL_Q_W_L, setTOTAL_Q_W_L] = useState({
        totalQWL: 0,
        material: ''
    })
    const borderStyle = {
        border: '1px solid green',
        // display: 'flex',
        // height: 700,
        // overflow: '',
        // width: 500,
        // backgroundImage: `url(${line_background2})`
    }
    // For out section
    const [outer, setOuter] = useState({
        margin: 20,
        width: 2300 > 1000 ? ((2300 / 1000) * 100) : 2300,
        height: 5000 > 1000 ? ((5000 / 1000) * 100) : 5000,
        widthForDivision: 2300 > 1000 ? 1000 : 2300,
        heightForDivision: 5000 > 1000 ? 1000 : 5000,
        widthDisplay: 2300,
        heightDisplay: 5000,
        display: "flex",
        alignItems: "center",

    });

    const arr = [4]
    // For Sheet Widt Height
    const [sheetWidtHeight, setSheetWidtHeight] = useState({
        margin: 20,
        height: 5000 > 1000 ? ((5000 / 1000) * 100) : 5000,
        width: 2300 > 1000 ? ((2300 / 1000) * 100) : 2300,
        border: "1px solid grey",
        backgroundImage: `url(${line_background2})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    });

    // For Sheet
    const [sheet, setSheet] = useState({
        margin: 0,
        height: 'auto', //5000 > 1000 ? ((5000 / 1000) * 100) : 5000,
        width: 2300 > 1000 ? ((2300 / 1000) * 100) : 2300,
        display: 'flex', // make child elemets to a row,
        // flexDirection:'column',
        justifyContent: 'flex-start',
    });

    const downloadImage = async (type) => {
        const dataUrl = await htmlToImage.toPng(domEl.current)
        if (type === 'pdf') {

            generatePDF(dataUrl, TOTAL_Q_W_L, stockPiecesValues)
        } else {
            // download image
            const link = document.createElement('a')
            link.download = `CuttedSheetResult.${type}`
            link.href = dataUrl
            link.click()
            // toast.success("Design Exported!")
        }
    }
    const isOverflowActive = (event) => {
        return event.offsetHeight < event.scrollHeight || event.offsetWidth < event.scrollWidth;
    }

    useEffect(() => {
        if (isOverflowActive(sheetWidtHeightRef.current)) {
            //  alert('Your sheet is not much enough, Please Reduce Quantity or Add Sheet to Stock!')
            // if (stockPiecesValues.rows[0]?.quantity === 1) {
            //     // to chnage quantity value at specific index
            //     const updateData = piecesValues.map((data, index) => {
            //         return index === piecesValuesCurrentIndex ? { ...data, quantity: 0 } : data
            //     })
            //     setPiecesValues(updateData)
            // }
            // const div = document.createElement('div');
            // div.textContent = 'New Div';
            // div.style.border = "1px solid green";
            // div.style.height = "100px";
            // domEl.current.appendChild(div);
            console.log('OVERFLOW::::', `Your sheet is not much enough, Please Reduce Quantity or Add Sheet to Stock!`)
            setOverflowActive(true);
            return;
        }
        setOverflowActive(false);
    }, [isOverflowActive, piecesValues]);

    useEffect(() => {
        let totalQWL = 0
        let material
        piecesValues.forEach((data) => {

            totalQWL += ((data.length * data.width) * Number(data.quantity))
            material = data.material
            setTOTAL_Q_W_L({
                totalQWL,
                material
            })
        })

    }, [piecesValues])

    useEffect(() => {
        if (Number(piecesValues?.[0].quantity) >= 1) {
            const divHeight = parentDivRef.current.offsetHeight;
            const containerWidth = parentDivRef.current.offsetWidth;
            const childWidths = Array.from(parentDivRef.current.children)
                .map((child) => child.offsetWidth)
                .reduce((acc, curr) => acc + curr);
            const childHeights = Array.from(parentDivRef.current.children)
                .map((child) => child.offsetHeight)
                .reduce((acc, curr) => acc + curr);
            // const remainingWidth = containerWidth - childWidths;
            setDivHeight(divHeight);


            // Get Rows No and Reming width
            // get the parent div height
            const parentHeight = parentDivRef.current?.clientHeight;

            // get the parent div width
            const parentWidth = parentDivRef.current?.clientWidth;

            // get the sub div height
            const subHeight = piecesValues?.[0].width;

            // get the number of sub divs
            const subDivCount = Number(piecesValues?.[0].quantity);

            // calculate the number of rows
            const rows = Math.round((divHeight / subHeight));

            // calculate the remaining space in each row
            const remainingSpace = parentHeight - (subHeight * rows);

            //Calculate the remaining width in each row
            const remainingWidth = containerWidth - (rows * childHeights);


            const totalDev = parentDivRef.current.children.length;
            console.log('Total Height::::::', divHeight,
                'Total Width::::', containerWidth,
                'Remaining Width:::', remainingWidth,
                'Child width:::', childWidths,
                'Child Height Acc..:::', childHeights,
                'Total Div:::', totalDev,
                'No of Rows:::', rows)

                // if (domEl.current.scrollHeight > domEl.current.clientHeight) {
                //     // Create new div when overflow occurs
                //     const div = document.createElement('div');
                //     div.textContent = 'New Div';
                //     domEl.current.appendChild(div);
                //   }
        }

    }, [piecesValues])

    const ActionButtonForDownloadImages = () => {
        return (
            <UncontrolledButtonDropdown direction='right'>
                <DropdownToggle outline color='primary' caret>
                    Export
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => downloadImage('png')}>
                        PNG
                    </DropdownItem>
                    <DropdownItem onClick={() => downloadImage('jpg')}>
                        JPG
                    </DropdownItem>
                    <DropdownItem onClick={() => downloadImage('pdf')}>
                        PDF
                    </DropdownItem>

                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )

    }
    return (
        <div>
            {/* Group Button */}
            <div className="button-section">
                <h3 className="pieces">RESULT</h3>
                <ButtonGroup>

                    <Button size="sm" outline color="success" onClick={() => {
                    }}>Run</Button>
                    <Button size="sm" outline color="warning" onClick={() => {
                    }}>Accept</Button>
                    <ActionButtonForDownloadImages />
                </ButtonGroup>

            </div>
            <hr />
            {
                [...Array(Number(stockPiecesValues.length === 0 ? 1 : stockPiecesValues.rows[0]?.quantity))].map((pData, pIndex) => {
                    return (
                        <div
                            domEl={domEl}
                            id="domEl"
                            ref={domEl}
                            style={{
                                overflowY: 'scroll',
                                height: 300,
                                backgroundColor: 'rgb(247, 247, 247)',
                            }}>
                            <div
                                style={stockPiecesValues.drawingData?.[0].outer}>
                                <div
                                    style={{
                                        transform: "rotate(90deg)",
                                        height: "max-content",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {/* Width */}
                                    {`${stockPiecesValues.drawingData?.[0].outer.heightDisplay} (Width)`}
                                </div>
                                {/* Height */}

                                <div style={{ marginTop: 60 }}>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <p>{`${stockPiecesValues.drawingData?.[0].outer.widthDisplay} (Length)`}</p>
                                    </div>
                                    <div ref={sheetWidtHeightRef} style={{ ...stockPiecesValues.drawingData?.[0].sheetWidtHeight, ...overflowStyle }}>
                                        <div ref={parentDivRef} style={{ ...stockPiecesValues.drawingData?.[0].sheet, ...borderStyle }} className="row">

                                            {piecesValues.map((data, index) => {

                                                return ([...Array(Number(data.quantity))].map((e, i) => {

                                                    return (

                                                        <div
                                                            style={{
                                                                width: ((stockPiecesValues.drawingData?.[0].outer.widthForDivision === 1000) ? (((Number(data.length) / stockPiecesValues.drawingData?.[0].outer.widthForDivision) * 100)) : Number(data.length)),
                                                                height: ((stockPiecesValues.drawingData?.[0].outer.heightForDivision === 1000) ? (((Number(data.width) / stockPiecesValues.drawingData?.[0].outer.heightForDivision) * 100)) : Number(data.width)),
                                                                backgroundColor: data.color,
                                                                color: "white",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                position: 'revert',
                                                                border: '1px solid #000',
                                                                // marginTop: 30,

                                                            }}
                                                        >

                                                            <div
                                                                style={{
                                                                    transform: "rotate(90deg)",
                                                                    color: "white",
                                                                    height: "max-content",


                                                                }}
                                                            >
                                                                <span className="smallFontSize">{data.width}</span>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    textAlign: "center",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    display: 'flex',
                                                                    flexDirection: 'column',

                                                                }}
                                                            >
                                                                <span className="smallFontSize">{data.length}</span>
                                                                <span className="smallFontSize">{data.label}</span>
                                                                <span className="smallFontSize">{i + 1}</span>

                                                            </div>
                                                            {/* Wasted Area */}
                                                            {(overflowActive === true) ? (<div style={{
                                                                backgroundImage: `url(${line_background2})`,
                                                                border: '1px solid green',
                                                                width: 'auto',
                                                                height: ((stockPiecesValues.drawingData?.[0].outer.heightForDivision === 1000) ? (((Number(data.width) / stockPiecesValues.drawingData?.[0].outer.heightForDivision) * 100)) : Number(data.width)),
                                                                zIndex: 0
                                                            }}>
                                                                wasted Area
                                                            </div>) : ''}
                                                            {/* <div style={{
                                                                backgroundImage: `url(${line_background2})`,
                                                                border: '1px solid blue',
                                                                width: 200,
                                                                height: 100,
                                                                position: 'absolute',
                                                                marginLeft: 400,
                                                                zIndex: 0
                                                            }}>
                                                                wasted Area
                                                            </div> */}
                                                        </div>
                                                    )

                                                }));
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                    {/* <ResultTable TOTAL_Q_W_L={TOTAL_Q_W_L} stockPiecesValues={stockPiecesValues} /> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CuttedSheet;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./CuttedSheet.css";
import * as htmlToImage from 'html-to-image'
import line_background2 from '../../../../assets/images/cutting-optimizar/line_background2.jpg'
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap";
import ResultTable from "./ResultTable";
import generatePDF from "./pdfCuttedSheet";

const CuttedSheet = ({ piecesValues, stockPiecesValues, setPiecesValues, piecesValuesCurrentIndex }) => {
    const domEl = useRef(null)
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
            alert('Your sheet is not much enough, Please Reduce Quantity or Add Sheet to Stock!')
            // if (stockPiecesValues.rows[0]?.quantity === 1) {
            //     // to chnage quantity value at specific index
            //     const updateData = piecesValues.map((data, index) => {
            //         return index === piecesValuesCurrentIndex ? { ...data, quantity: 0 } : data
            //     })
            //     setPiecesValues(updateData)
            // }

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
                                height: 700,
                                backgroundColor: 'rgb(247, 247, 247)'
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
                                        <div style={stockPiecesValues.drawingData?.[0].sheet} className="row" >

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
                                                                border: '1px solid white'
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
                                                        </div>
                                                    )

                                                }));
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                    <ResultTable TOTAL_Q_W_L={TOTAL_Q_W_L} stockPiecesValues={stockPiecesValues} />
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

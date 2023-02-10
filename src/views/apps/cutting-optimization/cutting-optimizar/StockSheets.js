/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useEffect } from "react";
import "./index.css";
import { useFormik } from 'formik';
import { Button, ButtonGroup } from "reactstrap";
import { IconButton } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';
import generatePDF from "./pdfStockSheets";
import line_background2 from '../../../../assets/images/cutting-optimizar/line_background2.jpg'
import axios from "axios";
import baseURL from "../../../../base-url/baseURL";
const validate = values => {
    let errors = {};

    // if (values.supplier_id === '') {
    // errors.supplier_id = 'Required';
    // }
    values.stocks.forEach((data, index) => {
        if (!data.length) {
            errors = {
                ...errors,
                [`stocks[${index}]length`]: "Required!",
            };
        }
        if (!data.width) {
            errors = {
                ...errors,
                [`stocks[${index}]width`]: "Required!",
            };
        }
        if (!data.count) {
            errors = {
                ...errors,
                [`stocks[${index}]count`]: "Required!",
            };
        }
        if (!data.grainDirection) {
            errors = {
                ...errors,
                [`stocks[${index}]grainDirection`]: "Required!",
            };
        }
    });

    return errors;
};

const StockSheets = ({ setStockSheetsValues }) => {

    const handleSave = () => {
        // eslint-disable-next-line no-console
        console.log("FormValues");
    };
    const formik = useFormik({
        initialValues: {
            stocks: [
                {
                    length: 5800,
                    width: 100,
                    count: 10,
                    name: '',
                    grainDirection: null
                }
            ],
        },
        validate,
        onSubmit: () => {
            setIsLoading(true);
            setTimeout(handleSave, 2000);
        },
    });
    const removeRow = i => {
        formik.setFieldValue("stocks", [
            ...formik.values.stocks.slice(0, i),
            ...formik.values.stocks.slice(i + 1),
        ]);
    };


    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData
        const pastedData = parseFloat(clipboardData.getData('text'))

        if (pastedData < 0) {
            e.preventDefault()
        }
    }
    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault()
        }
    }
    const piecesTable = formik.values.stocks && formik.values.stocks.map((data, index) => {
        return (
            <tr className="tr">
                <th className="td" scope="row">
                    {index + 1}
                </th>
                <td className="td">
                    <input
                        className="input-field form-control"
                        onFocus={e => e.target.select()}
                        type="Number"
                        value={data.length}
                        placeholder="0"
                        min="0"
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        onChange={(e) => {
                            formik.setFieldValue(
                                `stocks[${index}].length`,
                                e.target.value,
                            );
                        }}
                    />
                </td>
                <td className="td">
                    <input
                        className="input-field form-control"
                        onFocus={e => e.target.select()}
                        type="Number"
                        value={data.width}
                        placeholder="0"
                        min="0"
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        onChange={(e) => {
                            formik.setFieldValue(
                                `stocks[${index}].width`,
                                e.target.value,
                            );
                        }}
                    />
                </td>
                <td className="td">
                    <input
                        className="input-field form-control"
                        onFocus={e => e.target.select()}
                        type="Number"
                        value={data.count}
                        placeholder="0"
                        min="0"
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        onChange={(e) => {
                            formik.setFieldValue(
                                `stocks[${index}].count`,
                                e.target.value.replace(/[^0-9]/g, ""), //  prevent dot in input field,
                            );
                        }}
                    />
                </td>
                <td className="td"   style={{width: 150}}>
                    {/* <input
                        className="input-field form-control"
                        onFocus={e => e.target.select()}
                      
                        type="text" */}
                        {data.name}
                        {/* onChange={(e) => {
                            formik.setFieldValue(
                                `stocks[${index}].name`, e.target.value)
                        }}
                    /> */}
                </td>
                <td className="remove-td">
                    <CancelIcon className="remove-td" onClick={() => {
                        removeRow(index)
                    }} />
                </td>
            </tr>
        )
    })
    useEffect(() => {
        setStockSheetsValues(formik.values)
    }, [formik.values])

    useEffect(() => {
        axios.get(`${baseURL}/GetQuotationStock?upvc_master_id=4&categoryID=1`)
            .then(response => {
                console.log('Res from Stock::::', response.data)
                const result = response.data.stock.map(({ length, width, count, itemID, name }) => ({ length: (Number(length) * 304.8).toFixed(0), width, count, itemID, name }))
                
                formik.setFieldValue('stocks', result)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {/* Group Button */}
            <div className="button-section">
                <h3 className="pieces">STOCK</h3>
                <ButtonGroup>

                    <Button size="sm" outline color="success" onClick={() => {
                        formik.setFieldValue('stocks', [
                            ...formik.values.stocks,
                            {
                                length: 0,
                                width: 0,
                                count: 1,
                                name: '',
                                grainDirection: null,
                            },
                        ]);
                    }}>Append</Button>
                    <Button size="sm" outline color="danger" onClick={() => {

                        formik.setFieldValue(
                            `stocks`,
                            [],
                        );
                    }}>Delete</Button>
                    <Button size="sm" outline color="primary" onClick={() => {
                        generatePDF(formik.values.stocks)
                    }}>Export PDF</Button>
                </ButtonGroup>
            </div>
            <div class="table-responsive" className="table-height" >
                <table className="picec-table">
                    <thead>
                        <tr className="tr">
                            <th className="td" scope="col">
                                Sr. No
                            </th>
                            <th className="td" scope="col">
                                Length
                            </th>
                            <th className="td" scope="col">
                                Width
                            </th>
                            <th className="td" scope="col">
                                Quantity
                            </th>
                            <th className="td" scope="col">
                                Item
                            </th>
                            <th className="td" scope="col">
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>{piecesTable}</tbody>
                </table>
            </div>
        </div>
    );
};

export default StockSheets;

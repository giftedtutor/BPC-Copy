/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useEffect } from "react";
import "./index.css";
import { useFormik } from 'formik';
import { Button, ButtonGroup } from "reactstrap";
import { IconButton } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';
import generatePDF from "./pdfPiecesInput";
import axios from "axios";
import baseURL from "../../../../base-url/baseURL";

const validate = values => {
    let errors = {};

    values.requirements.forEach((data, index) => {
        if (!data.length) {
            errors = {
                ...errors,
                [`requirements[${index}]length`]: "Required!",
            };
        }
        if (!data.width) {
            errors = {
                ...errors,
                [`requirements[${index}]width`]: "Required!",
            };
        }
        if (!data.count) {
            errors = {
                ...errors,
                [`requirements[${index}]count`]: "Required!",
            };
        }
    });

    return errors;
};

const PiecesInput = ({ piecesValues, setPiecesValues, setPiecesValuesCurrentIndex }) => {

    const handleSave = () => {
        // eslint-disable-next-line no-console
        console.log("FormValues");
    };
    const formik = useFormik({
        initialValues: {
            requirements: [
                {
                    length: 2100,
                    width: 100,
                    label: 'w1 - Sash',
                    count: 8,
                    grainDirection: null
                    
                },
            ],
            kerf: 0
        },
        validate,
        onSubmit: () => {
            setIsLoading(true);
            setTimeout(handleSave, 2000);
        },
    });
    const removeRow = i => {
        formik.setFieldValue("requirements", [
            ...formik.values.requirements.slice(0, i),
            ...formik.values.requirements.slice(i + 1),
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

    const piecesTable = formik.values.requirements && formik.values.requirements.map((data, index) => {
        return (
            <tr className="tr">
                <th className="td" scope="row">
                    {index + 1}
                </th>
                <td className="td" >
                    <input

                        className="input-field form-control"
                        onFocus={e => e.target.select()}
                        type="Number"
                        min="0"
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        value={data.length}
                        placeholder="0"
                        onChange={(e) => {
                            formik.setFieldValue(
                                `requirements[${index}].length`,
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
                                `requirements[${index}].width`,
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
                                `requirements[${index}].count`,
                                e.target.value.replace(/[^0-9]/g, ""), //  prevent dot in input field
                            );

                        }}
                    />
                </td>
                <td className="td" style={{width: 200}}>
                  
                        {data?.label} 
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
        setPiecesValues(formik.values)
    }, [formik.values])

    useEffect(() => {
        axios.get(`${baseURL}/GetQuotationStock?upvc_master_id=4&categoryID=1`)
            .then(response => {
                console.log('Res from Stock::::', response.data)
                // const result = response.data.requirements.map(({ length, width, count, label }) => ({ length: Number(length).toFixed(0), width, count, label }))
                
                formik.setFieldValue('requirements',  response.data.requirements)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div style={{
                margin: 5
            }}>
                <label style={{ fontWeight: 'bold' }}>Kerf / Blade thickness</label>
                <input
                    style={{ width: 200 }}
                    id="kerf"
                    className="form-control"
                    onFocus={e => e.target.select()}
                    type="Number"
                    value={formik.values.kerf}
                    placeholder="0"
                    min="0"
                    onPaste={preventPasteNegative}
                    onKeyPress={preventMinus}
                    onChange={(e) => {
                        formik.setFieldValue(
                            `kerf`,
                            e.target.value,
                        );

                    }}
                />
            </div>
            <hr />
            {/* Group Button */}
            <div className="button-section">
                <h3 className="pieces">PIECES</h3>
                <ButtonGroup>

                    <Button size="sm" outline color="success" onClick={() => {
                        formik.setFieldValue('requirements', [
                            ...formik.values.requirements,
                            {
                                length: 0,
                                width: 0,
                                count: 0,
                                label: '',
                            },
                        ]);
                    }}>Append</Button>
                    <Button size="sm" outline color="danger" onClick={() => {

                        formik.setFieldValue(
                            `requirements`,
                            [],
                        );
                    }}>Delete</Button>
                    <Button size="sm" outline color="primary" onClick={() => {
                        generatePDF(formik.values.requirements)
                    }} a>Export PDF</Button>
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
                                Label
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

export default PiecesInput;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useEffect } from "react";
import "./index.css";
import { useFormik } from 'formik';
import { Button, ButtonGroup } from "reactstrap";

const ResultTable = ({ TOTAL_Q_W_L, stockPiecesValues }) => {

    <h5>Material = {TOTAL_Q_W_L.material}, Quantity = 1, Utilization = {TOTAL_Q_W_L.totalQWL} </h5>
    return (
        <div style={{ justifyContent: 'center' }} >

            <div class="table-responsive">
                <table className="picec-table">
                    <thead>
                        <tr className="tr">
                            <th className="td" scope="col">
                                Material
                            </th>
                            <th className="td" scope="col">
                                Utilization
                            </th>
                            <th className="td" scope="col">
                                Utilization %
                            </th>
                            <th className="td" scope="col">
                                Waste
                            </th>
                            <th className="td" scope="col">
                                Waste %
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tr">
                            <td className="td">
                                {TOTAL_Q_W_L.material}
                            </td>
                            <td className="td">
                                {TOTAL_Q_W_L.totalQWL}
                            </td>
                            <td className="td">
                                {`(${(((TOTAL_Q_W_L.totalQWL) / (stockPiecesValues.drawingData?.[0].outer.widthDisplay * stockPiecesValues.drawingData?.[0].outer.heightDisplay)) * 100).toFixed(2)} %)`}
                            </td>
                            <td className="td">
                                {(stockPiecesValues.drawingData?.[0].outer.widthDisplay * stockPiecesValues.drawingData?.[0].outer.heightDisplay) - TOTAL_Q_W_L.totalQWL}
                            </td>
                            <td className="td">
                                {`(${(100 - (((TOTAL_Q_W_L.totalQWL) / (stockPiecesValues.drawingData?.[0].outer.widthDisplay * stockPiecesValues.drawingData?.[0].outer.heightDisplay)) * 100)).toFixed(2)} %)`}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultTable;

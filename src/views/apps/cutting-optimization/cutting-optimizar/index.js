/* eslint-disable semi */
import React, { useState } from "react";
import { Container, Row, Col, Column, ButtonGroup, Button } from "reactstrap";
import "./index.css";
import PiecesInput from "./PiecesInput";
import StockSheets from "./StockSheets";
import DesignAndCalcualtion from "./DesignAndCalcualtion.js";
import Testing from "./Testing";
import ReactToPrint from "react-to-print";


const CuttingOptimizar = () => {

  const [piecesValues, setPiecesValues] = useState([
    {
      length: 0,
      width: 0,
      quantity: 0,
      material: '',
      color: 'red',
      label: '',
      name: ''
    }
  ])
  const [stockPiecesValues, setStockSheetsValues] = useState([])
  const [piecesValuesCurrentIndex, setPiecesValuesCurrentIndex] = useState(0)

  console.log('STOCK :::', stockPiecesValues)
  console.log('PANELs :::', piecesValues)
  return (
    <div>
     
      <Row>
        <Col sm={12} md={4}>
          <Row>
            <Col sm={12} md={12} className="row-height">
              <PiecesInput piecesValues={piecesValues} setPiecesValues={setPiecesValues} setPiecesValuesCurrentIndex={setPiecesValuesCurrentIndex} />
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={12} className="row-height">
              <StockSheets setStockSheetsValues={setStockSheetsValues} />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={8} className="cutted-section">
          {/* <CuttedSheet piecesValues={piecesValues} stockPiecesValues={stockPiecesValues} setPiecesValues={setPiecesValues} piecesValuesCurrentIndex={piecesValuesCurrentIndex} /> */}
          <DesignAndCalcualtion piecesValues={piecesValues} stockPiecesValues={stockPiecesValues} setPiecesValues={setPiecesValues} piecesValuesCurrentIndex={piecesValuesCurrentIndex} />
        </Col>
      </Row>
    </div>
  );
};

export default CuttingOptimizar;

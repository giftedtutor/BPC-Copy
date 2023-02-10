// // import React from 'react'
import * as React from "react"
import { useRef, useState, useEffect } from "react"
import "@progress/kendo-theme-material/dist/all.css"
import axios from 'axios'
import Deceuninck from '../../../../assets/images/logo/Deceuninck.png'
import wintech from '../../../../assets/images/logo/wintech.png'
import proline from '../../../../assets/images/logo/proline.png'
import buraq from '../../../../assets/images/logo/buraq.png'
import skypin from '../../../../assets/images/logo/skypin.png'
import conch from '../../../../assets/images/logo/conch.png'
import euro from '../../../../assets/images/logo/euro.png'

import superwin_img from '../../../../assets/images/logo/superwin.jfif'
import pamo from '../../../../assets/images/logo/pamo.jfif'
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartCategoryAxis,
  ChartCategoryAxisItem
} from "@progress/kendo-react-charts"
// import "hammerjs"

import { DropDownList } from "@progress/kendo-react-dropdowns"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"

import "./style.css"
import { useLocation } from "react-router-dom"
import baseURL from "../../../../base-url/baseURL"
import moment from "moment"
import { Button } from "reactstrap"
// import KendokaLogo from "./kendoka-logo.svg"


const PDFExportPageTemplate = (props) => <h5 style={{
  marginLeft: 10,
  marginTop: -20,
  fontSize: 9
}}>Page {props.pageNum} of {props.totalPages}</h5>

const App = () => {
  const location = useLocation()
  const childData = location.state.params.childData
  const MasterData = location.state.params.MasterData
  const childDataPDFQ1 = location.state.params.childDataPDF1
  // program to convert first letter of a string to uppercase
  const capitalizeFirstLetter = (str) => {
    if (str === undefined) {
      str = 'Null'
    }
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

    return capitalized
  }

  const [Address, setAddress] = useState('')
  const ddData = [
    { text: "A4", value: "size-a4" },
    { text: "Letter", value: "size-letter" },
    { text: "Executive", value: "size-executive" }
  ]

  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4"
  })

  const updatePageLayout = event => {
    setLayoutSelection(event.target.value)
  }

  const pdfExportComponent = useRef(null)

  const handleExportWithComponent = event => {
    pdfExportComponent.current.save()
  }

  let totalQty = 0
  const totalQtyM = childData.map((data, index) => {
    totalQty = totalQty + Number(data.qty)
  })

  let TotalSft = 0
  const TotalSftM = childData.map((data, index) => {
    TotalSft = TotalSft + Number(data.TotalSft)
  })
  const PDFmainData = childData.map((data, index) => {
    return (
      <>
        <table className="table table-striped" style={{
          marginTop: -20
        }} >
          <thead>
            <tr className="d-flex" style={{
              fontSize: 9,
              height: 26
            }}>
              <th style={{ width: '60%', fontSize: 7 }} colSpan="2" scope="col">Window Type:    {data.windowType === "DDOOR" ? "Double Door" : (data.windowType === "drawWindow" ? "Draw Window" : data.windowType)} &nbsp;  &nbsp;  &nbsp; {data.Beading === "SG" ? "Single Glaze" : "Double Glaze"} &nbsp;  &nbsp;  &nbsp;  {data.profileType === "1" ? "BURAQ" : (data.profileType === "2" ? "EURO" : (data.profileType === "3" ? "POMO" : (data.profileType === "4" ? "PROLINE" : (data.profileType === "5" ? "CONCH" : (data.profileType === "6" ? "WINTECH" : (data.profileType === "7" ? "DECEUNINCK" : (data.profileType === "8" ? "SKYPEN" : (data.profileType === "9" ? "WINTECH COLOR" : ""))))))))}</th>
              <th style={{ width: '10%', fontSize: 7 }} scope="col">Size:</th>
              <th style={{ width: '30%', fontSize: 7 }} scope="col">{(data.Width).toFixed(0)} mm x {(data.Height).toFixed(0)} mm</th>
            </tr>
          </thead>

          <tbody>

          </tbody>
        </table>

        {/*  2nd Table */}

        <div className="form-row">
          <div className="form-group col-md-5">
            <img style={{
              marginLeft: '3%',
              marginTop: 2
            }} src={data.DesignImageUrl} alt="Window Design Image" width='74%' />
          </div>
          <div className="form-group col-md-7">
            <table className="table table-striped" >
              <thead>
                <tr className="d-flex" style={{
                  fontSize: 9,
                  height: 22

                }}>
                  <th style={{ width: '100%', fontSize: 7, textAlign: 'center' }} colSpan="3" >Computed Values</th>


                </tr>
              </thead>

              <tbody>
                <tr key={index + 20} className="d-flex" style={{
                  fontSize: 9,
                  height: 26

                }}>

                  <td style={{ width: '55%', height: 26, textAlign: 'left' }} >Unit Price ({data.TotalSft.toFixed(2)} sq ft) </td>
                  <td style={{ width: '45%', textAlign: 'right' }} scope="col">Rs {(MasterData[0]?.ratePerSqFt * data.TotalSft).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  {/* <td style={{ width: '46%', textAlign: 'right'}} scope="col"></td> */}
                </tr>

                <tr key={index + 21} className="d-flex" style={{
                  fontSize: 9,
                  height: 26
                }}>

                  <td style={{ width: '30%' }} scope="col">Quantity</td>
                  <td style={{ width: '70%', paddingLeft: 50, textAlign: 'right' }} scope="col">{data.qty}</td>

                </tr>

                <tr key={index + 22} className="d-flex" style={{
                  fontSize: 9,
                  height: 26
                }}>

                  <td style={{ width: '30%' }} scope="col">Value</td>
                  <td style={{ width: '70%', textAlign: 'right' }} colSpan={2}>Rs {((MasterData[0]?.ratePerSqFt * data.TotalSft) * data.qty).toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>

    )
  })

  let totlaNn = 0
  const totalCal = childDataPDFQ1.map((data, index) => {
    totlaNn = totlaNn + data.Quotation1_amount

  })
  const Q1Data = childDataPDFQ1.map((data, index) => {
    return (
      <tr key={index} class="d-flex" style={{
        fontSize: 9,
        height: data.Quotation1_amount === 0 ? 0 : 26,
        display: data.Quotation1_amount === 0 ? 'none' : ''
      }}>

        <td style={{ width: '13%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'right' }} scope="col">{index + 1}</td>
        <td style={{ width: '40%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'left' }} scope="col">{data.Quotation1_discription}</td>
        <td style={{ width: '3%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'center' }} scope="col">{data.Quotation1_unit}</td>
        <td style={{ width: '5%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'right' }} scope="col">{data.Quotation1_Quantity}</td>
        <td style={{ width: '20%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'right' }} scope="col">{data.Quotation1_rate_unit.toFixed(2).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{ width: '20%', display: data.Quotation1_amount === 0 ? 'none' : '', textAlign: 'right' }} scope="col">{data.Quotation1_amount.toFixed(2).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
      </tr>
    )
  })
  return (
    <div id="example">
      <div className="form-row">
        <div className="form-group col-md-10"></div>
        <div className="form-group col-md-2">
          <Button color='danger' onClick={handleExportWithComponent}>
            PDF
          </Button>
        </div>
      </div>
      <div className="page-container hidden-on-narrow">
        <PDFExport paperSize="A4"
          forcePageBreak=".page-break"
          pageTemplate={PDFExportPageTemplate}

          ref={pdfExportComponent}
        >
          <div className={`pdf-page ${layoutSelection.value}`} style={{
            overflow: 'scroll'
          }}>
            <div className="inner-page">
              {/* Starts PDF here */}
              <div className="form-row">
                <div className="form-group col-md-8">
                  <h6 className="h11">BPC Window & Door Systems</h6>

                  <p style={{
                    fontSize: 10,
                    marginTop: -5
                  }}>Address: G. T. Road Qamber, Swat KP-Pakistan,</p>

                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}>Phone: +92-946-883657 </p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}>Mobile: +92-332-7723737</p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}>Email: bpccompany2011@gmail.com </p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}> info@bpccompany.net </p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}>www.facebook.com/bpccompany </p>

                </div>
                <div className="form-group col-md-4" style={{
                  marginTop: MasterData[0]?.profileID === 1 ? 5 : 20
                }}>
                  <img src={MasterData[0]?.profileID === 1 ? buraq : (MasterData[0]?.profileID === 2 ? euro : (MasterData[0]?.profileID === 3 ? pamo : (MasterData[0]?.profileID === 4 ? proline : (MasterData[0]?.profileID === 5 ? conch : (MasterData[0]?.profileID === 6 ? wintech : (MasterData[0]?.profileID === 7 ? Deceuninck : (MasterData[0]?.profileID === 8 ? skypin : (MasterData[0]?.profileID === 9 ? superwin_img : ''))))))))} height={MasterData[0]?.profileID === 1 ? 84 : 42} widht={MasterData[0]?.profileID === 1 ? 60 : 70} />
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-row">
                <div className="form-group col-md-7" style={{
                  marginTop: -20
                }}>
                  <h5 className="h11"> Quotation To: </h5>

                  <p style={{
                    fontSize: 10,
                    marginTop: -5
                  }}><span style={{
                    fontWeight: 'bold'
                  }}>Name:    </span><span style={{
                    paddingLeft: 30
                  }}>{capitalizeFirstLetter(MasterData[0]?.name)}</span> </p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}><span style={{
                    fontWeight: 'bold'
                  }}>Address:  </span> <span style={{
                    paddingLeft: 20
                  }}>{capitalizeFirstLetter(MasterData[0]?.address)}</span></p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -23
                  }}><span style={{
                    fontWeight: 'bold'
                  }}>Contact No. </span><span style={{
                    paddingLeft: 5
                  }}>{MasterData[0]?.contact_no}</span></p>

                </div>
                <div className="form-group col-md-5" style={{
                  marginTop: -20
                }}>
                  <p style={{
                    fontSize: 10,
                    marginTop: 20
                  }}><span style={{
                    fontWeight: 'bold'
                  }}>Quotation No:</span> &nbsp; QO-00{MasterData[0]?.id}</p>
                  <p style={{
                    fontSize: 10,
                    marginTop: -18
                  }}><span style={{
                    fontWeight: 'bold'
                  }}>Date: &nbsp; </span><span style={{
                    paddingLeft: 44
                  }}>{moment(MasterData[0]?.Quotation_date).format('DD/MM/YYYY')}</span></p>
                </div>
              </div>
              {/* Table */}

              {/* Profile detail */}
              <div>
                {/* <div className="form-row">
          <div className="form-group col-md-12">
            <h5 style={{
              fontWeight: 'bold'
              
            }}> Premium Quality Profile:</h5>
              <p style={{
          fontSize:10,
          marginTop: -5
        }}><span style={{
        }}> &nbsp;  &nbsp;  &nbsp;a. Deceuninck - 70mm Casement Frame for Open-able.</span></p>
                     <p style={{
          fontSize:10,
          marginTop: -22
        }}><span style={{
        }}> &nbsp;  &nbsp;  &nbsp;b.  Deceuninck - 108 mm 3 Track Frame for Sliding.</span></p>
                      <p style={{
          fontSize:10,
          marginTop: -22
        }}><span style={{
        }}> &nbsp;  &nbsp;  &nbsp;c. High level of thermal and sound insulation as per European standards.</span></p>
                      <p style={{
          fontSize:10,
          marginTop: -22
        }}><span style={{
        }}> &nbsp;  &nbsp;  &nbsp;d. Special U.V resistant profile with Titanium Dioxide for Asian region. (Lead free material).       </span></p>
                      <p style={{
          fontSize:10,
          marginTop: -22
        }}><span style={{
        }}> &nbsp;  &nbsp;  &nbsp;e. Hardware; ASSA ABLOY - Swedish Brand (for Windows), DECEUNINCK Belgian Brand (for Doors).</span></p>
         </div>
         </div> */}

              </div>

              {PDFmainData}
              {/* Q1 Data Table */}
              <table className="table table-striped" style={{
                marginTop: 0
              }}>
                <thead>
                  <tr class="d-flex" style={{
                    fontSize: 9,
                    height: 22

                  }}>
                    <th style={{ width: '20%', fontSize: 7 }} scope="col">Sr. No</th>
                    <th style={{ width: '33%', fontSize: 7 }} scope="col">Description</th>
                    <th style={{ width: '3%', fontSize: 7 }} scope="col">Unit</th>
                    <th style={{ width: '5%', fontSize: 7 }} scope="col">Qty</th>
                    <th style={{ width: '20%', fontSize: 7 }} scope="col">Rate</th>
                    <th style={{ width: '20%', fontSize: 7 }} scope="col">Total</th>
                  </tr>
                </thead>
                <body>
                  {Q1Data}
                </body>
              </table>
              {/* Total Cal Table */}

              <table className="table table-striped" style={{
                marginTop: -10
              }} >


                <tbody>
                  <tr className="d-flex" style={{
                    fontSize: 9,
                    fontWeight: 'bold',
                    height: 30
                  }}>

                    <td style={{ width: '53%' }}></td>
                    <td style={{ width: '21%' }} scope="col">Grand Total</td>
                    <td style={{ width: '25%', textAlign: 'right' }} scope="col">Rs {MasterData[0]?.Quotation1_total_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>

                  </tr>
                </tbody>
              </table>

              {/* end of tcal Table */}
              {/* Terms */}
              <div>
                <h6 style={{
                  fontSize: 10,
                  fontWeight: 'bold'
                }}>
                  Terms & Conditions
                </h6>
                <p style={{
                  fontSize: 9,
                  padding: 0
                }}>
                  {MasterData[0]?.TermOfPay}
                </p>
                <p style={{
                  fontSize: 9,
                  marginTop: -5
                }}>
                  {MasterData[0]?.TermAndCon}
                </p>

              </div>
              <div className="pdf-body">
                <div id="grid" />

              </div>
            </div>
          </div>
        </PDFExport>
      </div>
    </div>
  )
}

export default App

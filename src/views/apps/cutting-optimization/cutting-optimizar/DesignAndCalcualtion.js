import React, { useState, useEffect, useRef } from 'react'
import Solution from './fakeAPIs/solutions.json'
import line_background2 from '../../../../assets/images/cutting-optimizar/line_background2.jpg'
import axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { Button, Col, Row, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap"
import "./CuttedSheet.css"
import "./index.css"
import generatePDF from './pdfDesignAndCalcualtion'
import { DropDownList } from "@progress/kendo-react-dropdowns"
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'

const DesignAndCalcualtion = ({ piecesValues, stockPiecesValues, setPiecesValues, piecesValuesCurrentIndex }) => {
  console.log('JSON::::::', Solution)
  const [remainingSheet, setRemainingSheet] = useState([])
  const [solutionData, setSolutionData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalArea, setTotalArea] = useState(0)
  const [totalWastArea, setTotalWastArea] = useState(0)
  const [totalRequiredSheet, setTotalRequiredSheet] = useState(0)
  const [kerf, setKerf] = useState(0)
  const [fontSizeIncDec, setFontSizeIncDec] = useState(13)
  const TOKEN = 'e2b0e680cdc03e8aada15df5d996fc9433c509b2'

  // PDF Required Stats

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const handleSubmit = () => {
    setIsLoading(true)
    const postData = {
      stocks: stockPiecesValues.stocks,
      requirements: piecesValues.requirements,
      settings: {
        kerf: piecesValues.kerf
      },
      token: TOKEN
    }

    // const postDataToAPI = {
    //   stocks: [
    //     {
    //       length: 300,
    //       count: 10
    //     }
    //   ],
    //   requirements: [
    //     {
    //       length: 100,
    //       count: 4
    //     },
    //     {
    //       length: 40,
    //       count: 3
    //     }
    //   ],
    //   settings: {
    //     kerf: 1
    //   }
    // }
    axios.post(`${baseURL}/cuttingAlgo`,
    postData
    // axios.get(`${baseURL}/getSolution`,
    //   postDataToAPI
    ).then(res => {
      console.log('SOL:::::', res.data)

      if (res.data.response.errors) {
        toast(`${res.data.response.errors[0].detail}`)
      } else {
        setSolutionData(res.data.response)
        setKerf(res.data.settings.kerf)

        const arr = []
        let totalArea = 0
        let totalWasteArea = 0
        let totalRequiredSheet = 0
        res.data.response.solution?.layouts.forEach((data, index) => {
          let length = 0
          let width = 0
          data.remainders?.forEach((rem, idx) => {
            length += Number(rem.length)
            width += Number(rem.width)
            totalWasteArea += (data.count * (rem.length * rem.width))
          })
          arr[index] = `${length} x ${width}`
        })
        setTotalWastArea(totalWasteArea)
        setRemainingSheet(arr)

        res.data.response.solution?.requiredStocks.forEach((data, index) => {
          totalArea += (data.count * (data.length * data.width))
          totalRequiredSheet += data.count
        })
        setTotalArea(totalArea)
        setTotalRequiredSheet(totalRequiredSheet)
        setIsLoading(false)
      }

    })
      .catch(err => {
        console.log(err)
      })
  }

  const ActionButtonForDownloadImages = () => {
    return (
      <UncontrolledButtonDropdown direction='right'>
        <DropdownToggle outline color='primary' caret>
          Export
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => generatePDF(2, solutionData, remainingSheet)}>
            View
          </DropdownItem>
          <DropdownItem onClick={handleExportWithComponent}>
            PDF
          </DropdownItem>

        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )

  }
  return (
    <div>
      <div className="button-section">
        {/* <h3 className="pieces">RESULT</h3> */}
        <ButtonGroup>

          <Button size="sm" outline color="success" onClick={() => {
            handleSubmit()
          }}>Run</Button>
          {isLoading ? '' : (
            <>
              <Button size="sm" outline color="warning" onClick={() => {
              }}>Accept</Button>
              <Button size="sm" outline color="primary" onClick={handlePrint}>Print / Export</Button>
              {/* <ActionButtonForDownloadImages /> */}
            </>
          )}
        </ButtonGroup>
        <ButtonGroup className='ml-1'>
          {isLoading ? '' : (
            <>
              <Button size="sm" outline color="danger" onClick={() => {
                setFontSizeIncDec(fontSizeIncDec - 1)
              }}>Font -</Button>
              <Button size="sm" outline color="success" onClick={() => {
                setFontSizeIncDec(fontSizeIncDec + 1)
              }}>Font +</Button>

            </>
          )}
        </ButtonGroup>
      </div>
      {
        isLoading ? (<h3 className="pieces">Result will be displayed here!</h3>) : (
          <div style={{
            marginLeft: 10
          }} ref={componentRef}>

            <hr />
            <div>
              <Row>
                <Col sm={12} md={6}>
                  <h2>Required Stock</h2>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Stock Length</th>
                          <th scope="col" className='text-right'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          solutionData.solution?.requiredStocks?.map((data, index) => {
                            return (
                              <tr>
                                <th scope="row">{data.length} x {data.width}</th>
                                <td className='text-right'>{data.count}</td>
                              </tr>
                            )
                          })
                        }
                        <tr>
                          <th scope="col">Total</th>
                          <th scope="col" className='text-right bold'>{totalRequiredSheet}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <h2>Summary</h2>
                  <div class="table-responsive">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td scope="col">Kerf / Blade thickness</td>
                          <td scope="col" className='text-right'>{kerf}</td>
                        </tr>

                        <tr>
                          <td scope="col">Total Required Stock Area</td>
                          <td scope="col" className='text-right'>{totalArea}</td>
                        </tr>
                        <tr>
                          <td scope="col">Total Used Stocks Area</td>
                          <td scope="col" className='text-right'>{totalArea - totalWastArea}</td>
                        </tr>
                        <tr>
                          <td scope="col">Total Waste / Remnant Area</td>
                          <td scope="col" className='text-right'>{totalWastArea}</td>
                        </tr>
                        <tr>
                          <th scope="col">Utilization</th>
                          <th scope="col" className='text-right'>{`${(100 - ((totalWastArea / totalArea) * 100)).toFixed(2)} %`}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <h2 className='pieces pl-2'>Cutting Section</h2>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" colSpan={2}>Cutting Sheets details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        solutionData.solution?.layouts?.map((data, index) => {
                          return (
                            <>
                              <tr>
                                <th scope="row">Repetition {`(${data.count}X)`}</th>
                                <td>Stock length ({data.stock.length} x {data.stock.width})</td>
                                {/* <td>Label Here i.e. HK</td> */}
                                <td>Waste - Material remnant ({remainingSheet[index]})</td>
                              </tr>
                              <tr>
                                <th scope="row" colSpan={4}>
                                  <div style={{
                                    display: 'flex',
                                    height: 100
                                  }}>
                                    <div>
                                      {
                                        data.panels.map((panelData, index) => {
                                          return (
                                            <div style={{
                                              height: Number(panelData.width) >= 50 ? (Number(panelData.width) / 2) : Number(panelData.width),
                                              width: Number(panelData.length) >= 100 ? (Number(panelData.length) / 7) : Number(panelData.length),
                                              marginLeft: Number(panelData.x) >= 100 ? (Number(panelData.x) / 7) : Number(panelData.x),
                                              marginTop: Number(panelData.y) >= 100 ? (Number(panelData.y) / 7) : Number(panelData.y),
                                              position: 'absolute',
                                              // boxSizing: 'border-box',
                                              border: '1px solid black',
                                              textAlign: 'center',
                                              overflow: 'hidden',
                                              backgroundColor: 'skyblue'
                                              //  backgroundColor: `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
                                            }}>
                                              <h1 style={{
                                                fontSize: fontSizeIncDec
                                              }}>{`${panelData.length} x ${panelData.width}`}</h1>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                    <div>
                                      {
                                        data.remainders?.map((remPanelData, index) => {
                                          return (
                                            <div style={{
                                              height: Number(remPanelData.width) >= 50 ? (Number(remPanelData.width) / 2) : Number(remPanelData.width),
                                              width: Number(remPanelData.length) >= 100 ? (Number(remPanelData.length) / 7) : Number(remPanelData.length),
                                              marginLeft: Number(remPanelData.x) >= 100 ? (Number(remPanelData.x) / 7) : Number(remPanelData.x),
                                              marginTop: Number(remPanelData.y) >= 100 ? (Number(remPanelData.y) / 7) : Number(remPanelData.y),
                                              position: 'absolute',
                                              // boxSizing: 'border-box',
                                              border: '1px solid black',
                                              textAlign: 'center',
                                              overflow: 'hidden',
                                              backgroundImage: `url(${line_background2})`,
                                              backgroundRepeat: "no-repeat",
                                              backgroundSize: "cover",
                                              backgroundPosition: "center"
                                            }}>
                                              <h1 style={{
                                                fontSize: fontSizeIncDec
                                              }}>{`${remPanelData.length} x ${remPanelData.width}`}</h1>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                </th>

                              </tr>
                            </>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </Row>
            </div>
            {/* </div>
            </PDFExport> */}

          </div>
        )
      }
    </div >
  )
}

export default DesignAndCalcualtion

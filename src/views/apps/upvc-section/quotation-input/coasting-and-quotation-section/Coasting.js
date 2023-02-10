import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  CardHeader,
  CardTitle,
  Button
} from "reactstrap"
import Cookies from "js-cookie"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import generatePDF from './tablePdfOfCoasting'
import baseURL from "../../../../../base-url/baseURL"

import TopProgressBar from './TopProgressBar'
import upvcContext from '../../context/upvcContext'
import { useHistory } from "react-router-dom"
import moment from "moment"
import slidingConditions from "./slidingConditions"
import slidingMultilocksConditions from "./slidingMultilocksConditions"
import openableMultilocksConditions from "./openableMultilocksConditions"
import topHungsOpenableMultilocks from "./topHungsOpenableMultilocks"
import topHungsSlidingMultilocks from "./topHungsSlidingMultilocks"

const Coasting = () => {
  const history = useHistory()
  const ucs = useContext(upvcContext)
  const InputValues = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')
  const [FhingIndicator, setFhingIndicator] = useState()
  const [data, setData] = useState([])
  const [addWaistage, setAddWaistage] = useState(0)
  const [AddFactoryOverHead, setFactoryOverHead] = useState(0)
  const [totalCoast, setTotalCoast] = useState('')
  const [addProfit, setAddProfit] = useState(0)
  const [addCoastOfProject, setAddCoastOfProject] = useState(0)
  const [Mullion, setMullion] = useState('YES')
  const totalOfCoastingArray = []
  const itemsQuauntityArray = []
  const topHungItemsQuauntityArray = []
  const [TermAndCon, setTermAndCon] = useState(
    "Windows less then 10 sqft will be considered as standered size (10sqft) Time of Delivery: 4 Weeks (Excluding Holidays) after advance payment and final sizes of windows design."
  )
  const [TermOfPay, setTermOfPay] = useState(
    "Advance on Confirmation of Order: 70%, On Glass Delivery: 20%, On Completion: 10%"
  )
  const [TermOfHardAndAccess, setTermOfHardAndAccess] = useState(
    " Handles, Locks, Gear Locks, Brush, Gaskets, Screws (Galvanized Rust Free), Re-inforcement 1mm (Galvanized Rust Free Local Steel), Screw Hole Covers, Drainage Slot Covers, Aluminium Railing, Aluminium/Fibre Netting, Rollers for Windows and Netting. Imported Spacers, Imported Corners, Imported Double Tape, Imported Chemical and Imported Dow Corning Weatherseal Silicone is used for Double Glazing. We offer 5 five years warranty on Double Glazing.  We use branded Profile 88mm/66mm with warranty of 20 years. Defaults in the payment shall terminate the warranty."
  )
  const [CName, setCName] = useState('')

  const [arrayForMUllianSteel, setArrayForMUllianSteel] = useState([])
  let itemType = ''
  let pdfArray = []
  const pdfDataRow = []
  const MasterDetails = []
  let ClientDetailsFromUPVC = JSON.parse(localStorage.getItem('InputAllDataBPC'))

  const profileType = ClientDetailsFromUPVC === null ? '' : ClientDetailsFromUPVC[0]?.profileType
  let inputArray = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  if (inputArray === null || inputArray === undefined) {
    inputArray = []
    ClientDetailsFromUPVC = []

  }
  const [costingItemArray, setCostingItemArray] = useState([{}])
  const editClient = () => {
    if (InputValues === null) {

      alert('Please Input something first, You are navigating to Input Section')
      history.push('/BPC/apps/upvcCalculaions/qutation')
      ucs.setStateCurrent(1)
    } else {
      axios.get(`${baseURL}/editClient?id=${ClientDetailsFromUPVC[0].clientId}}`)
        .then(response => {

          setCName(response.data.client.name)

        })
        .catch(err => console.log(err))
    }

  }


  let TOTAL_SASH = 0
  let TOTAL_FRAME_TOP_HUNGS = 0
  let TOTAL_SASH_TOPHungs = 0
  let FLY_MESH = 0
  let FLY_MESH_TOPHUNGS = 0
  let TOTAL_FRAME = 0
  let TOTAL_MULLION = 0
  const TOTAL_MULLION_TOPHUNGS = 0 // always 0 for TOPHUNGS
  let TOTAL_INTERLOCK = 0
  let TOTAL_INTERLOCK_TOPHUNGS = 0

  data.forEach((i, index) => {

    let estQty = 0
    let estQtySashTopHung = 0
    let estQtyFramehTopHung = 0

    // Frame for sliding, Openable and Fix
    InputValues.forEach((data, index) => {

      if (i.id === InputValues[index].pType.Frame) {
        const pQ = ((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].height / 304.8) * 2)) / (i.length) * InputValues[index].qty)
        if (InputValues[index]?.totalNumberOfPanels > 0) {
          estQty += pQ
        }

        //  TopHung
        const pQTH = ((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].heightTopHung / 304.8) * 2)) / (i.length) * InputValues[index].qty)

        if (InputValues[index].totalTopHungs > 0) {
          estQtyFramehTopHung = estQtyFramehTopHung + pQTH
        }
      }
    })

    TOTAL_FRAME = TOTAL_FRAME + estQty

    TOTAL_FRAME_TOP_HUNGS = TOTAL_FRAME_TOP_HUNGS + estQtyFramehTopHung

    // All MULLIONs calculated for Mullian Steel, use for Mullion below.
    InputValues.forEach((data, index) => {
      if (i.id === InputValues[index].pType.Mullian) {
        const pQ = (((((InputValues[index].mullion.mullianWidth / 304.8) * InputValues[index].mullion.numberOfMullians))) / (i.length) * InputValues[index].qty)
        const mullionForDoorPanel = (((InputValues[index].width / 304.8) / (i.length)) * InputValues[index].qty)

        estQty += pQ
        if (InputValues[index].mullion.type === 'No') {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty = ((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)) / (i.length) * InputValues[index].qty
            arrayForMUllianSteel[index] = estQty + ((InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR") ? mullionForDoorPanel : 0)
          }
        } else {
          const q = estQty
          estQty = q
        }
        //  TOTAL_MULLION =   TOTAL_MULLION + estQty
      }

    })

    InputValues.forEach((data, index) => {

      const specificSash = (InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashOutward : ((InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashOutward : InputValues[index].pType.Sash)))
      if (i.id === specificSash) {
        let pQ = 0

        // Start Calculation for sash
        let CountNumberOfPanelsForSashWidth = 0
        if (InputValues[index].cFirstPanel?.Type === "Openable") {
          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
        }
        if (InputValues[index].cSecondPanel?.Type === "Openable") {
          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
        }
        if (InputValues[index].cThirdPanel?.Type === "Openable") {
          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
        }
        if (InputValues[index].cFourthPanel?.Type === "Openable") {
          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
        }
        let SashForOPenable = 0

        if (InputValues[index].numberOfOpenablePanels > 0) {
          SashForOPenable = SashForOPenable + CountNumberOfPanelsForSashWidth
        } else {
          SashForOPenable = SashForOPenable + InputValues[index].width
        }
        pQ = (((((SashForOPenable / 304.8) * 2)) + ((InputValues[index].height / 304.8) * ((InputValues[index].numberOfOpenablePanels > 0 ? InputValues[index].numberOfOpenablePanels : InputValues[index].totalNumberOfPanels) * 2))) / (i.length) * InputValues[index].qty)
        // End of Sash Calculation  

        if (InputValues[index].totalNumberOfPanels > 0) {

          TOTAL_SASH = TOTAL_SASH + pQ
          totalOfCoastingArray[4] = TOTAL_SASH * i.upvcrate
        } else {
          TOTAL_SASH = TOTAL_SASH + 0
        }
      }
    })

    // TOP HUNG SASH
    InputValues.forEach((data, index) => {
      const specificSashTOP = (InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].topPType.SashOpenable.DoorSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].topPType.SashOpenable.DoorSashOutward : ((InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].topPType.SashOpenable.OpWindowSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].topPType.SashOpenable.OpWindowSashOutward : InputValues[index].topPType.Sash)))
      if (i.id === specificSashTOP) {
        const pQTH = 0
        if (InputValues[index].totalTopHungs > 0) {
          // Start Calculation for sash
          let CountNumberOfPanelsForSashWidth = 0
          if (InputValues[index].customFirstTop?.Type === "Openable") {
            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFirstTop?.customPanelWidth)
          }
          if (InputValues[index].customSecondTop?.Type === "Openable") {
            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customSecondTop?.customPanelWidth)
          }
          if (InputValues[index].customThirdTop?.Type === "Openable") {
            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customThirdTop?.customPanelWidth)
          }
          if (InputValues[index].customFourthTop?.Type === "Openable") {
            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFourthTop?.customPanelWidth)
          }

          let SashForOPenableTopHung = 0
          if (InputValues[index].openableTopHungs > 0) {
            SashForOPenableTopHung = SashForOPenableTopHung + CountNumberOfPanelsForSashWidth

          } else {
            SashForOPenableTopHung = SashForOPenableTopHung + InputValues[index].width
          }

          const Openable = InputValues[index].openableTopHungs > 0 ? (InputValues[index].openableTopHungs * 2) : (InputValues[index].totalTopHungs * 2)
          // OP + SL OR OP + SL +Fixed
          const pQTH = (((((SashForOPenableTopHung / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * ((Openable)))) / (i.length) * InputValues[index].qty)
          estQtySashTopHung = estQtySashTopHung + pQTH
        } else {
          estQtySashTopHung = estQtySashTopHung + 0
        }
        TOTAL_SASH_TOPHungs = estQtySashTopHung + pQTH
      }
    })

  })

  let totalSft = 0
  inputArray.map((a) => { totalSft = totalSft + parseFloat(a.totalSft, 10) })
  const [FullTotalOfCoasting, setFullTotalOfCoasting] = useState(0)
  if (profileType === '1' || profileType === 1) {
    itemType = 'BURAQ'
  } else if (profileType === '2' || profileType === 2) {
    itemType = 'EURO'
  } else if (profileType === '3' || profileType === 3) {
    itemType = 'PAMO'
  } else if (profileType === '4' || profileType === 4) {
    itemType = 'PROLINE'
  } else if (profileType === '5' || profileType === 5) {
    itemType = 'CONCH'
  } else if (profileType === '6' || profileType === 6) {
    itemType = 'WINTECH'
  } else if (profileType === '7' || profileType === 7) {
    itemType = 'DECEUNINK'
  } else if (profileType === '8' || profileType === 8) {
    itemType = 'SKYPEN'
  } else if (profileType === '9' || profileType === 9) {
    itemType = 'SUPERWIN'
  }

  let value = 0
  const totalCoastMaterial = 0
  const totalProfit = 0
  const divisionOfTotalCoastAddedCoast = 0
  const [isLoading, setLoading] = useState(true)

  const Quotation2Details = (QoID) => {
    axios.get(`${baseURL}/getQuotation2?masterID=${QoID}`)
      .then(response => {

        const Qchild = response.data.childData // Inputt view table
        const Qparent = response.data.masterData
        const parentQ = response.data.masterData.map(({

          Costing_add_profit_percentage,
          Costing_AW_perentage,
          Costing_AFO_perecntage
        }) => ({
          addWaistage: Costing_AW_perentage,
          addProfit: Costing_add_profit_percentage,
          AddFactoryOverHead: Costing_AFO_perecntage
        }))
        setFactoryOverHead(response.data.masterData[0].Costing_AFO_perecntage)
        setAddWaistage(response.data.masterData[0].Costing_AW_perentage)
        setAddProfit(response.data.masterData[0].Costing_add_profit_percentage)
      })
      .catch(err => console.log(err))
  }

  const QEditID = localStorage.getItem('EditQuotationID')

  const checkValues = () => {
    ucs.setStateVsection(false)
    ucs.setStateInput(false)
    // ucs.setStateQuotI(true)
  }

  useEffect(() => {
    ucs.setStateCurrent(2)
    editClient()
    axios.get(`${baseURL}/listingcostingitem/${InputValues === null ? '' : InputValues[0]?.profileType}`)
      .then(response => {
        console.log('Coasting Items::::::', response.data.items)
        setData(response.data.items)
        setLoading(false)
      })
      .catch(err => console.log(err))

    if (QEditID !== '' || QEditID !== null || QEditID !== undefined) {
      Quotation2Details(QEditID)
    }
    checkValues()
    localStorage.setItem("TotalOfCasting", JSON.stringify(FullTotalOfCoasting))
  }, [QEditID, divisionOfTotalCoastAddedCoast, FullTotalOfCoasting])

  useEffect(() => {
    console.log('totalOfCoastingArray:::::::::::::::::::::', totalOfCoastingArray)
    let Total = 0
    totalOfCoastingArray.forEach((data, index) => {
      Total += data
    })
    console.log('totalOfCoastingArray::::::T:::::::::::::::', Total)
    setFullTotalOfCoasting(Total)
  }, [totalOfCoastingArray])
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">BPC UPVC Doors & Windows</CardTitle>
          <Button color="danger" onClick={() => {
            generatePDF(pdfDataRow, MasterDetails)
          }}>PDF</Button>
        </CardHeader>
      </Card>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>) : (<div className="table-responsive printme">
          <Table id="coastingI" className="table table-striped" size="sm">
            <tr>
              <th>Customer:</th>
              <td>{ClientDetailsFromUPVC.length !== 0 ? CName : ''}</td>
              <th style={{
                width: 200
              }}></th>
              <td style={{
                width: 200
              }}></td>

              <th>Date: </th>
              <td>{ClientDetailsFromUPVC.length !== 0 ? moment(ClientDetailsFromUPVC[0].qutationDate).format('DD/MM/YYYY') : ''}</td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>Profile Type: </th>
              <td>{itemType}</td>
            </tr>
          </Table>
          <p style={{ paddingTop: 8, fontSize: 16 }}>
            Note:This Quotation is Valid For 7 Days.
            <br />
          </p>
          <Table id="coastingII" size="sm">
            <thead>
              <tr>
                <th style={{
                  width: 20
                }} className="text-center">Sr .No</th>
                <th style={{
                  width: 50
                }}>Item Description</th>
                <th style={{
                  width: 50
                }} className="text-right"> Estimated Qunatity</th>
                <th style={{
                  width: 50
                }} className="text-right">{Cookies.get('role') === 'ADMIN' ? 'Rate' : ''}</th>
                <th style={{
                  width: 50
                }} className="text-right">{Cookies.get('role') === 'ADMIN' ? 'Value' : ''}</th>
                <th style={{
                  width: 300
                }} className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <th colSpan={3} style={{ paddingTop: 8, fontSize: 16 }}><b>UPVC Profile</b></th>
              {
                data.map((i, x) => {
                  let estQty = 0
                  let rate = 0
                  value = 0

                  if (i.subCategoryName === 'PROFILE') {

                    // Openabalbe  door Panal (labari) 
                    // Door Panel 100 || Door Panel 150   
                    if (i.id === 3436 || i.id === 3697) {
                      const JustToCalQ = InputValues.map((data, index) => {
                        if (i.id === InputValues[index].doorPanelSize) {
                          const pQ = (((InputValues[index].height / 304.8) * (InputValues[index].numberOfOpenablePanels === 2 && InputValues[index].numberOfFixedPanels === 1 ? InputValues[index].numberOfOpenablePanels : (InputValues[index].numberOfOpenablePanels - 1))) / (i.length) * 19 * InputValues[index].qty)
                          let CountNumberOfPanelsForSashWidth = 0
                          if (InputValues[index].cFirstPanel?.Type === "Openable" || InputValues[index].cFirstPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cSecondPanel?.Type === "Openable" || InputValues[index].cSecondPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cThirdPanel?.Type === "Openable" || InputValues[index].cThirdPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cFourthPanel?.Type === "Openable" || InputValues[index].cFourthPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                          }
                          let LamberiArea = ((InputValues[index].windowType === "FDDOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "DOOR") ? ((CountNumberOfPanelsForSashWidth / (InputValues[index].doorPanelSize === 3436 ? 100 : 150)) * InputValues[index].sashHeight) : 0) * InputValues[index].qty
                          LamberiArea = (LamberiArea / 304.8) / i.length
                          if (InputValues[index]?.numberOfOpenablePanels > 0) {
                            estQty = estQty + ((InputValues[index]?.windowType === "DOOR" || InputValues[index]?.windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR") && InputValues[index].dividerForDoor === 1 ? LamberiArea : 0)
                            console.log('PANEL IN', estQty * i.upvcrate, estQty)
                            totalOfCoastingArray[707] = estQty * i.upvcrate
                          }
                        }
                      })

                      rate = i.upvcrate


                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[707] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // connector 60/60
                    if (i.id === 3523) {

                      InputValues.forEach((data, index) => {
                        const pQ = ((InputValues[index].width) / 304.8) * InputValues[index].qty
                        if (InputValues[index].profileType === '60' && InputValues[index].topProfileType === '60') {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[112] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[112] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // connector 70/70
                    if (i.id === 3526) {
                      InputValues.forEach((data, index) => {

                        const pQ = ((InputValues[index].width) / 304.8) * InputValues[index].qty
                        if (InputValues[index].profileType === '70' && InputValues[index].topProfileType === '70') {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[113] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[113] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // T Profile
                    if (i.id === 3507) {
                      InputValues.forEach((data, index) => {

                        const pQ = ((InputValues[index].height) / 304.8) * InputValues[index].qty
                        if (InputValues[index].slidingPanels > 0 && InputValues[index].totalNumberOfPanels === 4) {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[115] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[115] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    //  Frame sliding, Openable and Fix ... below
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index]?.pType.Frame) {

                        const pQ = ((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].height / 304.8) * 2)) / (i.length) * InputValues[index].qty)
                        if (InputValues[index]?.totalNumberOfPanels > 0) {
                          estQty += pQ
                        }
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }

                        value = estQty * rate

                        totalOfCoastingArray[0] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        costingItemArray[0] = pdfArray

                      }
                    })

                    // For Fixed Panels
                    // Mullion for fixed Window
                    if (i.id === 3571) {
                      InputValues.forEach((data, index) => {
                        if (i.id === InputValues[index].pType.Mullian) {

                          const pQTH = 0 // (((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)))) / (i.length) * InputValues[index].qty)
                          if (InputValues[index].numberOfFixedPanels > 0) {
                            estQty += pQTH
                          } else if (InputValues[index].slidingPanels > 0) {
                            estQty = estQty + 0
                          }
                          rate = i.upvcrate

                          if (estQty === undefined) {
                            estQty = 0
                          }
                          value = estQty * rate
                          TOTAL_MULLION = TOTAL_MULLION
                          totalOfCoastingArray[1] = value
                          itemsQuauntityArray[1] = estQty
                          pdfArray = {
                            costing_item_type: "COSTING",
                            coasting_item_id: i.id,
                            costing_Qty: estQty,
                            costing_rate: rate,
                            costing_value: value
                          }
                          pdfDataRow.push(pdfArray)
                          costingItemArray[1] = pdfArray
                          localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                        }
                      })
                    }

                    // Mullion Steel for fixed Window
                    if (i.id === 3514) {
                      InputValues.forEach((data, index) => {

                        const pQTH = 0 // (((((InputValues[index].height / 304.8) * (InputValues[index].numberOfFixedPanels - 1)))) * InputValues[index].qty)
                        if (InputValues[index].numberOfFixedPanels > 0) {
                          estQty += pQTH
                        }
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        estQty = (estQty / 8)
                        value = estQty * rate

                        totalOfCoastingArray[2] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[2] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      })
                    }
                    // Fasle mullion
                    if (i.id === 3440) {

                      InputValues.forEach((data, index) => {
                        const pQ = ((InputValues[index].height / 304.8) / (i.length)) * InputValues[index].qty
                        if (InputValues[index].windowType === "DDOOR") {

                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[3] = value

                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[3] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }


                    // 2 Moved to TOP CONDITIONS
                    InputValues.forEach((data, index) => {


                      const specificSash = (InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashOutward : ((InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashOutward : InputValues[index].pType.Sash)))

                      if (i.id === specificSash) {
                        let pQ = 0
                        // Start Calculation for sash
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Openable") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Openable") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Openable") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Openable") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        let SashForOPenable = 0
                        if (InputValues[index].numberOfOpenablePanels > 0) {
                          SashForOPenable = SashForOPenable + CountNumberOfPanelsForSashWidth
                        } else {
                          SashForOPenable = SashForOPenable + InputValues[index].width
                        }
                        pQ = (((((SashForOPenable / 304.8) * 2)) + ((InputValues[index].height / 304.8) * ((InputValues[index].numberOfOpenablePanels > 0 ? InputValues[index].numberOfOpenablePanels : InputValues[index].totalNumberOfPanels) * 2))) / (i.length) * InputValues[index].qty)
                        // End of Sash Calculation  

                        if (InputValues[index].totalNumberOfPanels > 0) {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }
                      }

                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      // totalOfCoastingArray[4] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: specificSash,
                        costing_Qty: TOTAL_SASH,
                        costing_rate: rate,
                        costing_value: rate * TOTAL_SASH
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[4] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    })

                    // 3 Fly Mesh
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].pType.FlyMesh) {

                        let CountNumberOfPanelsForFlyMeshWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Sliding") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Sliding") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Sliding") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Sliding") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        const pQ = ((((((CountNumberOfPanelsForFlyMeshWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels * 2))) / (i.length)) * InputValues[index].qty)
                        if (InputValues[index].numberOfOpenablePanels > 0) {
                          estQty = estQty + 0
                        } else {
                          estQty += pQ
                        }
                        FLY_MESH = FLY_MESH + estQty


                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[5] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[5] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // 3528 Gisket, same as sash
                    if (i.id === 3528) {

                      estQty = TOTAL_SASH * (i.length)
                      estQty = (InputValues[0]?.profileType === "4" || InputValues[0]?.profileType === "6") ? 0 : estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[6] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[6] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // Beading
                    InputValues.forEach((data, index) => {

                      if (i.id === (InputValues[index].beading === 'SG' ? InputValues[index].pType.Beading.SG : InputValues[index].pType?.Beading?.DG)) {
                        let dividerWidth = 0
                        const fixedSectionBeading = 0
                        // Start Calculation Fixed section for beading
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        // fixedSectionBeading = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * (2))) / (i.length) * InputValues[index].qty)
                        // End of FixedSectionBeading Calculation 
                        if (InputValues[index].cSecondPanel.Type === "Fixed" && InputValues[index].numberOfOpenablePanels === 2) {
                          dividerWidth = dividerWidth + (Number(InputValues[index].cSecondPanel.customPanelWidth / 304.8) / (i.length))
                        }
                        estQty = (InputValues[index].slidingPanels > 0 ? TOTAL_SASH : (TOTAL_FRAME + ((((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)))) / (i.length) * InputValues[index].qty) * 2)))
                        rate = i.upvcrate
                        console.log('BEDING::::C::', itemsQuauntityArray[9])
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[7] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[7] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // Interlock
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].pType.InterLock) {
                        const pQ = (((((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels === 1 ? 2 : (InputValues[index].slidingPanels === 2 ? 2 : 4))))) / (i.length) * InputValues[index].qty)
                        if (InputValues[index].numberOfOpenablePanels > 0) {
                          estQty = estQty + 0
                        } else {
                          estQty += pQ
                        }

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        TOTAL_INTERLOCK = estQty
                        value = estQty * rate

                        totalOfCoastingArray[8] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[8] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // Mullion
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].pType.Mullian) {

                        let CountNumberOfPanelForMuliion = 0
                        if (InputValues[index].cFirstPanel?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        let dividerWidth = 0
                        const DirectWithOpenable = ((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1))) / (i.length) * InputValues[index].qty)
                        const ExtraMullion = (((((InputValues[index].mullion.mullianWidth / 304.8) * InputValues[index].numberOfMullians))) / (i.length) * InputValues[index].qty)
                        const pQ = InputValues[index].slidingPanels > 0 ? 0 : ((InputValues[index].slidingPanels === 2 && InputValues[index].numberOfFixedPanels === 1) ? DirectWithOpenable : DirectWithOpenable)
                        const mullionForDoorPanel = (((InputValues[index].width / 304.8) / (i.length)) * InputValues[index].qty)

                        if (InputValues[index].mullion.type === 'No') {
                          estQty = estQty + pQ + ((InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR") ? mullionForDoorPanel : 0)

                        } else {
                          const q = estQty + pQ + ExtraMullion

                          estQty = q
                        }

                        if (InputValues[index].cSecondPanel.Type === "Fixed" && InputValues[index].numberOfOpenablePanels === 2) {
                          dividerWidth = dividerWidth + (Number(InputValues[index].cSecondPanel.customPanelWidth / 304.8) / (i.length))
                        }
                        estQty = estQty + (dividerWidth * InputValues[index].divider) // estQty is mullion
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[9] = value
                        itemsQuauntityArray[9] = estQty
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[9] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // Mullion Steel
                    if (i.id === 3514) {
                      InputValues.forEach((data, index) => {
                        let MS = 0
                        arrayForMUllianSteel.forEach((data, index) => {
                          MS += data
                        })
                        const pQTH = (((MS) * (i.length)) / 8)  // Mullion is 0 here, estQty has last value of 3514 for top hung  i think

                        estQty = pQTH

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[10] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[10] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      })
                    }

                    // ML 1800
                    if (i.id === 3451) {

                      const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[11] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[11] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    const coastingTotals = {
                      total_of_costing: FullTotalOfCoasting, //valueOfTotal,
                      Costing_TCPH_value: FullTotalOfCoasting,
                      Costing_AW_perentage: addWaistage,
                      Costing_AW_value: ((FullTotalOfCoasting * addWaistage) / 100).toFixed(2),
                      Costing_AFO_perecntage: AddFactoryOverHead,
                      Costing_AFO_value: (((parseInt(FullTotalOfCoasting, 10) + ((FullTotalOfCoasting * addWaistage) / 100)) * AddFactoryOverHead) / 100).toFixed(2),
                      Costing_total_cost_MIOW_value: totalCoastMaterial,
                      Costing_add_profit_percentage: addProfit,
                      Costing_add_profit_value: totalProfit,
                      Costing_total_cost_of_project_value: Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft),
                      Costing_difference_costing_and_grandtotal_Q2: 0,
                      Costing_COP_divided_percentage_of_project: divisionOfTotalCoastAddedCoast
                    }
                    MasterDetails.push(coastingTotals)

                    localStorage.setItem("MasterDetailsCoasting", JSON.stringify(coastingTotals))
                    return (
                      <>
                        <tr style={{
                          display: value === 0 ? 'none' : ''
                        }}>
                          <th style={{
                            width: 20
                          }} className="text-center">{i.id}</th>

                          <td style={{
                            width: 200
                          }} >{i.name}</td>
                          <td style={{
                            width: 200
                          }} className="text-right">{estQty.toFixed(2)}</td>
                          <td style={{
                            width: 200
                          }} className="text-right">{Cookies.get('role') === 'ADMIN' ? rate : ''}</td>
                          <td style={{
                            width: 200
                          }} className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round(value.toFixed(2))) : ''}</td>
                        </tr>

                      </>
                    )
                  }
                  // End of BURAQ


                  if (i.subCategoryName === 'PROFILE' && (InputValues[0].windowType === "DOOR" || InputValues[0].windowType === "DDOOR")) {

                    if (i.id === 3434) {

                      InputValues.forEach((data, index) => {
                        const pQ = 0 // ((((InputValues[index].width / 304.8)  * 2)  + ((InputValues[index].height / 304.8) * 4)) / ((InputValues[index].profileType === "6" ||  InputValues[index].profileType === "7") ? 20 : 19) * InputValues[index].qty)    //       .....coastingLoopFunction(i.id, upvc, state, i.id)
                        estQty += pQ
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[13] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[13] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    const coastingTotals = {
                      total_of_costing: FullTotalOfCoasting, //valueOfTotal,
                      Costing_TCPH_value: FullTotalOfCoasting,
                      Costing_AW_perentage: addWaistage,
                      Costing_AW_value: ((FullTotalOfCoasting * addWaistage) / 100).toFixed(2),
                      Costing_AFO_perecntage: AddFactoryOverHead,
                      Costing_AFO_value: (((parseInt(FullTotalOfCoasting, 10) + ((FullTotalOfCoasting * addWaistage) / 100)) * AddFactoryOverHead) / 100).toFixed(2),
                      Costing_total_cost_MIOW_value: totalCoastMaterial,
                      Costing_add_profit_percentage: addProfit,
                      Costing_add_profit_value: totalProfit,
                      Costing_total_cost_of_project_value: Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft),
                      Costing_difference_costing_and_grandtotal_Q2: 0,
                      Costing_COP_divided_percentage_of_project: divisionOfTotalCoastAddedCoast
                    }
                    MasterDetails.push(coastingTotals)
                    localStorage.setItem("MasterDetailsCoasting", JSON.stringify(coastingTotals))

                    return (
                      <tr style={{
                        display: value === 0 ? 'none' : ''
                      }}>
                        <th style={{
                          width: 20
                        }} className="text-center">{i.id}</th>

                        <td >{i.name}</td>
                        <td className="text-right">{estQty.toFixed(2)}</td>
                        <td className="text-right">{Cookies.get('role') === 'Admin' ? rate : ''}</td>
                        <td className="text-right">{Cookies.get('role') === 'Admin' ? (Math.round(value.toFixed(2))) : ''}</td>
                      </tr>)
                  }
                  // End of DOOR Condition

                  if (i.subCategoryName === ' Hardware') {
                    // silicon for all
                    if (i.id === 3425) {
                      InputValues.forEach((data, index) => {
                        const pQ = ((((InputValues[index].width) * (InputValues[index].height) / 92900)) * InputValues[index].qty)
                        estQty = Number(estQty) + Number(pQ)
                      })

                      estQty = estQty / 30
                      estQty = Math.ceil(estQty)

                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[42] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[42] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }
                    // Spacer
                    InputValues.forEach((data, index) => {

                      if (i.id === 3702 && InputValues[index].beading === 'DG') {
                        let dividerWidth = 0
                        const fixedSectionBeading = 0
                        // Start Calculation Fixed section for beading
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        // fixedSectionBeading = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * (2))) / (i.length) * InputValues[index].qty)
                        // End of FixedSectionBeading Calculation 
                        if (InputValues[index].cSecondPanel.Type === "Fixed" && InputValues[index].numberOfOpenablePanels === 2) {
                          dividerWidth = dividerWidth + (Number(InputValues[index].cSecondPanel.customPanelWidth / 304.8) / (i.length))
                        }
                        estQty = (InputValues[index].slidingPanels > 0 ? TOTAL_SASH : TOTAL_FRAME + ((((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)))) / (i.length) * InputValues[index].qty) * 2))
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        estQty = ((estQty * (i.length)) / 16)
                        value = estQty * rate

                        totalOfCoastingArray[700] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[700] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // Desiccant
                    InputValues.forEach((data, index) => {

                      if (i.id === 3703 && InputValues[index].beading === 'DG') {
                        let dividerWidth = 0
                        const fixedSectionBeading = 0
                        // Start Calculation Fixed section for beading
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                        }
                        // fixedSectionBeading = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * (2))) / (i.length) * InputValues[index].qty)
                        // End of FixedSectionBeading Calculation 
                        if (InputValues[index].cSecondPanel.Type === "Fixed" && InputValues[index].numberOfOpenablePanels === 2) {
                          dividerWidth = dividerWidth + (Number(InputValues[index].cSecondPanel.customPanelWidth / 304.8) / (i.length))
                        }
                        estQty = (InputValues[index].slidingPanels > 0 ? (TOTAL_SASH + TOTAL_SASH_TOPHungs) : (TOTAL_FRAME + TOTAL_FRAME_TOP_HUNGS) + ((((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)))) / (i.length) * InputValues[index].qty) * 2))

                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        const beading = estQty * 19 // i.length
                        estQty = beading * 8.80

                        value = estQty * rate

                        totalOfCoastingArray[701] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[701] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // DG Silicon
                    InputValues.forEach((data, index) => {

                      if (i.id === 3704 && InputValues[index].beading === 'DG') {

                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        estQty += ((((InputValues[index].width) * (InputValues[index].height) / 92900)) * InputValues[index].qty) * 0.08
                        estQty = Math.ceil(estQty)
                        value = estQty * rate

                        totalOfCoastingArray[703] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[703] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // Sliding condtion
                    // InputValues.forEach((dataP, idx) => {

                    // })
                    if (InputValues?.[0]?.slidingPanels > 0
                      || InputValues?.[1]?.slidingPanels > 0
                      || InputValues?.[2]?.slidingPanels > 0
                      || InputValues?.[3]?.slidingPanels > 0
                      || InputValues?.[4]?.slidingPanels > 0
                      || InputValues?.[5]?.slidingPanels > 0
                      || InputValues?.[6]?.slidingPanels > 0
                      || InputValues?.[7]?.slidingPanels > 0
                      || InputValues?.[8]?.slidingPanels > 0
                      || InputValues?.[9]?.slidingPanels > 0
                      || InputValues?.[10]?.slidingPanels > 0) {

                      //Buffer
                      if (i.id === 3454) {

                        InputValues.forEach((data, index) => {
                          const pQ = 4 // ((((InputValues[index].width / 304.8)  * 2)  + ((InputValues[index].height / 304.8) * 2)) / ((InputValues[index].profileType === "6" ||  InputValues[index].profileType === "7") ? 20 : 19) * 19 * InputValues[index].qty)

                          if (InputValues[index].slidingPanels > 0) {
                            estQty += pQ
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[17] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[17] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Frame steel
                      if (i.id === 3441) {

                        estQty = ((TOTAL_FRAME * (i.length)) / 8)
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[58] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        InputValues.forEach((data, index) => {
                          if (InputValues[index].slidingPanels > 0) {
                            pdfDataRow.push(pdfArray)
                            costingItemArray[58] = pdfArray
                            localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                          }
                        })
                      }

                      //  Screen Sash Steel
                      if (i.id === 3443) {

                        estQty = (((FLY_MESH * (i.length)) / 8) / 2)

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[19] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[19] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      //  Interlock Brush
                      if (i.id === 3444) {

                        InputValues.forEach((data, index) => {
                          let InterlockBrushRTC = 0
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            estQty = estQty + 0
                          } else {

                            InterlockBrushRTC = InterlockBrushRTC + ((((((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels === 1 ? 2 : (InputValues[index].slidingPanels === 2 ? 2 : 4)))))) * InputValues[index].qty)
                            estQty = estQty + InterlockBrushRTC
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[20] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[20] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      //  Jali Brush
                      if (i.id === 3513) {

                        InputValues.forEach((data, index) => {
                          const pQ = (((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels * 2) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            estQty = estQty + 0
                          } else {
                            estQty = (TOTAL_INTERLOCK * (i.length)) / 2
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[21] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[21] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      //  Sliding Sash Adopter for 4PSL (2 fixed & 2 Sliding)
                      if (i.id === 3701) {

                        InputValues.forEach((data, index) => {
                          const pQ = (((((InputValues[index].height / 304.8)))) * InputValues[index].qty)
                          if (InputValues[index].slidingPanels === 2 && InputValues[index].numberOfFixedPanels === 2) {
                            estQty += pQ
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[364] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[364] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // Multilocks for Sliding windows
                      // ML 400
                      if (i.id === 3445) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[23] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[23] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 600
                      if (i.id === 3446) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[24] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[24] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 800
                      if (i.id === 3447) {

                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[25] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[25] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1000
                      if (i.id === 3448) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[26] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[26] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1400
                      if (i.id === 3449) {

                        estQty = slidingMultilocksConditions(InputValues, i.id, estQty)

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[27] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[27] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1600
                      if (i.id === 3450) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[260] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[260] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // 3530 Fiber Mesh, same was as sash
                      if (i.id === 3530) {
                        InputValues.forEach((data, index) => {
                          const pQ = (((((InputValues[index].width) * (InputValues[index].height)) / 92900) / 2) * InputValues[index].qty)
                          estQty += pQ
                          rate = i.upvcrate
                        })
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[28] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[28] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // 3531 Gisket, Same as Sash Steel
                      if (i.id === 3531) {

                        estQty = (TOTAL_SASH / 2)

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[29] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[29] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // 3529 Sash Brush 6x6 ... C Type
                      if (i.id === 3529) {
                        InputValues.forEach((data, index) => {
                          let pQ = 0
                          // Start Calculation for sash
                          let CountNumberOfPanelsForSashWidth = 0
                          if (InputValues[index].cFirstPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cSecondPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cThirdPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cFourthPanel?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                          }
                          pQ = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * InputValues[index].slidingPanels)) * InputValues[index].qty)
                          // End of Sash Calculation  
                          let pQFix = 0
                          // Start Calculation for sash
                          let CountNumberOfPanelsForSashWidthFix = 0
                          if (InputValues[index].cFirstPanel?.Type === "Fixed") {
                            CountNumberOfPanelsForSashWidthFix += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cSecondPanel?.Type === "Fixed") {
                            CountNumberOfPanelsForSashWidthFix += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cThirdPanel?.Type === "Fixed") {
                            CountNumberOfPanelsForSashWidthFix += Number(InputValues[index].cThirdPanel?.customPanelWidth)
                          }
                          if (InputValues[index].cFourthPanel?.Type === "Fixed") {
                            CountNumberOfPanelsForSashWidthFix += Number(InputValues[index].cFourthPanel?.customPanelWidth)
                          }
                          pQFix = ((((CountNumberOfPanelsForSashWidthFix / 304.8) * 2) * InputValues[index].numberOfFixedPanels) * InputValues[index].qty)
                          // End of Sash Calculation 

                          pQ *= 2
                          pQFix *= 2
                          estQty += (pQ + pQFix)

                          rate = i.upvcrate
                        })
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[30] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[30] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // 3532 Jali Wheel
                      if (i.id === 3532) {

                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].slidingPanels * 2) * InputValues[index].qty
                          if (InputValues[index].slidingPanels > 0) {
                            estQty += pQ
                          }

                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[31] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[31] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // V cut Pully Single Wheel
                      if (i.id === 3533) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[32] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[32] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // V cut Pully Double Wheel
                      if (i.id === 3534) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[33] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[33] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Block
                      if (i.id === 3427) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[34] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[34] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Small Moon Lock with Strip
                      if (i.id === 3535) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[35] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[35] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Large Moon Lock with Strip
                      if (i.id === 3413) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[36] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[36] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // ML 1200
                      if (i.id === 3452) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[37] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[37] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // ML 2000
                      if (i.id === 3453) {
                        const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[250] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[250] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Dummy Wheel
                      if (i.id === 3415) {
                        estQty = 0
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[38] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[38] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Stopper
                      if (i.id === 3416) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[39] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[39] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Track
                      if (i.id === 3417) {
                        const res = slidingConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[40] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[40] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Stay Bar
                      if (i.id === 3418) {
                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            if (InputValues[index].slidingPanels > 0) {
                              estQty += pQ
                            }
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[41] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[41] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // silicon for all
                      if (i.id === 34255555) {
                        InputValues.forEach((data, index) => {
                          const pQ = ((((InputValues[index].width) * (InputValues[index].height) / 92900)) * InputValues[index].qty)
                          estQty = Number(estQty) + Number(pQ)
                        })

                        estQty = estQty / 30
                        estQty = Math.ceil(estQty)

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[42] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[42] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // sliding handle
                      if (i.id === 3423) {

                        InputValues.forEach((data, index) => {
                          const multiLockNo = ((InputValues[index].cFirstPanel.Type === 'Sliding' && InputValues[index].cFourthPanel.Type === 'Sliding') || (InputValues[index].cFirstPanel.Type === 'Sliding' && InputValues[index].cThirdPanel.Type === 'Sliding')) ? 2 : ((InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cFourthPanel.Type === 'Openable') || (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cThirdPanel.Type === 'Openable') ? 2 : ((InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cSecondPanel.Type === 'Openable') ? 2 : 1))
                          const pQ = (multiLockNo) * InputValues[index].qty
                          if (InputValues[index].multiLockingSystem === "No") {
                            estQty = estQty + 0
                          } else {
                            if (InputValues[index].slidingPanels > 0) {
                              estQty += pQ
                            }
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[43] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[43] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                    }

                    //No sliding, i.e Openable panels condition
                    if (InputValues?.[0]?.numberOfOpenablePanels > 0 || InputValues?.[0]?.numberOfFixedPanels > 0
                      || InputValues?.[1]?.numberOfOpenablePanels > 0 || InputValues?.[1]?.numberOfFixedPanels > 0
                      || InputValues?.[2]?.numberOfOpenablePanels > 0 || InputValues?.[2]?.numberOfFixedPanels > 0
                      || InputValues?.[3]?.numberOfOpenablePanels > 0 || InputValues?.[3]?.numberOfFixedPanels > 0
                      || InputValues?.[4]?.numberOfOpenablePanels > 0 || InputValues?.[4]?.numberOfFixedPanels > 0
                      || InputValues?.[5]?.numberOfOpenablePanels > 0 || InputValues?.[5]?.numberOfFixedPanels > 0
                      || InputValues?.[6]?.numberOfOpenablePanels > 0 || InputValues?.[6]?.numberOfFixedPanels > 0
                      || InputValues?.[7]?.numberOfOpenablePanels > 0 || InputValues?.[7]?.numberOfFixedPanels > 0
                      || InputValues?.[8]?.numberOfOpenablePanels > 0 || InputValues?.[8]?.numberOfFixedPanels > 0
                      || InputValues?.[9]?.numberOfOpenablePanels > 0 || InputValues?.[9]?.numberOfFixedPanels > 0
                      || InputValues?.[10]?.numberOfOpenablePanels > 0 || InputValues?.[10]?.numberOfFixedPanels > 0) {
                      //No sliding

                      // Cock spar Handle for Openable when no multilock
                      if (i.id === 3542) {
                        InputValues.forEach((data, index) => {
                          const multiLockNo = (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cFourthPanel.Type === 'Openable') ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cThirdPanel.Type === 'Openable' ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cSecondPanel.Type === 'Openable' ? 2 : 1))
                          const pQ = (multiLockNo) * InputValues[index].qty

                          if (InputValues[index].multiLockingSystem === "No") {
                            if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) {
                              estQty = estQty + 0
                            } else if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) {
                              estQty += pQ
                            }
                          } else {

                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[44] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[44] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Door Handle
                      if (i.id === 3662) {
                        InputValues.forEach((data, index) => {
                          const handleNo = InputValues[index].numberOfOpenablePanels + InputValues[index].mullion.numberOfMullians // (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cFourthPanel.Type === 'Openable') ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cThirdPanel.Type === 'Openable' ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cSecondPanel.Type === 'Openable' ? 2 : 1))
                          const pQ = (handleNo) * InputValues[index].qty

                          if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) {
                            estQty += pQ
                          } else if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) {
                            estQty = estQty + 0
                          } else {

                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[45] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[45] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Screw 3/4 x 8 Dialing for Openable, Sliding and Fixed
                      if (i.id === 3602) {

                        InputValues.forEach((data, index) => {
                          const pQSliding = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].slidingPanels) : (3 * InputValues[index].slidingPanels)) * InputValues[index].qty * 10
                          const pQOpenable = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].numberOfOpenablePanels) : (3 * InputValues[index].numberOfOpenablePanels)) * InputValues[index].qty * 10
                          const pQFixed = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].numberOfFixedPanels) : (3 * InputValues[index].numberOfFixedPanels)) * InputValues[index].qty * 10
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            estQty += pQOpenable
                          } else if (InputValues[index].slidingPanels > 0) {
                            estQty += pQSliding
                          } else {
                            estQty = estQty + 0
                          }

                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[46] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[46] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Hole Cape (Achar cape) for Openable, Sliding and Fixed
                      if (i.id === 3605) {

                        InputValues.forEach((data, index) => {
                          // In (4 * 2) the 3 is the number of cap in 1 height
                          const heightCap = ((InputValues[index].height / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                          const widthCap = ((InputValues[index].width / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty

                          estQty = estQty + (heightCap + widthCap)
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[199] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[199] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Fitting Screw for Openable, Sliding and Fixed
                      if (i.id === 3598) {

                        InputValues.forEach((data, index) => {
                          // In (4 * 2) the 3 is the number of cap in 1 height
                          const heightCap = ((InputValues[index].height / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                          const widthCap = ((InputValues[index].width / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty

                          estQty = estQty + (heightCap + widthCap)
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[360] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[360] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // Water Cape
                      if (i.id === 3520) {
                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].totalNumberOfPanels) * InputValues[index].qty
                          estQty += pQ
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[200] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[200] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                      // Multililocks for Openable windows
                      // ML 400
                      if (i.id === 3688) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[47] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[47] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 600
                      if (i.id === 3689) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[48] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[48] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 800
                      if (i.id === 3690) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[49] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[49] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1000
                      if (i.id === 3691) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[50] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[50] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1400
                      if (i.id === 3693) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[51] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[51] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1600
                      if (i.id === 3694) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[52] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[52] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1800
                      if (i.id === 3695) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[11] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[11] = pdfArray // from 53
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                      // ML 1200
                      if (i.id === 3692) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[54] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[54] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                      // ML 2000
                      if (i.id === 3696) {
                        const res = openableMultilocksConditions(InputValues, i.id, estQty)
                        estQty = res.estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[55] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[55] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // 16
                      if (i.id === 3420) {
                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].totalNumberOfPanels) * InputValues[index].qty
                          if (InputValues[index].totalNumberOfPanels > 0) {
                            estQty = estQty + 0
                          } else {
                            if (InputValues[index].numberOfOpenablePanels > 0) {
                              estQty += pQ
                            }
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[57] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[57] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                      //

                      // steel openable
                      if (i.id === 3441) {
                        estQty = ((TOTAL_FRAME * (i.length)) / 8)
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[58] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        InputValues.forEach((data, index) => {
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            pdfDataRow.push(pdfArray)
                            costingItemArray[58] = pdfArray
                            localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                          }
                        })
                      }

                      // Sash Steel
                      if (i.id === 3442) {

                        estQty = estQty + ((TOTAL_SASH * (i.length)) / 8)
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[59] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[59] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Screen Sash Steel
                      if (i.id === 3443) {

                        estQty = (((FLY_MESH * (i.length)) / 8) / 2)
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        // totalOfCoastingArray[sdfsdfsdfsdfsdf] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        // pdfDataRow.push(pdfArray)
                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Interlock Brush
                      if (i.id === 3444) {

                        InputValues.forEach((data, index) => {
                          const pQ = (((((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels === 1 ? 2 : (InputValues[index].slidingPanels === 2 ? 2 : 4))))) / (i.length) * InputValues[index].qty) * (i.length)
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            estQty = estQty + 0
                          } else {
                            if (InputValues[index].numberOfOpenablePanels > 0) {
                              estQty += pQ
                            }
                          }

                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        // totalOfCoastingArray[sdfsdfsdfsdfsdf] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        // pdfDataRow.push(pdfArray)
                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Stay bar 8"
                      if (i.id === 3543) {

                        InputValues.forEach((data, index) => {
                          // Start Calculation for sash
                          const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            if (Number(InputValues[index].cFirstPanel?.customPanelWidth) <= 12 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR" || InputValues[index].windowType !== "FDDOOR")) {
                              estQty += pQ
                            }
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[60] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[60] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // fraction hing
                      if (i.id === 3419) {
                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].openableTopHungs * 2) * InputValues[index].qty
                          if (InputValues[index].slidingPanels <= 0) {
                            estQty = estQty + 0
                          } else {
                            if (InputValues[index].numberOfOpenablePanels > 0) {
                              estQty += pQ
                            }
                          }

                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[61] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[61] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Stay bar 10"
                      if (i.id === 3544) {
                        InputValues.forEach((data, index) => {
                          // Start Calculation for sash

                          const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            if (Number(InputValues[index].cFirstPanel?.customPanelWidth) <= 15 && Number(InputValues[index].cFirstPanel?.customPanelWidth) >= 12 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR" || InputValues[index].windowType !== "FDDOOR")) { // 15 18
                              estQty += pQ
                            }
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[62] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[62] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Stay bar 812"
                      if (i.id === 3545) {
                        InputValues.forEach((data, index) => {
                          // Start Calculation for sash
                          const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            if (Number(InputValues[index].cFirstPanel?.customPanelWidth) >= 18 && (InputValues[index].windowType !== "DOOR" && InputValues[index].windowType !== "DDOOR" && InputValues[index].windowType !== "FDDOOR")) {
                              estQty += pQ
                            }
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[63] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[63] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // handle
                      if (i.id === 3423) {
                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                          if (InputValues[index].multiLockingSystem === "No" || (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR")) {
                            if (InputValues[index].numberOfOpenablePanels > 0) {
                              estQty = estQty + 0
                            }
                          } else {
                            estQty += pQ
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[43] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[43] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // silicon for Openable. Fixed
                      if (i.id === 34255555) {

                        InputValues.forEach((data, index) => {
                          if (InputValues[index].numberOfOpenablePanels > 0 || InputValues[index].numberOfFixedPanels > 0) {
                            const pQ = ((((InputValues[index].width) * (InputValues[index].height) / 92900)) * InputValues[index].qty)
                            estQty = Number(estQty) + Number(pQ)
                            console.log('SILICONS::::::::::::', estQty, pQ)
                          }

                          estQty = estQty / 30
                          estQty = Math.ceil(estQty)
                          rate = i.upvcrate

                          if (estQty === undefined) {
                            estQty = 0
                          }
                          value = estQty * rate
                          // totalOfCoastingArray[64] = value
                          pdfArray = {
                            costing_item_type: "COSTING",
                            coasting_item_id: i.id,
                            costing_Qty: estQty,
                            costing_rate: rate,
                            costing_value: value
                          }
                          if (InputValues[index].numberOfOpenablePanels > 0) {
                            pdfDataRow.push(pdfArray)
                            // costingItemArray[64] = pdfArray
                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                          }
                        })
                      }

                      // Pincel / 2D Hinges
                      if (i.id === 3426) {
                        InputValues.forEach((data, index) => {
                          const pQ = ((InputValues[index].height / 304.8) >= 7 ? (4 * InputValues[index].numberOfOpenablePanels) : ((InputValues[index].height / 304.8) >= 5 && (InputValues[index].height / 304.8) <= 7 ? (3 * InputValues[index].numberOfOpenablePanels) : (2 * InputValues[index].numberOfOpenablePanels))) * InputValues[index].qty
                          const doorHings = (4 * InputValues[index].numberOfOpenablePanels) * InputValues[index].qty

                          if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR")) {
                            estQty += doorHings
                          } else if (InputValues[index].numberOfOpenablePanels > 0) {
                            estQty += pQ
                          } else {
                            estQty = estQty + 0
                          }

                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[65] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[65] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // Door Lock
                      if (i.id === 3429) {
                        InputValues.forEach((data, index) => {
                          const pQ = 1//((Number(InputValues[index].totalNumberOfPanels) - 1) * 2) * InputValues[index].qty
                          if (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR") {
                            estQty += pQ
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[66] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[66] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }

                      // Tower Bolt
                      if (i.id === 3430) {

                        InputValues.forEach((data, index) => {
                          const pQ = (InputValues[index].totalNumberOfPanels * 1) * InputValues[index].qty
                          if (InputValues[index].windowType === "DDOOR") {
                            estQty += pQ
                          } else {
                            estQty = estQty + 0
                          }
                        })
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[67] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[67] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }

                      // mullion connector for Openable
                      if (i.id === 3428) {

                        InputValues.forEach((data, index) => {

                          const pQ = ((InputValues[index].numberOfOpenablePanels) * (InputValues[index].mullion.numberOfMullians * 2)) * InputValues[index].qty
                          const connectorForDoorDivider = (InputValues[index].dividerForDoor * 2) * InputValues[index].qty
                          if (InputValues[index].mullion.type === 'No') {
                            estQty = estQty + connectorForDoorDivider + (InputValues[index].slidingPanels > 0 ? 0 : (InputValues[index].totalNumberOfPanels - 1) * 2)
                         
                          } else {
                            console.log('MULLION::CCC::', estQty, pQ, connectorForDoorDivider)
                            estQty = estQty + connectorForDoorDivider + pQ + (InputValues[index].slidingPanels > 0 ? 0 : (InputValues[index].totalNumberOfPanels - 1) * 2)
                           
                          }
                        })
                       
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[68] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[68] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    }

                    const coastingTotals = {
                      total_of_costing: FullTotalOfCoasting, //valueOfTotal,
                      Costing_TCPH_value: FullTotalOfCoasting,
                      Costing_AW_perentage: addWaistage,
                      Costing_AW_value: ((FullTotalOfCoasting * addWaistage) / 100).toFixed(2),
                      Costing_AFO_perecntage: AddFactoryOverHead,
                      Costing_AFO_value: (((parseInt(FullTotalOfCoasting, 10) + ((FullTotalOfCoasting * addWaistage) / 100)) * AddFactoryOverHead) / 100).toFixed(2),
                      Costing_total_cost_MIOW_value: totalCoastMaterial,
                      Costing_add_profit_percentage: addProfit,
                      Costing_add_profit_value: totalProfit,
                      Costing_total_cost_of_project_value: Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft),
                      Costing_difference_costing_and_grandtotal_Q2: 0,
                      Costing_COP_divided_percentage_of_project: divisionOfTotalCoastAddedCoast
                    }
                    MasterDetails.push(coastingTotals)
                    localStorage.setItem("MasterDetailsCoasting", JSON.stringify(coastingTotals))
                    return (
                      <>
                        <th colSpan={3} style={{ paddingTop: 28, fontSize: 16, display: (i.subCategoryName === " Hardware" && i.id === 3529) ? '' : 'none' }}><b>Hardware & Steel</b></th>
                        <tr style={{
                          display: value === 0 ? 'none' : ''
                        }}>
                          <th style={{
                            width: 20
                          }} className="text-center">{i.id}</th>

                          <td >{i.name}</td>
                          <td className="text-right">{Number(estQty).toFixed(2)}</td>
                          <td className="text-right">{Cookies.get('role') === 'ADMIN' ? rate : ''}</td>
                          <td className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round(value.toFixed(2))) : ''}</td>
                        </tr>
                      </>
                    )
                  }
                })}

              {/*  TOP HUNGS CONDITIONS*/}
              <th colSpan={3} style={{ paddingTop: 28, fontSize: 16 }}><b>Top Section Profile & Hardware Items</b></th>
              {
                data.map((i, x) => {
                  let estQty = 0
                  let rate = 0

                  value = 0
                  if (i.subCategoryName === 'PROFILE' && (InputValues[0].profileType === "6" || InputValues[0].profileType !== "6")) {
                    // 1
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].topPType.Frame) {
                        //  TopHung Frame
                        const pQTH = ((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].heightTopHung / 304.8) * 2)) / (i.length) * InputValues[index].qty)

                        if (InputValues[index].totalTopHungs > 0) {
                          estQty += pQTH
                        } else {
                          estQty = estQty + 0
                        }
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[69] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[69] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                    })

                    // Top Hung Mullion for Openable
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].topPType.Mullian) {

                        let CountNumberOfPanelForMuliion = 0
                        if (InputValues[index].customFirstTop?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].customFirstTop?.customPanelWidth)
                        }
                        if (InputValues[index].customSecondTop?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].customSecondTop?.customPanelWidth)
                        }
                        if (InputValues[index].customThirdTop?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].customThirdTop?.customPanelWidth)
                        }
                        if (InputValues[index].customFourthTop?.Type === "Openable") {
                          CountNumberOfPanelForMuliion += Number(InputValues[index].customFourthTop?.customPanelWidth)
                        }
                        let dividerWidth = 0
                        const DirectWithOpenable = ((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1))) / (i.length) * InputValues[index].qty)
                        const ExtraMullion = (((((InputValues[index].mullion.mullianWidth / 304.8) * InputValues[index].numberOfMullians))) / (i.length) * InputValues[index].qty)
                        const pQ = InputValues[index].slidingTopHungs > 0 ? 0 : ((InputValues[index].slidingTopHungs === 2 && InputValues[index].fixedTopHungs === 1) ? DirectWithOpenable : DirectWithOpenable)

                        if (InputValues[index].mullion.type === 'No' && InputValues[index].windowType === "DDOOR") {
                          estQty = estQty + 0
                        } else if (InputValues[index].mullion.type === 'No') {
                          estQty += pQ
                        } else {
                          const q = estQty + pQ //+ ExtraMullion, commmented for topHung
                          estQty = q
                        }

                        if (InputValues[index].customSecondTop.Type === "Fixed" && InputValues[index].openableTopHungs === 2) {
                          dividerWidth = dividerWidth + (Number(InputValues[index].customSecondTop.customPanelWidth / 304.8) / (i.length))
                        }
                        estQty = estQty + (dividerWidth * InputValues[index].divider) // estQty is mullion
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[205] = value
                        topHungItemsQuauntityArray[205] = estQty
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[205] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // TOP HUNG SASH, 2 Moved to TOP CONDITIONS
                    InputValues.forEach((data, index) => {
                      const specificSashTOP = (InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) ? InputValues[index].pType.SashOpenable.DoorSashOutward : ((InputValues[index].categoryShape === "Inward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashInward : ((InputValues[index].categoryShape === "Outward" && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR")) ? InputValues[index].pType.SashOpenable.OpWindowSashOutward : InputValues[index].pType.Sash)))

                      if (i.id === specificSashTOP) {
                        let pQTH = 0
                        if (InputValues[index].totalTopHungs > 0) {
                          // Start Calculation for sash
                          let CountNumberOfPanelsForSashWidth = 0
                          if (InputValues[index].customFirstTop?.Type === "Openable" || InputValues[index].customFirstTop?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFirstTop?.customPanelWidth)
                          }
                          if (InputValues[index].customSecondTop?.Type === "Openable" || InputValues[index].customSecondTop?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customSecondTop?.customPanelWidth)
                          }
                          if (InputValues[index].customThirdTop?.Type === "Openable" || InputValues[index].customThirdTop?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customThirdTop?.customPanelWidth)
                          }
                          if (InputValues[index].customFourthTop?.Type === "Openable" || InputValues[index].customFourthTop?.Type === "Sliding") {
                            CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFourthTop?.customPanelWidth)
                          }
                          pQTH = (((((InputValues[index].fixedTopHungs > 0 ? (CountNumberOfPanelsForSashWidth / 304.8) : (InputValues[index].width / 304.8)) * 2)) + ((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs * 2))) / (i.length) * InputValues[index].qty)
                          estQty += pQTH
                        } else {
                          estQty = estQty + 0
                        }
                        estQty = TOTAL_SASH_TOPHungs
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[70] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[70] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                    })

                    // TOP HUNG FlyMesh
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].topPType.FlyMesh) {

                        let CountNumberOfTopHungForFlyMeshWidth = 0
                        if (InputValues[index].customFirstTop?.Type === "Sliding") {
                          CountNumberOfTopHungForFlyMeshWidth += Number(InputValues[index].customFirstTop?.customPanelWidth)
                        }
                        if (InputValues[index].customSecondTop?.Type === "Sliding") {
                          CountNumberOfTopHungForFlyMeshWidth += Number(InputValues[index].customSecondTop?.customPanelWidth)
                        }
                        if (InputValues[index].customThirdTop?.Type === "Sliding") {
                          CountNumberOfTopHungForFlyMeshWidth += Number(InputValues[index].customThirdTop?.customPanelWidth)
                        }
                        if (InputValues[index].customFourthTop?.Type === "Sliding") {
                          CountNumberOfTopHungForFlyMeshWidth += Number(InputValues[index].customFourthTop?.customPanelWidth)
                        }
                        const pQTH = ((((((CountNumberOfTopHungForFlyMeshWidth / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * (InputValues[index].slidingTopHungs * 2))) / (i.length)) * InputValues[index].qty)    //       .....coastingLoopFunction(i.id, upvc, state, i.id)
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty = estQty + 0
                        } else if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQTH
                        }

                        FLY_MESH_TOPHUNGS = FLY_MESH_TOPHUNGS + estQty

                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[71] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[71] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                      }
                    })

                    // TOP HUNGS Beading
                    InputValues.forEach((data, index) => {

                      if (i.id === (InputValues[index].beading === 'SG' ? InputValues[index].topPType.Beading.SG : InputValues[index].topPType?.Beading?.DG)) {
                        const fixedSectionBeadingTopHung = 0
                        // Start Calculation Fixed section for beading
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].customFirstTop?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFirstTop?.customPanelWidth)
                        }
                        if (InputValues[index].customSecondTop?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customSecondTop?.customPanelWidth)
                        }
                        if (InputValues[index].customThirdTop?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customThirdTop?.customPanelWidth)
                        }
                        if (InputValues[index].customFourthTop?.Type === "Fixed") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFourthTop?.customPanelWidth)
                        }
                        //  fixedSectionBeadingTopHung = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((2) * (InputValues[index].fixedTopHungs))) / (i.length) * InputValues[index].qty)
                        // End of FixedSectionBeading Calculation 
                        console.log('::BD::', TOTAL_SASH_TOPHungs, TOTAL_FRAME_TOP_HUNGS, ((((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) / (i.length) * InputValues[index].qty) * 2))
                        estQty = (InputValues[index].slidingTopHungs > 0 ? TOTAL_SASH_TOPHungs : (TOTAL_FRAME_TOP_HUNGS + ((((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) / (i.length) * InputValues[index].qty) * 2)))
                        estQty = (TOTAL_SASH_TOPHungs === 0 && TOTAL_FRAME_TOP_HUNGS === 0) ? 0 : estQty
                        rate = i.upvcrate

                        if (estQty === undefined) {
                          estQty = 0
                        }
                        value = estQty * rate

                        totalOfCoastingArray[72] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[72] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                    })

                    // Mullion for fixed top hung
                    if (i.id === 3571) {
                      InputValues.forEach((data, index) => {
                        if (i.id === InputValues[index].topPType.Mullian) {
                          const pQTH = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) / (i.length) * InputValues[index].qty)
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty = estQty + 0
                          } if (InputValues[index].fixedTopHungs > 0) {
                            estQty += pQTH
                          } else if (InputValues[index].slidingTopHungs > 0) {
                            estQty = estQty + 0
                          }
                          rate = i.upvcrate
                          if (estQty === undefined) {
                            estQty = 0
                          }
                          value = estQty * rate

                          totalOfCoastingArray[73] = value
                          pdfArray = {
                            costing_item_type: "COSTING",
                            coasting_item_id: i.id,
                            costing_Qty: estQty,
                            costing_rate: rate,
                            costing_value: value
                          }
                          pdfDataRow.push(pdfArray)
                          topHungItemsQuauntityArray[73] = estQty
                          costingItemArray[73] = pdfArray
                          localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                        }
                      })
                    }
                    // 3528 Gisket, same as sash Top HUNG FIXED
                    // if (i.id === 3528) {

                    //   estQty = InputValues[0]?.profileType === "4" || InputValues[0]?.profileType === "6" || InputValues[0]?.profileType === "7" ? 0 : (InputValues[0].slidingTopHungs > 0 ? TOTAL_FRAME_TOP_HUNGS : (TOTAL_FRAME_TOP_HUNGS) + (TOTAL_SASH_TOPHungs * 2) + (TOTAL_MULLION_TOPHUNGS * 2)) * (i.length)

                    //   rate = i.upvcrate

                    //   if (estQty === undefined) {
                    //     estQty = 0
                    //   }
                    //   value = estQty * rate

                    // totalOfCoastingArray[sdfsdfsdfsdfsdf] = value
                    //   pdfArray = {
                    //     costing_item_type: "COSTING",
                    //     coasting_item_id: i.id,
                    //     costing_Qty: estQty,
                    //     costing_rate: rate,
                    //     costing_value: value
                    //   }
                    //   pdfDataRow.push(pdfArray)
                    //   localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    // }

                    // SILICON, For Top Hung
                    if (i.id === 3530) {
                      InputValues.forEach((data, index) => {
                        let pQ = 0

                        pQ = (((((InputValues[index].width) * (InputValues[index].heightTopHung)) / 92900)) * InputValues[index].qty)
                        estQty = Math.ceil(pQ)
                        rate = i.upvcrate
                      })

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[74] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[74] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Mullion Steel for fixed top hung
                    if (i.id === 3514) {
                      InputValues.forEach((data, index) => {
                        const pQTH = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) * InputValues[index].qty)
                        if ((InputValues[index].fixedTopHungs > 0 || InputValues[index].openableTopHungs > 0)) {
                          estQty += pQTH
                        } else if (InputValues[index].slidingTopHungs > 0) {
                          estQty = estQty + 0
                        }
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        estQty = (estQty / 8)
                        value = estQty * rate

                        totalOfCoastingArray[75] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[75] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      })
                    }

                    // TOP HUNGS Interlock
                    InputValues.forEach((data, index) => {
                      if (i.id === InputValues[index].topPType.InterLock) {

                        const pQTH = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].slidingTopHungs === 1 ? 2 : (InputValues[index].slidingTopHungs === 2 ? 2 : 4))))) / (i.length) * InputValues[index].qty)
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty = estQty + 0
                        } if (InputValues[index].fixedTopHungs > 0) {
                          estQty = estQty + 0
                        } else if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQTH
                        }
                        rate = i.upvcrate
                        if (estQty === undefined) {
                          estQty = 0
                        }
                        TOTAL_INTERLOCK_TOPHUNGS = estQty
                        value = estQty * rate

                        totalOfCoastingArray[76] = value
                        pdfArray = {
                          costing_item_type: "COSTING",
                          coasting_item_id: i.id,
                          costing_Qty: estQty,
                          costing_rate: rate,
                          costing_value: value
                        }
                        pdfDataRow.push(pdfArray)
                        costingItemArray[76] = pdfArray
                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                      }
                    })
                  }
                  return (
                    <>

                      <tr style={{
                        display: value === 0 ? 'none' : ''
                      }}>
                        <th style={{
                          width: 20
                        }} className="text-center">{i.id}</th>
                        <td >{i.name}</td>
                        <td className="text-right">{Number(estQty).toFixed(2)}</td>
                        <td className="text-right">{Cookies.get('role') === 'ADMIN' ? rate : ''}</td>
                        <td className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round(value.toFixed(2))) : ''}</td>
                      </tr>
                    </>
                  )
                })}

              {/*  TOP HUNGS CONDITIONS for HARDWARE ITEMS*/}

              {
                data.map((i, x) => {
                  let estQty = 0
                  let rate = 0
                  value = 0

                  //Sliding Condtion for TOP HUNG
                  if (InputValues[0].slidingTopHungs > 0) {

                    // Multililocks for Sliding TopHungs
                    // ML 400
                    if (i.id === 3445) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[251] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[251] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 600
                    if (i.id === 3446) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[252] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[252] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 800
                    if (i.id === 3447) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[253] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[253] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 1000
                    if (i.id === 3448) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[254] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[254] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 1400
                    if (i.id === 3449) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[255] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[255] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 1600
                    if (i.id === 3450) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[256] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[256] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 1800
                    if (i.id === 3451) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[257] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[257] = pdfArray // from 53
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 1200
                    if (i.id === 3452) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[258] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[258] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 2000
                    if (i.id === 3453) {
                      const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[259] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[259] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    //TOP HUNG Buffer 
                    if (i.id === 3454) {

                      InputValues.forEach((data, index) => {
                        const pQ = 4 // ((((InputValues[index].width / 304.8)  * 2)  + ((InputValues[index].height / 304.8) * 2)) / ((InputValues[index].profileType === "6" ||  InputValues[index].profileType === "7") ? 20 : 19) * 19 * InputValues[index].qty)
                        if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQ
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[77] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[77] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // Frame Steel
                    if (i.id === 3441) {
                      estQty = ((TOTAL_FRAME_TOP_HUNGS * (i.length)) / 8)
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[78] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[78] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    if (i.id === 3442) {
                      estQty = estQty + ((TOTAL_SASH_TOPHungs * (i.length)) / 8)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[79] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[79] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    if (i.id === 3443) {
                      estQty = (((FLY_MESH_TOPHUNGS * (i.length)) / 8) / 2)
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[80] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[80] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Interlock Brush
                    if (i.id === 3444) {
                      InputValues.forEach((data, index) => {
                        const pQ = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty = estQty + 0
                        } else {
                          estQty = TOTAL_INTERLOCK_TOPHUNGS * 19
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[212] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[212] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Jali Brush
                    if (i.id === 3513) {

                      InputValues.forEach((data, index) => {
                        const pQ = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty = estQty + 0
                        } else {
                          estQty = (TOTAL_INTERLOCK_TOPHUNGS * (i.length)) / 2
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[213] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[213] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Large Moon Lock with Strip
                    if (i.id === 3413) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 1) * InputValues[index].qty
                        if (InputValues[index].multiLockingSystem === "Yes") {
                          estQty = estQty + 0
                        } else {
                          if (InputValues[index].slidingTopHungs > 0) {
                            if ((InputValues[index].heightTopHung / 304.8) > 3) {
                              estQty += pQ
                            }
                          }
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[81] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[81] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 3528 Gisket, same as sash Top HUNG
                    if (i.id === 3528) {
                      estQty = TOTAL_SASH_TOPHungs * (i.length)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      estQty = (InputValues[0]?.profileType === "4" || InputValues[0]?.profileType === "6") ? 0 : estQty
                      value = estQty * rate

                      totalOfCoastingArray[82] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[82] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 3529 Sash Brush 6x6 ... C Type .. TOP HUNG
                    if (i.id === 3529) {
                      InputValues.forEach((data, index) => {
                        let pQ = 0
                        // Start Calculation for sash
                        let CountNumberOfPanelsForSashWidth = 0
                        if (InputValues[index].customFirstTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFirstTop?.customPanelWidth)
                        }
                        if (InputValues[index].customSecondTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customSecondTop?.customPanelWidth)
                        }
                        if (InputValues[index].customThirdTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customThirdTop?.customPanelWidth)
                        }
                        if (InputValues[index].customFourthTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidth += Number(InputValues[index].customFourthTop?.customPanelWidth)
                        }
                        pQ = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * InputValues[index].slidingPanels)) * InputValues[index].qty)
                        // End of Sash Calculation  

                        let pQTHFix = 0
                        // Start Calculation for sash
                        let CountNumberOfPanelsForSashWidthFixTH = 0
                        if (InputValues[index].customFirstTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidthFixTH += Number(InputValues[index].customFirstTop?.customPanelWidth)
                        }
                        if (InputValues[index].customSecondTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidthFixTH += Number(InputValues[index].customSecondTop?.customPanelWidth)
                        }
                        if (InputValues[index].customThirdTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidthFixTH += Number(InputValues[index].customThirdTop?.customPanelWidth)
                        }
                        if (InputValues[index].customFourthTop?.Type === "Sliding") {
                          CountNumberOfPanelsForSashWidthFixTH += Number(InputValues[index].customFourthTop?.customPanelWidth)
                        }
                        pQTHFix = (((((CountNumberOfPanelsForSashWidthFixTH / 304.8) * 2)) * InputValues[index].fixedTopHungs) * InputValues[index].qty)
                        // End of Sash Calculation 
                        pQ *= 2
                        pQTHFix *= 2
                        estQty = (pQ + pQTHFix)

                        rate = i.upvcrate
                      })
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[83] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[83] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }
                    // 3530 Fiber Mesh, same was as sash TOP HUNG
                    if (i.id === 3530) {
                      InputValues.forEach((data, index) => {
                        let pQ = 0
                        pQ = (((((InputValues[index].width) * (InputValues[index].heightTopHung)) / 92900) / 2) * InputValues[index].qty)
                        estQty = pQ

                        rate = i.upvcrate
                      })

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[84] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[84] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // 3531 Gisket, Same as Sash Steel
                    if (i.id === 3531) {
                      estQty = (TOTAL_SASH / 2)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[85] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[85] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 3531 Gisket, Same as Sash Steel TOP HUNG
                    if (i.id === 3531) {
                      estQty = (TOTAL_SASH_TOPHungs / 2)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[86] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[86] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // 3532 Jali Wheel Top Hung
                    if (i.id === 3532) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQ
                        }
                      })
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[210] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[210] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // V cut Pully Single Wheel
                    if (i.id === 3533) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          if ((InputValues[index].width / 304.8) < 3) {
                            estQty += pQ
                          }
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[87] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[87] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // V cut Pully Double Wheel
                    if (i.id === 3534) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          if ((InputValues[index].width / 304.8) > 3) {
                            estQty += pQ
                          }
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[88] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[88] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Block ... TopHung
                    if (i.id === 3427) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          if (InputValues[index].multiLockingSystem === "Yes") {
                            if (InputValues[index].slidingTopHungs > 0) {
                              estQty += pQ
                            }
                          } else {
                            estQty = estQty + 0
                          }
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[34] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[34] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // dummy wheel
                    if (i.id === 3415) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].fixedTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQ
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[89] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[89] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // stopper
                    if (i.id === 3416) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          if (InputValues[index].multiLockingSystem === "No") {
                            estQty += pQ
                          } else {
                            estQty = estQty + 0
                          }
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[90] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[90] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // track
                    if (i.id === 3417) {

                      InputValues.forEach((data, index) => {
                        let CountNumberOfPanelsForFlyMeshWidth = 0
                        if (InputValues[index].cFirstPanel?.Type === "Sliding" || InputValues[index].cFirstPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cFirstPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cSecondPanel?.Type === "Sliding" || InputValues[index].cFirstPanel?.Type === "Fixed") {
                          CountNumberOfPanelsForFlyMeshWidth += Number(InputValues[index].cSecondPanel?.customPanelWidth)
                        }
                        if (InputValues[index].cThirdPanel?.Type === "Sliding" || InputValues[index].cFirstPanel?.Type === "Fixed") {

                          if (InputValues[index].cThirdPanel?.customPanelWidth === undefined) {
                            CountNumberOfPanelsForFlyMeshWidth += 0
                          }
                        }
                        if (InputValues[index].cFourthPanel?.Type === "Sliding" || InputValues[index].cFirstPanel?.Type === "Fixed") {
                          if (InputValues[index].cFourthPanel?.customPanelWidth === undefined) {
                            CountNumberOfPanelsForFlyMeshWidth += 0
                          }
                        }
                        const pQ = ((CountNumberOfPanelsForFlyMeshWidth / 304.8) / 16) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs > 0) {
                          estQty += pQ
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[91] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[91] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Stay Bar
                    if (i.id === 3418) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].openableTopHungs) * InputValues[index].qty
                        if (InputValues[index].openableTopHungs > 0) {
                          if (InputValues[index].slidingTopHungs > 0) {
                            estQty += pQ
                          }
                        } else {
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[92] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[92] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // sliding handle
                    if (i.id === 3423) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].slidingTopHungs * 1) * InputValues[index].qty
                        if (InputValues[index].multiLockingSystem === "No") {
                          estQty = estQty + 0
                        } else {
                          if (InputValues[index].slidingTopHungs > 0) {
                            estQty += pQ
                          }
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[103] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[103] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }
                  }
                  return (
                    <>
                      <tr style={{
                        display: value === 0 ? 'none' : ''
                      }}>
                        <th style={{
                          width: 20
                        }} className="text-center">{i.id}</th>
                        <td style={{
                          width: 50
                        }}>{i.name}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Number(estQty).toFixed(2)}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Cookies.get('role') === 'ADMIN' ? rate : ''}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round(value.toFixed(2))) : ''}</td>
                      </tr>
                    </>
                  )
                })}

              {/* // OPENABLE TOP HUNGS */}
              {
                data.map((i, x) => {
                  let estQty = 0
                  let rate = 0
                  value = 0

                  // Screw 3/4 x 8 Dialing for all - Openable, Sliding and Fixed TopHungs
                  if (i.id === 3602) {

                    InputValues.forEach((data, index) => {
                      const pQSliding = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (4 * InputValues[index].slidingTopHungs) : (3 * InputValues[index].slidingTopHungs)) * InputValues[index].qty * 10
                      const pQOpenable = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (4 * InputValues[index].openableTopHungs) : (3 * InputValues[index].openableTopHungs)) * InputValues[index].qty * 10
                      const pQFixed = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (4 * InputValues[index].fixedTopHungs) : (3 * InputValues[index].fixedTopHungs)) * InputValues[index].qty * 10
                      if (InputValues[index].openableTopHungs > 0) {
                        estQty += pQOpenable
                      } else if (InputValues[index].slidingTopHungs > 0) {
                        estQty += pQSliding
                      } else {
                        estQty = estQty + 0
                      }
                    })

                    rate = i.upvcrate
                    if (estQty === undefined) {
                      estQty = 0
                    }
                    value = estQty * rate

                    totalOfCoastingArray[230] = value
                    pdfArray = {
                      costing_item_type: "COSTING",
                      coasting_item_id: i.id,
                      costing_Qty: estQty,
                      costing_rate: rate,
                      costing_value: value
                    }
                    pdfDataRow.push(pdfArray)
                    costingItemArray[230] = pdfArray
                    localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                  }

                  // Hole Cape for Openable, Sliding and Fixed TopHungs
                  if (i.id === 3605) {
                    InputValues.forEach((data, index) => {
                      // In (3 * 2) the 3 is the number of cap in 1 height
                      const heightCap = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                      const widthCap = ((InputValues[index].width / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty

                      if (InputValues[index].totalTopHungs > 0) {
                        estQty = estQty + (heightCap + widthCap)
                      } else {
                        estQty = estQty + 0
                      }
                    })
                    rate = i.upvcrate

                    if (estQty === undefined) {
                      estQty = 0
                    }
                    value = estQty * rate

                    totalOfCoastingArray[231] = value
                    pdfArray = {
                      costing_item_type: "COSTING",
                      coasting_item_id: i.id,
                      costing_Qty: estQty,
                      costing_rate: rate,
                      costing_value: value
                    }
                    pdfDataRow.push(pdfArray)
                    costingItemArray[231] = pdfArray
                    localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                  }
                  // Screw Fittng for Openable, Sliding and Fixed TopHungs
                  if (i.id === 3598) {
                    InputValues.forEach((data, index) => {
                      // In (3 * 2) the 3 is the number of cap in 1 height
                      const heightCap = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                      const widthCap = ((InputValues[index].width / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty

                      if (InputValues[index].totalTopHungs > 0) {
                        estQty = estQty + (heightCap + widthCap)
                      } else {
                        estQty = estQty + 0
                      }
                    })
                    rate = i.upvcrate

                    if (estQty === undefined) {
                      estQty = 0
                    }
                    value = estQty * rate

                    totalOfCoastingArray[361] = value
                    pdfArray = {
                      costing_item_type: "COSTING",
                      coasting_item_id: i.id,
                      costing_Qty: estQty,
                      costing_rate: rate,
                      costing_value: value
                    }
                    pdfDataRow.push(pdfArray)
                    costingItemArray[361] = pdfArray
                    localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                  }

                  if (InputValues?.[0]?.openableTopHungs > 0 || InputValues?.[0]?.fixedTopHungs > 0
                    || InputValues?.[1]?.openableTopHungs > 0 || InputValues?.[1]?.fixedTopHungs > 0
                    || InputValues?.[2]?.openableTopHungs > 0 || InputValues?.[2]?.fixedTopHungs > 0
                    || InputValues?.[3]?.openableTopHungs > 0 || InputValues?.[3]?.fixedTopHungs > 0
                    || InputValues?.[4]?.openableTopHungs > 0 || InputValues?.[4]?.fixedTopHungs > 0
                    || InputValues?.[5]?.openableTopHungs > 0 || InputValues?.[5]?.fixedTopHungs > 0
                    || InputValues?.[6]?.openableTopHungs > 0 || InputValues?.[6]?.fixedTopHungs > 0
                    || InputValues?.[7]?.openableTopHungs > 0 || InputValues?.[7]?.fixedTopHungs > 0
                    || InputValues?.[8]?.openableTopHungs > 0 || InputValues?.[8]?.fixedTopHungs > 0
                    || InputValues?.[9]?.openableTopHungs > 0 || InputValues?.[9]?.fixedTopHungs > 0
                    || InputValues?.[10]?.openableTopHungs > 0 || InputValues?.[10]?.fixedTopHungs > 0) {

                    //No sliding

                    // Multililocks for Openable TopHungs
                    // ML 400
                    if (i.id === 3688) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[241] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[241] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // ML 600
                    if (i.id === 3689) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[242] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[242] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 800
                    if (i.id === 3690) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[243] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[243] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 1000
                    if (i.id === 3691) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[244] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[244] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 1400
                    if (i.id === 3693) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[245] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[245] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 1600
                    if (i.id === 3694) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[246] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[246] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 1800
                    if (i.id === 3695) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[247] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[247] = pdfArray // from 53
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 1200
                    if (i.id === 3692) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[248] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[248] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // ML 2000
                    if (i.id === 3696) {
                      const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                      estQty = res.estQty
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[249] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[249] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }

                    // mullion connector for Openable top hung
                    if (i.id === 3428) {
                      InputValues.forEach((data, index) => {
                        const pQ = ((InputValues[index].openableTopHungs) * (InputValues[index].mullion.numberOfMullians * 2)) * InputValues[index].qty
                        if (InputValues[index].mullion.type === 'No') {
                          if (InputValues[index].totalTopHungs > 0) {
                            estQty = estQty + ((InputValues[index].totalTopHungs - 1) * 2)
                          }
                        } else {
                          estQty = estQty + pQ + ((InputValues[index].totalTopHungs - 1) * 2)
                        }

                      })

                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[93] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[93] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 3528 Gisket, same as sash Top HUNG for openable
                    if (i.id === 3528) {
                      estQty = TOTAL_SASH_TOPHungs * (i.length)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      estQty = (InputValues[0]?.profileType === "4" || InputValues[0]?.profileType === "6") ? 0 : estQty
                      value = estQty * rate

                      totalOfCoastingArray[95] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[95] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                    }
                    // Jali
                    if (i.id === 3420) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].totalTopHungs) * InputValues[index].qty
                        if (InputValues[index].totalTopHungs > 0) {
                          estQty = estQty + 0
                        } else {
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty += pQ
                          }
                        }
                      })

                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[96] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[96] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // steel openable Top Hung
                    if (i.id === 3441) {
                      estQty = ((TOTAL_FRAME_TOP_HUNGS * (i.length)) / 8)
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[78] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[78] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Sash Steel
                    if (i.id === 3442) {
                      estQty = estQty + ((TOTAL_SASH_TOPHungs * (i.length)) / 8)
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[98] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[98] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // Screen Sash Steel
                    if (i.id === 3443) {
                      estQty = (((FLY_MESH_TOPHUNGS * (i.length)) / 8) / 2)

                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[99] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[99] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }
                    // Interlock Brush
                    if (i.id === 3444) {
                      InputValues.forEach((data, index) => {
                        const pQ = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty = estQty + 0
                        } else {
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty += pQ
                          }
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[100] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[100] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 
                    if (i.id === 3418) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].openableTopHungs) * InputValues[index].qty
                        if (InputValues[index].openableTopHungs > 0) {
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty += pQ
                          }
                        } else {
                          estQty = estQty + 0
                        }

                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[101] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[101] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 
                    if (i.id === 3419) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].totalTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].slidingTopHungs <= 0) {
                          estQty = estQty + 0
                        } else {
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty += pQ
                          }
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[102] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[102] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 
                    if (i.id === 3423) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].openableTopHungs) * InputValues[index].qty
                        if (InputValues[index].multiLockingSystem === "No") {
                          if (InputValues[index].openableTopHungs > 0) {
                            estQty = estQty + 0
                          }
                        } else {
                          estQty += pQ
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[103] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[103] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // TOP HUNG
                    if (i.id === 342555) {

                      InputValues.forEach((data, index) => {
                        const pQ = ((((InputValues[index].width) * (InputValues[index].heightTopHung) / 92900)) * InputValues[index].qty)
                        estQty = Number(estQty) + Number(pQ)
                      })
                      estQty = estQty / 30
                      estQty = Math.ceil(estQty)
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[104] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[104] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // frictional Hings
                    if (i.id === 3419) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].openableTopHungs * 2) * InputValues[index].qty
                        if (InputValues[index].openableTopHungs > 0) {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[105] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[105] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 24
                    if (i.id === 3429999) {
                      InputValues.forEach((data, index) => {
                        const pQ = 1 //((Number(InputValues[index].totalTopHungs) - 1) * 2) * InputValues[index].qty
                        if (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR") {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate
                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[106] = value

                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[106] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }

                    // 25
                    if (i.id === 3430) {
                      InputValues.forEach((data, index) => {
                        const pQ = (InputValues[index].totalTopHungs * 1) * InputValues[index].qty
                        if (InputValues[index].windowType === "DDOOR") {
                          estQty += pQ
                        } else {
                          estQty = estQty + 0
                        }
                      })
                      rate = i.upvcrate

                      if (estQty === undefined) {
                        estQty = 0
                      }
                      value = estQty * rate

                      totalOfCoastingArray[107] = value
                      pdfArray = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: estQty,
                        costing_rate: rate,
                        costing_value: value
                      }
                      pdfDataRow.push(pdfArray)
                      costingItemArray[107] = pdfArray
                      localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                    }
                  }

                  localStorage.setItem("divisionOfTotalCoastAddedCoast", ((Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft)) / totalSft).toFixed(2))
                  console.log('::::::::::::::', FullTotalOfCoasting)
                  return (
                    <>

                      <tr style={{
                        display: value === 0 ? 'none' : ''
                      }}>
                        <th style={{
                          width: 20
                        }} className="text-center">{i.id}</th>
                        <td style={{
                          width: 50
                        }} >{i.name}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Number(estQty).toFixed(2)}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Cookies.get('role') === 'ADMIN' ? rate : ''}</td>
                        <td style={{
                          width: 50
                        }} className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round(value.toFixed(2))) : ''}</td>
                      </tr>
                    </>
                  )
                })}

            </tbody>
          </Table>
        </div>)}
      <br />
      <hr />
      <Row className="invoice-spacing">
        <Col className="p-0 mt-xl-0 mt-2" lg="5" style={{ marginLeft: 20 }}>

          <table id="coastingIII">
            <tbody>
              <tr>
                <td className="pr-1">
                  <b>Total Of Coasting:</b>
                </td>
                <td>
                  {/* {((Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft)) / totalSft).toFixed(2) * totalSft.toFixed(2)} */}
                  {FullTotalOfCoasting.toFixed(2)}
                  {/* {(localStorage.getItem("divisionOfTotalCoastAddedCoast") * totalSft).toFixed(2)} */}

                </td>
              </tr>

              <tr>
                <td className="pr-1">
                  <b>Total Area:</b>
                </td>
                <td>
                  {/* {valueOfTotal} */}
                  {totalSft.toFixed(2)} Sqft
                </td>
              </tr>

              {/* <tr>
                <td className="pr-1">
                  {" "}
                  <b>Total Cost of Profile & Hardware:</b>
                </td>
                <td>
                  {FullTotalOfCoasting}
                </td>
              </tr> */}
              <tr>
                <td className="pr-1">
                  {" "}
                  <b>Add: Waistage %:</b>
                </td>
                <td>

                  <input
                    required
                    onFocus={(e) => e.target.select()}
                    type="number"
                    name="add-waistage"
                    id="width"
                    value={addWaistage}
                    className="form-control"
                    placeholder="Add Waisage"
                    onChange={(event) => {
                      setAddWaistage(event.target.value)
                    }}
                  />
                  <p style={{ border: '1px solid gray', borderRadius: 20, display: stylee, width: '85%', padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Add Waistage in %</p>
                </td>

                <td>
                  <td className="pr-1">
                    {" "}
                    {/* <b>{((FullTotalOfCoasting * addWaistage) / 100).toFixed(2)}</b>{" "} */}

                  </td>
                </td>
              </tr>
              <tr>
                <td className="pr-1">
                  {" "}
                  <b>Add: Factory Overhead</b>{" "}
                </td>
                <td>
                  <input

                    onFocus={(e) => e.target.select()}
                    type="number"
                    name="add-factory=overhead"
                    id="width"
                    value={AddFactoryOverHead}
                    className="form-control"
                    placeholder="Add Factory OverHead"
                    onChange={(event) => {
                      setFactoryOverHead(event.target.value)

                    }}
                  />
                  <p style={{ border: '1px solid gray', borderRadius: 20, display: style2, width: '90%', padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Add Factory OverHead in %</p>
                </td>
                <td className="pr-1">
                  {" "}
                  {/* <b>{(((parseInt(FullTotalOfCoasting, 10) + ((FullTotalOfCoasting * addWaistage) / 100)) * AddFactoryOverHead) / 100).toFixed(2)}</b>{" "} */}
                </td>

              </tr>

              <tr>
                {/* <td className="pr-1">
                  <b>Total Cost of Material  Including Overhead & Waistage</b>
                </td> 
                 <td>
                  {" "}
                  <span className="font-weight-bolder">{totalCoastMaterial}</span>
                </td> */}
              </tr>
              <tr>
                <td className="pr-1">
                  <b>Add: Profit </b>
                </td>
                <td>
                  {" "}
                  <input
                    onFocus={(e) => e.target.select()}
                    type="number"
                    name="width"
                    id="width"
                    value={addProfit}
                    className="form-control"
                    placeholder="Add Profit"
                    onChange={(event) => {
                      setAddProfit(event.target.value)

                    }}
                  />
                  <p style={{ border: '1px solid gray', borderRadius: 20, display: style3, width: '90%', padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Enter Profile!</p>
                </td>
                <td className="pr-1">
                  {" "}
                  {/* <b>{totalProfit}</b>{" "} */}
                </td>
              </tr>
              <tr>
                <td className="pr-1">
                  <b>Total Cost Of Project</b>
                </td>

                <td className="pr-1">
                  {" "}
                  <b>{(Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft)).toFixed(2)}</b>{" "}
                </td>
              </tr>

              <tr>
                <td className="pr-1">
                  <b>Per Sqft Price:</b>
                </td>

                <td className="pr-1">
                  <b> {((Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft)) / totalSft).toFixed(2)}</b>
                </td>
              </tr>

            </tbody>
          </table>
        </Col>

        <Col className="p-0 mt-xl-0 mt-2" lg="6" style={{ marginLeft: 20 }}>

          <table id="coastingIIII">
            <tbody>
              {/* Moved content above */}
            </tbody>
          </table>
        </Col>
      </Row>
      <br />
      <TopProgressBar />
      <hr />
      <Card>
        {" "}
        <CardBody className="invoice-padding pt-0">
          <Row>
            <Col sm="8">
              <br />
              <h4>Terms & Conditions</h4>
              <p>
                <textarea className="form-control" value={TermAndCon} onChange={(e) => setTermAndCon(e.target.value)} />
              </p>

              <h4>Terms of Payment:</h4>
              <p>
                <textarea className="form-control" value={TermOfPay} onChange={(e) => setTermOfPay(e.target.value)} />
              </p>
              <h4>Hardware & Accessories:</h4>
              <p>
                <textarea className="form-control" value={TermOfHardAndAccess} rows={6} onChange={(e) => setTermOfHardAndAccess(e.target.value)} />
              </p>
              <h4>ASSURING YOU OUR BEST ATTENTION, SERVICE AND COOPERATION</h4>
            </Col>
            <Col sm="4">
              <br />
              <p>
                {" "}

              </p>
              <p>

              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}
export default Coasting

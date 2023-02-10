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

const CoastingOfEachWindow = () => {
    const history = useHistory()
    const ucs = useContext(upvcContext)
    const InputValues = JSON.parse(localStorage.getItem('InputAllDataBPC'))
    const [stylee, setStyle] = useState('none')
    const [style2, setStyle2] = useState('none')
    const [style3, setStyle3] = useState('none')
    const [refresh, setRefresh] = useState(0)
    const [FhingIndicator, setFhingIndicator] = useState()
    const [data, setData] = useState([])
    const [totalOfEachWindowArray, setTotalOfEachWindowArray] = useState([])
    const [addWaistage, setAddWaistage] = useState(0)
    const [AddFactoryOverHead, setFactoryOverHead] = useState(0)
    const [totalCoast, setTotalCoast] = useState('')
    const [addProfit, setAddProfit] = useState(0)
    const [addCoastOfProject, setAddCoastOfProject] = useState(0)
    const [Mullion, setMullion] = useState('YES')
    const [windowWiseItems, setWindowWiseItems] = useState([

        {
            eachWindow: [
                {
                    coasting_item_id: 3428,
                    costing_Qty: 0,
                    costing_item_type: "COSTING",
                    costing_rate: "100",
                    costing_value: 0,
                    count: 1,
                    label: "w4 - Mullion Connector",
                    length: "0",
                    width: 100
                }
            ]
        },
        {
            eachWindow: [{}]
        }
    ])
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
                    // setContactNo(response.data.client.contact_no)
                    // setAddress(response.data.client.address)
                    // setEmail(response.data.client.email)
                    // setCity(response.data.client.city)

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
    const totalInterlock = []
    const totalInterlockTopHungs = []

    const totalSash = []
    const totalSashTopHungs = []

    const totalFrame = []
    const totalFrameTopHungs = []

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
                totalFrame[index] = pQ
                totalFrameTopHungs[index] = pQTH
            }

        })

        TOTAL_FRAME = TOTAL_FRAME + estQty


        TOTAL_FRAME_TOP_HUNGS = TOTAL_FRAME_TOP_HUNGS + estQtyFramehTopHung

        // Frame Steel for sliding, Openable and Fix
        InputValues.forEach((data, index) => {

            if (i.id === 3441) {
                const pQ = (((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].height / 304.8) * 2)) / 8) * InputValues[index].qty)

                //  TopHung
                const pQTH = (((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].heightTopHung / 304.8) * 2)) / 8) * InputValues[index].qty)

                if (InputValues[index].totalNumberOfPanels > 0) {
                    // Code to store each Window Item
                    const eachItem = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: pQ,
                        costing_rate: i.upvcrate,
                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                        label: `${InputValues[index].label} - ${i.name}`,
                        label2: InputValues[index].label,
                        area: InputValues[index].totalSft,
                        count: Number(InputValues[index].qty),
                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                        width: 100
                    }
                    if (windowWiseItems[index] === undefined) {
                        windowWiseItems[index] = {
                            eachWindow: [{}]
                        }
                    }
                    windowWiseItems[index].eachWindow[58] = eachItem
                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                }

                if (InputValues[index].totalTopHungs > 0) {
                    // Code to store each Window Item
                    const eachItem2 = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: pQTH,
                        costing_rate: i.upvcrate,
                        costing_value: (pQTH / InputValues[index].qty) * i.upvcrate,
                        label: `${InputValues[index].label} - ${i.name}`,
                        label2: InputValues[index].label,
                        area: InputValues[index].totalSft,
                        count: Number(InputValues[index].qty),
                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                        width: 100
                    }
                    if (windowWiseItems[index] === undefined) {
                        windowWiseItems[index] = {
                            eachWindow: [{}]
                        }
                    }
                    windowWiseItems[index].eachWindow[78] = eachItem2
                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                }
            }

        })


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
                    totalSashTopHungs[index] = pQTH
                } else {
                    estQtySashTopHung = estQtySashTopHung + 0
                }
                TOTAL_SASH_TOPHungs = estQtySashTopHung + pQTH
            }
        })
        // TOP HUNG SASH Steel
        InputValues.forEach((data, index) => {
            if (i.id === 3442) {
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
                    // Code to store each Window Item
                    const eachItem = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: pQTH,
                        costing_rate: i.upvcrate,
                        costing_value: (pQTH / InputValues[index].qty) * i.upvcrate,
                        label: `${InputValues[index].label} - ${i.name}`,
                        label2: InputValues[index].label,
                        area: InputValues[index].totalSft,
                        count: Number(InputValues[index].qty),
                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                        width: 100
                    }
                    if (windowWiseItems[index] === undefined) {
                        windowWiseItems[index] = {
                            eachWindow: [{}]
                        }
                    }
                    windowWiseItems[index].eachWindow[79] = eachItem
                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                } else {
                    estQtySashTopHung = estQtySashTopHung + 0
                }
            }
        })
        // TOP HUNG Gaskit
        InputValues.forEach((data, index) => {
            if (i.id === 3531) {
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
                    const pQTH = ((((((((SashForOPenableTopHung / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * ((Openable)))) / 2) / 2) / (i.length)) * InputValues[index].qty)
                    estQtySashTopHung = estQtySashTopHung + pQTH
                    // Code to store each Window Item
                    const eachItem = {
                        costing_item_type: "COSTING",
                        coasting_item_id: i.id,
                        costing_Qty: pQTH,
                        costing_rate: i.upvcrate,
                        costing_value: (pQTH / InputValues[index].qty) * i.upvcrate,
                        label: `${InputValues[index].label} - ${i.name}`,
                        label2: InputValues[index].label,
                        area: InputValues[index].totalSft,
                        count: Number(InputValues[index].qty),
                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                        width: 100
                    }
                    if (windowWiseItems[index] === undefined) {
                        windowWiseItems[index] = {
                            eachWindow: [{}]
                        }
                    }
                    windowWiseItems[index].eachWindow[85] = eachItem
                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                } else {
                    estQtySashTopHung = estQtySashTopHung + 0
                }
            }
        })
    })

    let totalSft = 0
    inputArray.map((a) => { totalSft = totalSft + parseFloat(a.totalSft, 10) })
    let FullTotalOfCoasting = 0
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
        ucs.setStateQuotI(false)
      }


    useEffect(() => {
        ucs.setStateCurrent(3)
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
    console.log('windowWiseItems::::::', windowWiseItems)

    // useEffect(() => {
    //     // const windowWiseItems = JSON.parse(localStorage.getItem('windowWiseItems'))
    //     windowWiseItems?.forEach((data, index) => {
    //         let totalOfEachWindow = 0
    //         data.eachWindow.forEach((dataIn, index) => {
    //             if (dataIn !== null) {
    //                 totalOfEachWindow += (Math.round((dataIn.costing_rate * ((dataIn.length * dataIn.count) / 304.8)).toFixed(2)))
    //             }
    //         })
    //         totalOfEachWindowArray[index] = totalOfEachWindow
    //     })
    //     localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
    // }, [windowWiseItems])
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Each Window / Door Coasting</CardTitle>
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
                            {
                                data.map((i, x) => {
                                    let estQty = 0
                                    let rate = 0
                                    value = 0

                                    if (i.subCategoryName === 'PROFILE') {

                                        // Openabalbe  door Panal (labari)    
                                        if (i.id === 3436) {
                                            const JustToCalQ = InputValues.map((data, index) => {
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
                                                const LamberiArea = (((InputValues[index].windowType === "FDDOOR" ? (CountNumberOfPanelsForSashWidth / 100) : (InputValues[index].width / 100)) * InputValues[index].sashHeight) / 1000) * InputValues[index].qty
                                                if (InputValues[index]?.numberOfOpenablePanels > 0) {

                                                    const pQ = ((InputValues[index]?.windowType === "DOOR" || InputValues[index]?.windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR") && InputValues[index].dividerForDoor === 1 ? LamberiArea : 0)
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[54] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            })

                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate

                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[54] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }

                                        // connector 60/60
                                        if (i.id === 3523) {

                                            InputValues.forEach((data, index) => {
                                                const pQ = ((InputValues[index].width) / 304.8) * InputValues[index].qty
                                                if (InputValues[index].profileType === '60' && InputValues[index].topProfileType === '60') {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[112] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[112] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // connector 70/70
                                        if (i.id === 3526) {
                                            InputValues.forEach((data, index) => {

                                                const pQ = ((InputValues[index].width) / 304.8) * InputValues[index].qty
                                                if (InputValues[index].profileType === '70' && InputValues[index].topProfileType === '70') {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[113] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[113] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // T Profile
                                        if (i.id === 3507) {
                                            InputValues.forEach((data, index) => {

                                                const pQ = ((InputValues[index].height) / 304.8) * InputValues[index].qty
                                                if (InputValues[index].slidingPanels > 0 && InputValues[index].totalNumberOfPanels === 4) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[115] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[115] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        //  Frame sliding, Openable and Fix ... below
                                        InputValues.forEach((data, index) => {
                                            if (i.id === InputValues[index]?.pType.Frame) {

                                                const pQ = ((((InputValues[index].width / 304.8) * 2) + ((InputValues[index].height / 304.8) * 2)) / (i.length) * InputValues[index].qty)
                                                if (InputValues[index]?.totalNumberOfPanels > 0) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[0] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                }
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }

                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQTH,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQTH * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[1] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else if (InputValues[index].slidingPanels > 0) {
                                                        estQty = estQty + 0
                                                    }
                                                    rate = i.upvcrate

                                                    if (estQty === undefined) {
                                                        estQty = 0
                                                    }
                                                    value = estQty * rate
                                                    TOTAL_MULLION = TOTAL_MULLION


                                                    FullTotalOfCoasting = FullTotalOfCoasting + value
                                                    pdfArray = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: estQty,
                                                        costing_rate: rate,
                                                        costing_value: value
                                                    }
                                                    pdfDataRow.push(pdfArray)
                                                    costingItemArray[1] = pdfArray
                                                    // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                }
                                            })
                                        }

                                        // Mullion Steel for fixed Window
                                        if (i.id === 3514) {
                                            InputValues.forEach((data, index) => {

                                                const pQTH = 0 // (((((InputValues[index].height / 304.8) * (InputValues[index].numberOfFixedPanels - 1)))) * InputValues[index].qty)
                                                if (InputValues[index].numberOfFixedPanels > 0) {
                                                    estQty += pQTH
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[2] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[2] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            })
                                        }
                                        // Fasle mullion
                                        if (i.id === 3440) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = ((InputValues[index].height / 304.8) / (i.length)) * InputValues[index].qty
                                                if (InputValues[index].windowType === "DDOOR") {

                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[3] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[3] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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

                                                estQty += pQ
                                                totalSash[index] = pQ
                                                TOTAL_SASH = TOTAL_SASH + pQ
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: specificSash,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[4] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            }

                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: specificSash,
                                                costing_Qty: TOTAL_SASH,
                                                costing_rate: rate,
                                                costing_value: rate * TOTAL_SASH
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[4] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[5] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                                FLY_MESH = FLY_MESH + estQty
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[5] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                        })

                                        // 3528 Gisket, same as sash
                                        if (i.id === 3528) {
                                            InputValues.forEach((data, index) => {

                                                if (i.id === 3528) {
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
                                                    pQ = (((((SashForOPenable / 304.8) * 2)) + ((InputValues[index].height / 304.8) * ((InputValues[index].numberOfOpenablePanels > 0 ? InputValues[index].numberOfOpenablePanels : InputValues[index].totalNumberOfPanels) * 2))) * InputValues[index].qty)
                                                    // End of Sash Calculation  
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[6] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            })

                                        }
                                        // Beading
                                        InputValues.forEach((data, index) => {

                                            if (i.id === (InputValues[index].beading === 'SG' ? InputValues[index].pType.Beading.SG : InputValues[index].pType?.beading?.DG)) {
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
                                                const Q = (InputValues[index].slidingPanels > 0 ? TOTAL_SASH : TOTAL_FRAME) + ((((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels - 1)))) / (i.length) * InputValues[index].qty) * 2) //(InputValues[index].numberOfFixedPanels > 0 ? fixedSectionBeading : 0) + ((dividerWidth * InputValues[index].divider) * 2))
                                                estQty = Q
                                                rate = i.upvcrate
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: Q,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (Q / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(Q / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[7] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[7] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                    totalInterlock[index] = pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[8] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                }

                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                TOTAL_INTERLOCK = estQty
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[8] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                    estQty += pQ + ((InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR" || InputValues[index].windowType === "FDDOOR") ? mullionForDoorPanel : 0)

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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[9] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                        })

                                        // Mullion Steel
                                        if (i.id === 3514) {
                                            InputValues.forEach((data, index) => {
                                                let MS = 0
                                                arrayForMUllianSteel.forEach((data, index) => {
                                                    MS += data
                                                })
                                                const pQTH = (MS) * (i.length)  // Mullion is 0 here, estQty has last value of 3514 for top hung  i think

                                                estQty = pQTH

                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[10] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            })
                                        }

                                        // ML 1800
                                        if (i.id === 3451) {
                                            const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[11] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })


                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[11] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[13] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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

                                    }
                                    // End of DOOR Condition

                                    if (i.subCategoryName === ' Hardware') {

                                        // Sliding condtion
                                        if (InputValues[0].slidingPanels > 0) {
                                            //Buffer
                                            if (i.id === 3454) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = 4 // ((((InputValues[index].width / 304.8)  * 2)  + ((InputValues[index].height / 304.8) * 2)) / ((InputValues[index].profileType === "6" ||  InputValues[index].profileType === "7") ? 20 : 19) * 19 * InputValues[index].qty)

                                                    if (InputValues[index].slidingPanels > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[17] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[17] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Frame steel
                                            if (i.id === 3441) {

                                                estQty = (TOTAL_FRAME * (i.length))

                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
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
                                                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                    }
                                                })
                                            }

                                            // 3 Screen Sash Steel
                                            InputValues.forEach((data, index) => {
                                                if (i.id === 3443) {

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
                                                    const pQ = ((((((((CountNumberOfPanelsForFlyMeshWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels * 2))) / 8)) * InputValues[index].qty))
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty = estQty + 0
                                                    } else {
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[19] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                }
                                            })
                                            //  Interlock Brush
                                            if (i.id === 3444) {

                                                InputValues.forEach((data, index) => {
                                                    let InterlockBrushRTC = 0
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty = estQty + 0
                                                    } else {
                                                        const ItLock = (((((InputValues[index].height / 304.8) * (InputValues[index].slidingPanels === 1 ? 2 : (InputValues[index].slidingPanels === 2 ? 2 : 4))))))
                                                        InterlockBrushRTC = InterlockBrushRTC + ItLock
                                                        estQty = estQty + InterlockBrushRTC
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: ItLock,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: ItLock * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(ItLock / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[20] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[20] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            //  Jali Brush
                                            if (i.id === 3513) {

                                                InputValues.forEach((data, index) => {
                                                    const pQ = (((((InputValues[index].height / 304.8) * (InputValues[index].totalNumberOfPanels * 2) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty = estQty + 0
                                                    } else {
                                                        estQty = (TOTAL_INTERLOCK * (i.length)) / 2
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: ((totalInterlock[index]) * (i.length / 2)),
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (((totalInterlock[index]) * (i.length / 2)) / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(((totalInterlock[index]) * (i.length / 2)) / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[21] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[21] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            //  Sliding Sash Adopter for 4PSL (2 fixed & 2 Sliding)
                                            if (i.id === 3701) {

                                                InputValues.forEach((data, index) => {
                                                    const pQ = (((((InputValues[index].height / 304.8)))) * InputValues[index].qty)
                                                    if (InputValues[index].slidingPanels === 2 && InputValues[index].numberOfFixedPanels === 2) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[364] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[364] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // Multilocks for Sliding windows
                                            // ML 400
                                            if (i.id === 3445) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[23] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[23] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 600
                                            if (i.id === 3446) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[11] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[24] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 800
                                            if (i.id === 3447) {

                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[25] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[25] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1200
                                            if (i.id === 3448) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[26] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[26] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1400
                                            if (i.id === 3449) {

                                                estQty = slidingMultilocksConditions(InputValues, i.id, estQty)

                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[27] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1600
                                            if (i.id === 3450) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[260] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[260] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // 3530 Fiber Mesh, same was as sash
                                            if (i.id === 3530) {
                                                InputValues.forEach((data, index) => {
                                                    let pQ = 0
                                                    pQ = ((((InputValues[index].width) * (InputValues[index].height) / 92900) / 2) * InputValues[index].qty)
                                                    estQty = pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[28] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    rate = i.upvcrate
                                                })
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[28] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                    pQ = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].height / 304.8) * InputValues[index].slidingPanels)) / (i.length) * InputValues[index].qty)
                                                    // End of Sash Calculation  

                                                    pQ = pQ * 2
                                                    estQty = pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[30] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                    rate = i.upvcrate
                                                })
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[30] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // 3532 Jali Wheel
                                            if (i.id === 3532) {

                                                InputValues.forEach((data, index) => {
                                                    const pQ = (InputValues[index].slidingPanels * 2) * InputValues[index].qty
                                                    if (InputValues[index].slidingPanels > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[31] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[31] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // V cut Pully Single Wheel
                                            if (i.id === 3533) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[32] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[32] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // V cut Pully Double Wheel
                                            if (i.id === 3534) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[33] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })


                                                rate = i.upvcrate


                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[33] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Block
                                            if (i.id === 3427) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[34] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[34] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Small Moon Lock with Strip
                                            if (i.id === 3535) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[35] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[35] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Large Moon Lock with Strip
                                            if (i.id === 3413) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[36] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[36] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // ML 1200
                                            if (i.id === 3452) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[37] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[37] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // ML 2000
                                            if (i.id === 3453) {
                                                const res = slidingMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[250] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[250] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Dummy Wheel
                                            if (i.id === 3415) {
                                                estQty = 0
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[38] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[38] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Stopper
                                            if (i.id === 3416) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[39] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[39] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Track
                                            if (i.id === 3417) {
                                                const res = slidingConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[40] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[40] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Stay Bar
                                            if (i.id === 3418) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        if (InputValues[index].slidingPanels > 0) {
                                                            estQty += pQ
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[41] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[41] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // silicon for all
                                            if (i.id === 3425) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = ((((InputValues[index].width) * (InputValues[index].height) / 92900)) * InputValues[index].qty)
                                                    estQty = Number(estQty) + Number(pQ)
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: Math.ceil(pQ / 30),
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (Math.ceil(pQ / 30) / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(Math.ceil(pQ / 30) / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[42] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                estQty = estQty / 30
                                                estQty = Math.ceil(estQty)
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[42] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[43] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                        }
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[43] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }
                                        }

                                        //No sliding, i.e Openable panels condition
                                        if (InputValues[0].numberOfOpenablePanels > 0 || InputValues[0].numberOfFixedPanels > 0) {
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
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[44] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[44] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Door Handle
                                            if (i.id === 3662) {
                                                InputValues.forEach((data, index) => {
                                                    const handleNo = InputValues[index].numberOfOpenablePanels + InputValues[index].mullion.numberOfMullians // (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cFourthPanel.Type === 'Openable') ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cThirdPanel.Type === 'Openable' ? 2 : (InputValues[index].cFirstPanel.Type === 'Openable' && InputValues[index].cSecondPanel.Type === 'Openable' ? 2 : 1))
                                                    const pQ = (handleNo) * InputValues[index].qty

                                                    if (InputValues[index].numberOfOpenablePanels > 0 && (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR")) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[45] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[45] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Screw 3/4 x 8 Dialing for Openable, Sliding and Fixed
                                            if (i.id === 3602) {

                                                InputValues.forEach((data, index) => {
                                                    const pQSliding = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].slidingPanels) : (3 * InputValues[index].slidingPanels)) * InputValues[index].qty * 10
                                                    const pQOpenable = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].numberOfOpenablePanels) : (3 * InputValues[index].numberOfOpenablePanels)) * InputValues[index].qty * 10
                                                    const pQFixed = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].numberOfFixedPanels) : (3 * InputValues[index].numberOfFixedPanels)) * InputValues[index].qty * 10
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty += pQOpenable
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQOpenable,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQOpenable * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQOpenable / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[46] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else if (InputValues[index].slidingPanels > 0) {
                                                        estQty += pQSliding
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQSliding,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQSliding * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQSliding / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[46] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[46] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Hole Cape for Openable, Sliding and Fixed
                                            if (i.id === 3605) {

                                                InputValues.forEach((data, index) => {
                                                    // In (4 * 2) the 3 is the number of cap in 1 height
                                                    const heightCap = ((InputValues[index].height / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                                                    const widthCap = ((InputValues[index].width / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty = estQty + (heightCap + widthCap)
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: (heightCap + widthCap),
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (heightCap + widthCap) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[199] = eachItem
                                                        
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else if (InputValues[index].slidingPanels > 0) {
                                                        estQty = estQty + (heightCap + widthCap)
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: (heightCap + widthCap),
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (heightCap + widthCap) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[199] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[199] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // Screw fitting for Openable, Sliding and Fixed
                                            if (i.id === 3598) {

                                                InputValues.forEach((data, index) => {
                                                    // In (4 * 2) the 3 is the number of cap in 1 height
                                                    const heightCap = ((InputValues[index].height / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                                                    const widthCap = ((InputValues[index].width / 304.8) >= 8 ? (4 * 2) : (3 * 2)) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty = estQty + (heightCap + widthCap)
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: (heightCap + widthCap),
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (heightCap + widthCap) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[360] = eachItem
                                                        
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else if (InputValues[index].slidingPanels > 0) {
                                                        estQty = estQty + (heightCap + widthCap)
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: (heightCap + widthCap),
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (heightCap + widthCap) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[360] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[199] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // Water Cape
                                            if (i.id === 3520) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = (InputValues[index].totalNumberOfPanels) * InputValues[index].qty
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[200] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[200] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }
                                            // Multililocks for Openable windows
                                            // ML 400
                                            if (i.id === 3688) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[47] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[47] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 600
                                            if (i.id === 3689) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[48] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[48] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 800
                                            if (i.id === 3690) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[49] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[49] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1000
                                            if (i.id === 3691) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[50] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[50] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1400
                                            if (i.id === 3693) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[51] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[51] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1600
                                            if (i.id === 3694) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[52] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[52] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1800
                                            if (i.id === 3695) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[11] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[11] = pdfArray // from 53
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 1200
                                            if (i.id === 3692) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[54] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[54] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                            // ML 2000
                                            if (i.id === 3696) {
                                                const res = openableMultilocksConditions(InputValues, i.id, estQty)
                                                estQty = res.estQty
                                                res.quantity.forEach((pQ, index) => {
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[55] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[55] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[57] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                        }
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[57] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }
                                            //

                                            // steel openable
                                            if (i.id === 3441) {
                                                estQty = (TOTAL_FRAME * (i.length))
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
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
                                                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                    }
                                                })
                                            }
                                            // Sash Steel
                                            InputValues.forEach((data, index) => {


                                                if (i.id === 3442) {
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
                                                    pQ = (((((SashForOPenable / 304.8) * 2)) + ((InputValues[index].height / 304.8) * ((InputValues[index].numberOfOpenablePanels > 0 ? InputValues[index].numberOfOpenablePanels : InputValues[index].totalNumberOfPanels) * 2))) / (8) * InputValues[index].qty)
                                                    // End of Sash Calculation  

                                                    estQty += pQ
                                                    totalSash[index] = pQ
                                                    TOTAL_SASH = TOTAL_SASH + pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[59] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                }

                                            })
                                            // Gsket
                                            InputValues.forEach((data, index) => {


                                                if (i.id === 3531) {
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
                                                    pQ = ((((((((SashForOPenable / 304.8) * 2)) + ((InputValues[index].height / 304.8) * ((InputValues[index].numberOfOpenablePanels > 0 ? InputValues[index].numberOfOpenablePanels : InputValues[index].totalNumberOfPanels) * 2))) / 2) / 2) / (i.length)) * InputValues[index].qty)
                                                    // End of Sash Calculation  

                                                    estQty += pQ

                                                    TOTAL_SASH = TOTAL_SASH + pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[85] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                }

                                            })


                                            // Screen Sash Steel
                                            if (i.id === 3443) {

                                                estQty = ((FLY_MESH * (i.length)) / 8)
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                // pdfDataRow.push(pdfArray)
                                                localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                // pdfDataRow.push(pdfArray)
                                                localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Stay bar 8"
                                            if (i.id === 3543) {

                                                InputValues.forEach((data, index) => {
                                                    // Start Calculation for sash
                                                    const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        if (Number(InputValues[index].cFirstPanel?.customPanelWidth) <= 12 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR" || InputValues[index].windowType !== "FDDOOR")) {
                                                            estQty += pQ
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[60] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[60] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[61] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                        }
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[61] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Stay bar 10"
                                            if (i.id === 3544) {
                                                InputValues.forEach((data, index) => {
                                                    // Start Calculation for sash

                                                    const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        if (Number(InputValues[index].cFirstPanel?.customPanelWidth) <= 15 && Number(InputValues[index].cFirstPanel?.customPanelWidth) >= 12 && (InputValues[index].windowType !== "DOOR" || InputValues[index].windowType !== "DDOOR" || InputValues[index].windowType !== "FDDOOR")) { // 15 18
                                                            estQty += pQ
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[62] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[62] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Stay bar 812"
                                            if (i.id === 3545) {
                                                InputValues.forEach((data, index) => {
                                                    // Start Calculation for sash
                                                    const pQ = (InputValues[index].numberOfOpenablePanels) * InputValues[index].qty
                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        if (Number(InputValues[index].cFirstPanel?.customPanelWidth) >= 18 && (InputValues[index].windowType !== "DOOR" && InputValues[index].windowType !== "DDOOR" && InputValues[index].windowType !== "FDDOOR")) {
                                                            estQty += pQ
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[63] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[63] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[43] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // silicon for Openable. Fixed
                                            if (i.id === 3425) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = (((((InputValues[index].width) * (InputValues[index].height)) / 92900)) * InputValues[index].qty)
                                                    if (InputValues[index].numberOfOpenablePanels > 0 || InputValues[index].numberOfFixedPanels > 0) {
                                                        estQty = Number(estQty) + Number(pQ)
                                                    }
                                                    estQty = estQty / 30
                                                    estQty = Math.ceil(estQty)
                                                    rate = i.upvcrate

                                                    if (estQty === undefined) {
                                                        estQty = 0
                                                    }
                                                    value = estQty * rate
                                                    FullTotalOfCoasting = FullTotalOfCoasting + value
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
                                                        localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                    }
                                                })
                                            }

                                            // Pincel / 2D Hinges
                                            if (i.id === 3426) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = ((InputValues[index].height / 304.8) >= 4 ? (4 * InputValues[index].numberOfOpenablePanels) : (3 * InputValues[index].numberOfOpenablePanels)) * InputValues[index].qty

                                                    if (InputValues[index].numberOfOpenablePanels > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[65] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }

                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[65] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // Door Lock
                                            if (i.id === 3429) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = 1//((Number(InputValues[index].totalNumberOfPanels) - 1) * 2) * InputValues[index].qty
                                                    if (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR") {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[66] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[66] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }

                                            // Tower Bolt
                                            if (i.id === 3430) {

                                                InputValues.forEach((data, index) => {
                                                    const pQ = (InputValues[index].totalNumberOfPanels * 1) * InputValues[index].qty
                                                    if (InputValues[index].windowType === "DDOOR") {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[67] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[67] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }

                                            // mullion connector for Openable
                                            if (i.id === 3428) {
                                                InputValues.forEach((data, index) => {
                                                    const pQ = ((InputValues[index].numberOfOpenablePanels) * (InputValues[index].mullion.numberOfMullians * 2)) * InputValues[index].qty
                                                    if (InputValues[index].mullion.type === 'No') {

                                                        const Q = (InputValues[index].slidingPanels > 0 ? 0 : (InputValues[index].totalNumberOfPanels - 1) * 2)
                                                        estQty = estQty + Q
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: Q,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: Q * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(Q / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[68] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        const QQ = pQ + (InputValues[index].slidingPanels > 0 ? 0 : (InputValues[index].totalNumberOfPanels - 1) * 2)
                                                        estQty = estQty + QQ

                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: QQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: QQ * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(QQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[68] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                })
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[68] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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

                                    }
                                })}

                            {/*  TOP HUNGS CONDITIONS*/}

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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[69] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[69] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[205] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    const q = estQty + pQ //+ ExtraMullion, commmented for topHung
                                                    estQty = q
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[205] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }

                                                if (InputValues[index].customSecondTop.Type === "Fixed" && InputValues[index].openableTopHungs === 2) {
                                                    dividerWidth = dividerWidth + (Number(InputValues[index].customSecondTop.customPanelWidth / 304.8) / (i.length))
                                                }
                                                estQty = estQty + (dividerWidth * InputValues[index].divider) // estQty is mullion
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: (dividerWidth * InputValues[index].divider),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (dividerWidth * InputValues[index].divider) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number((dividerWidth * InputValues[index].divider) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[205] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[205] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[70] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                                estQty = TOTAL_SASH_TOPHungs
                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[70] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[71] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }

                                                FLY_MESH_TOPHUNGS = FLY_MESH_TOPHUNGS + estQty

                                                rate = i.upvcrate

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[71] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                            }
                                        })

                                        // TOP HUNGS Beading
                                        InputValues.forEach((data, index) => {

                                            if (i.id === (InputValues[index].beading === 'SG' ? InputValues[index].topPType.Beading.SG : InputValues[index].topPType?.beading?.DG)) {
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

                                                const Q = (InputValues[index].slidingTopHungs > 0 ? TOTAL_SASH_TOPHungs : TOTAL_FRAME_TOP_HUNGS) + ((((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) / (i.length) * InputValues[index].qty) * 2)  // (InputValues[index].fixedTopHungs > 0 ? fixedSectionBeadingTopHung : 0)
                                                estQty = Q
                                                rate = i.upvcrate
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: Q,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (Q / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(Q / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[72] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[72] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQTH,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQTH * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[73] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else if (InputValues[index].slidingTopHungs > 0) {
                                                        estQty = estQty + 0
                                                    }
                                                    rate = i.upvcrate
                                                    if (estQty === undefined) {
                                                        estQty = 0
                                                    }
                                                    value = estQty * rate
                                                    FullTotalOfCoasting = FullTotalOfCoasting + value
                                                    pdfArray = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: estQty,
                                                        costing_rate: rate,
                                                        costing_value: value
                                                    }
                                                    pdfDataRow.push(pdfArray)
                                                    costingItemArray[73] = pdfArray
                                                    // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                        //   FullTotalOfCoasting = FullTotalOfCoasting + value
                                        //   pdfArray = {
                                        //     costing_item_type: "COSTING",
                                        //     coasting_item_id: i.id,
                                        //     costing_Qty: estQty,
                                        //     costing_rate: rate,
                                        //     costing_value: value
                                        //   }
                                        //   pdfDataRow.push(pdfArray)
                                          localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        // }

                                        // SILICON, For Top Hung
                                        if (i.id === 3530) {
                                            InputValues.forEach((data, index) => {
                                                let pQ = 0

                                                pQ = ((((InputValues[index].width) * (InputValues[index].heightTopHung) / 92900)) * InputValues[index].qty)
                                                estQty = Math.ceil(pQ)
                                                rate = i.upvcrate
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[74] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[74] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // Mullion Steel for fixed top hung
                                        if (i.id === 3514) {
                                            InputValues.forEach((data, index) => {
                                                const pQTH = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1)))) * InputValues[index].qty)
                                                if ((InputValues[index].fixedTopHungs > 0 || InputValues[index].openableTopHungs > 0)) {
                                                    estQty += pQTH
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[75] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty = estQty + 0
                                                }
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[75] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                    totalInterlockTopHungs[index] = pQTH
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[76] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                                rate = i.upvcrate
                                                if (estQty === undefined) {
                                                    estQty = 0
                                                }
                                                TOTAL_INTERLOCK_TOPHUNGS = estQty
                                                value = estQty * rate
                                                FullTotalOfCoasting = FullTotalOfCoasting + value
                                                pdfArray = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: estQty,
                                                    costing_rate: rate,
                                                    costing_value: value
                                                }
                                                pdfDataRow.push(pdfArray)
                                                costingItemArray[76] = pdfArray
                                                // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                            }
                                        })
                                    }
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
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[251] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[251] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 600
                                        if (i.id === 3446) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[252] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[252] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[254] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 1200
                                        if (i.id === 3448) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[254] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[254] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 1400
                                        if (i.id === 3449) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[255] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[255] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 1600
                                        if (i.id === 3450) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[256] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[256] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 1800
                                        if (i.id === 3451) {
                                            estQty = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[257] = pdfArray // from 53
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 1200
                                        if (i.id === 3452) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[258] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[258] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 2000
                                        if (i.id === 3453) {
                                            const res = topHungsSlidingMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[259] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[259] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        //TOP HUNG Buffer 
                                        if (i.id === 3454) {

                                            InputValues.forEach((data, index) => {
                                                const pQ = 4 // ((((InputValues[index].width / 304.8)  * 2)  + ((InputValues[index].height / 304.8) * 2)) / ((InputValues[index].profileType === "6" ||  InputValues[index].profileType === "7") ? 20 : 19) * 19 * InputValues[index].qty)
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[77] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[77] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }

                                        // Frame Steel
                                        if (i.id === 3441) {
                                            estQty = (TOTAL_FRAME_TOP_HUNGS * (i.length))
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[78] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        if (i.id === 3442) {
                                            estQty = estQty + (TOTAL_SASH_TOPHungs * (i.length))
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[79] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // TOP HUNG FlyMesh Steel
                                        InputValues.forEach((data, index) => {
                                            if (i.id === 3443) {

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
                                                const pQTH = ((((((CountNumberOfTopHungForFlyMeshWidth / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * (InputValues[index].slidingTopHungs * 2))) / 8) * InputValues[index].qty)    //       .....coastingLoopFunction(i.id, upvc, state, i.id)
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    estQty = estQty + 0
                                                } else if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty += pQTH
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[80] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            }
                                        })

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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[212] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // Jali Brush
                                        if (i.id === 3513) {

                                            InputValues.forEach((data, index) => {
                                                const pQ = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    estQty = estQty + 0
                                                } else {
                                                    estQty = (TOTAL_INTERLOCK_TOPHUNGS * (i.length)) / 2
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: ((totalInterlockTopHungs[index]) * (i.length / 2)),
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (((totalInterlockTopHungs[index]) * (i.length / 2)) / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(((totalInterlockTopHungs[index]) * (i.length / 2)) / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[213] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[213] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[81] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                        }
                                                    }
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[81] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 3528 Gisket, same as sash Top HUNG
                                        if (i.id === 3528) {
                                            InputValues.forEach((data, index) => {
                                                if (i.id === 3528) {
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQTH,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQTH * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[82] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }
                                                    estQty = TOTAL_SASH_TOPHungs
                                                    rate = i.upvcrate

                                                    if (estQty === undefined) {
                                                        estQty = 0
                                                    }
                                                    value = estQty * rate
                                                    FullTotalOfCoasting = FullTotalOfCoasting + value
                                                    pdfArray = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: estQty,
                                                        costing_rate: rate,
                                                        costing_value: value
                                                    }
                                                    pdfDataRow.push(pdfArray)
                                                    costingItemArray[70] = pdfArray
                                                    // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                }
                                            })
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
                                                pQ = (((((CountNumberOfPanelsForSashWidth / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * InputValues[index].slidingPanels)) / (i.length) * InputValues[index].qty)
                                                // End of Sash Calculation  
                                                pQ = pQ * 2
                                                estQty = pQ
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[83] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))

                                                rate = i.upvcrate
                                            })
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[83] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 3530 Fiber Mesh, same was as sash TOP HUNG
                                        if (i.id === 3530) {
                                            InputValues.forEach((data, index) => {
                                                let pQ = 0
                                                pQ = ((((InputValues[index].width) * (InputValues[index].heightTopHung) / 92900) / 2) * InputValues[index].qty)
                                                estQty = pQ
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[84] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                rate = i.upvcrate
                                            })

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[84] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }

                                        // 3532 Jali Wheel Top Hung
                                        if (i.id === 3532) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[210] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[210] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // V cut Pully Single Wheel
                                        if (i.id === 3533) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    if ((InputValues[index].width / 304.8) < 3) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[87] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[87] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // V cut Pully Double Wheel
                                        if (i.id === 3534) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    if ((InputValues[index].width / 304.8) > 3) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[88] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[88] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // Block ... TopHung
                                        if (i.id === 3427) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    if (InputValues[index].multiLockingSystem === "Yes") {
                                                        if (InputValues[index].slidingTopHungs > 0) {
                                                            estQty += pQ
                                                            // Code to store each Window Item
                                                            const eachItem = {
                                                                costing_item_type: "COSTING",
                                                                coasting_item_id: i.id,
                                                                costing_Qty: pQ,
                                                                costing_rate: i.upvcrate,
                                                                costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                                label: `${InputValues[index].label} - ${i.name}`,
                                                                label2: InputValues[index].label,
                                                                area: InputValues[index].totalSft,
                                                                count: Number(InputValues[index].qty),
                                                                length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                                width: 100
                                                            }
                                                            if (windowWiseItems[index] === undefined) {
                                                                windowWiseItems[index] = {
                                                                    eachWindow: [{}]
                                                                }
                                                            }
                                                            windowWiseItems[index].eachWindow[34] = eachItem
                                                            localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[34] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // dummy wheel
                                        if (i.id === 3415) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].fixedTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[89] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[89] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }

                                        // stopper
                                        if (i.id === 3416) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].slidingTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].slidingTopHungs > 0) {
                                                    if (InputValues[index].multiLockingSystem === "No") {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[90] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[90] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[91] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }

                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[91] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // Stay Bar
                                        if (i.id === 3418) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].openableTopHungs) * InputValues[index].qty
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    if (InputValues[index].slidingTopHungs > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[92] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[92] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[103] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[103] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }
                                    }


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
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQOpenable,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: pQOpenable * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQOpenable / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[230] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else if (InputValues[index].slidingTopHungs > 0) {
                                                estQty += pQSliding
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQSliding,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: pQSliding * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQSliding / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[230] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else {
                                                estQty = estQty + 0
                                            }
                                        })

                                        rate = i.upvcrate
                                        if (estQty === undefined) {
                                            estQty = 0
                                        }
                                        value = estQty * rate
                                        FullTotalOfCoasting = FullTotalOfCoasting + value
                                        pdfArray = {
                                            costing_item_type: "COSTING",
                                            coasting_item_id: i.id,
                                            costing_Qty: estQty,
                                            costing_rate: rate,
                                            costing_value: value
                                        }
                                        pdfDataRow.push(pdfArray)
                                        costingItemArray[230] = pdfArray
                                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                    }

                                    // Hole Cape (Achar Cape) for Openable, Sliding and Fixed TopHungs
                                    if (i.id === 3605) {
                                        InputValues.forEach((data, index) => {
                                            // In (3 * 2) the 3 is the number of cap in 1 height
                                            const heightCap = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                                            const widthCap = ((InputValues[index].width / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                                            if (InputValues[index].openableTopHungs > 0) {
                                                estQty = estQty + (heightCap + widthCap)
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: (heightCap + widthCap),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (heightCap + widthCap) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[231] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else if (InputValues[index].slidingTopHungs > 0) {
                                                estQty = estQty + (heightCap + widthCap)
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: (heightCap + widthCap),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (heightCap + widthCap) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[231] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else {
                                                estQty = estQty + 0
                                            }
                                        })
                                        rate = i.upvcrate

                                        if (estQty === undefined) {
                                            estQty = 0
                                        }
                                        value = estQty * rate
                                        FullTotalOfCoasting = FullTotalOfCoasting + value
                                        pdfArray = {
                                            costing_item_type: "COSTING",
                                            coasting_item_id: i.id,
                                            costing_Qty: estQty,
                                            costing_rate: rate,
                                            costing_value: value
                                        }
                                        pdfDataRow.push(pdfArray)
                                        costingItemArray[231] = pdfArray
                                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                    }
                                    // Screw fitting for Openable, Sliding and Fixed TopHungs
                                    if (i.id === 3598) {
                                        InputValues.forEach((data, index) => {
                                            // In (3 * 2) the 3 is the number of cap in 1 height
                                            const heightCap = ((InputValues[index].heightTopHung / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                                            const widthCap = ((InputValues[index].width / 304.8) >= 4 ? (3 * 2) : (2 * 2)) * InputValues[index].qty
                                            if (InputValues[index].openableTopHungs > 0) {
                                                estQty = estQty + (heightCap + widthCap)
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: (heightCap + widthCap),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (heightCap + widthCap) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[261] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else if (InputValues[index].slidingTopHungs > 0) {
                                                estQty = estQty + (heightCap + widthCap)
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: (heightCap + widthCap),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (heightCap + widthCap) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number((heightCap + widthCap) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[261] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            } else {
                                                estQty = estQty + 0
                                            }
                                        })
                                        rate = i.upvcrate

                                        if (estQty === undefined) {
                                            estQty = 0
                                        }
                                        value = estQty * rate
                                        FullTotalOfCoasting = FullTotalOfCoasting + value
                                        pdfArray = {
                                            costing_item_type: "COSTING",
                                            coasting_item_id: i.id,
                                            costing_Qty: estQty,
                                            costing_rate: rate,
                                            costing_value: value
                                        }
                                        pdfDataRow.push(pdfArray)
                                        costingItemArray[231] = pdfArray
                                        // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                    }

                                    if (InputValues[0].openableTopHungs > 0 || InputValues[0].fixedTopHungs > 0) {

                                        //No sliding

                                        // Multililocks for Openable TopHungs
                                        // ML 400
                                        if (i.id === 3688) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[241] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[241] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // ML 600
                                        if (i.id === 3689) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[242] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[242] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 800
                                        if (i.id === 3690) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[243] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })

                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[243] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 1200
                                        if (i.id === 3691) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[244] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[244] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 1400
                                        if (i.id === 3693) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[245] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[245] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 1600
                                        if (i.id === 3694) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[246] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[246] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 1800
                                        if (i.id === 3695) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[247] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[247] = pdfArray // from 53
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 1200
                                        if (i.id === 3692) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[248] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[248] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }
                                        // ML 2000
                                        if (i.id === 3696) {
                                            const res = topHungsOpenableMultilocks(InputValues, i.id, estQty)
                                            estQty = res.estQty
                                            res.quantity.forEach((pQ, index) => {
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: pQ,
                                                    costing_rate: i.upvcrate,
                                                    costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[249] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[249] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))

                                        }

                                        // mullion connector for Openable top hung
                                        if (i.id === 3428) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = ((InputValues[index].openableTopHungs) * (InputValues[index].mullion.numberOfMullians * 2)) * InputValues[index].qty
                                                if (InputValues[index].mullion.type === 'No') {
                                                    estQty = estQty + ((InputValues[index].totalTopHungs - 1) * 2)
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: ((InputValues[index].totalTopHungs - 1) * 2),
                                                        costing_rate: i.upvcrate,
                                                        costing_value: ((InputValues[index].totalTopHungs - 1) * 2) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(((InputValues[index].totalTopHungs - 1) * 2) / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[93] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty += pQ + ((InputValues[index].totalTopHungs - 1) * 2)
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: (pQ + ((InputValues[index].totalTopHungs - 1) * 2)),
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ + ((InputValues[index].totalTopHungs - 1) * 2)) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number((pQ + ((InputValues[index].totalTopHungs - 1) * 2)) / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[93] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[93] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 3528 Gisket, same as sash Top HUNG for openable
                                        if (i.id === 3528) {
                                            InputValues.forEach((data, index) => {
                                                if (i.id === 3528) {
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQTH,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: pQTH * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[82] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    } else {
                                                        estQty = estQty + 0
                                                    }
                                                    estQty = TOTAL_SASH_TOPHungs
                                                    rate = i.upvcrate

                                                    if (estQty === undefined) {
                                                        estQty = 0
                                                    }
                                                    value = estQty * rate
                                                    FullTotalOfCoasting = FullTotalOfCoasting + value
                                                    pdfArray = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: estQty,
                                                        costing_rate: rate,
                                                        costing_value: value
                                                    }
                                                    pdfDataRow.push(pdfArray)
                                                    costingItemArray[70] = pdfArray
                                                    // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                                }
                                            })
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[96] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                }
                                            })

                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[96] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // steel openable Top Hung
                                        if (i.id === 3441) {
                                            estQty = (TOTAL_FRAME_TOP_HUNGS * (i.length))
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[78] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // Sash Steel
                                        if (i.id === 3442) {
                                            estQty = estQty + (TOTAL_SASH_TOPHungs * (i.length))
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[98] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // TOP HUNG Screen Sash Steel
                                        InputValues.forEach((data, index) => {
                                            if (i.id === 3443) {

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
                                                const pQTH = ((((((CountNumberOfTopHungForFlyMeshWidth / 304.8) * 2)) + ((InputValues[index].heightTopHung / 304.8) * (InputValues[index].slidingTopHungs * 2))) / 8) * InputValues[index].qty)    //       .....coastingLoopFunction(i.id, upvc, state, i.id)
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    estQty = estQty + 0
                                                } else if (InputValues[index].slidingTopHungs > 0) {
                                                    estQty += pQTH
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQTH,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: pQTH * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQTH / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[99] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            }
                                        })

                                        // Interlock Brush
                                        if (i.id === 3444) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (((((InputValues[index].heightTopHung / 304.8) * (InputValues[index].totalTopHungs - 1) * 2))) / (i.length) * (i.length) * InputValues[index].qty)
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    estQty = estQty + 0
                                                } else {
                                                    if (InputValues[index].openableTopHungs > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[100] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[100] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 
                                        if (i.id === 3418) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].openableTopHungs) * InputValues[index].qty
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    if (InputValues[index].openableTopHungs > 0) {
                                                        estQty += pQ
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[101] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
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
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[101] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                        // Code to store each Window Item
                                                        const eachItem = {
                                                            costing_item_type: "COSTING",
                                                            coasting_item_id: i.id,
                                                            costing_Qty: pQ,
                                                            costing_rate: i.upvcrate,
                                                            costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                            label: `${InputValues[index].label} - ${i.name}`,
                                                            label2: InputValues[index].label,
                                                            area: InputValues[index].totalSft,
                                                            count: Number(InputValues[index].qty),
                                                            length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                            width: 100
                                                        }
                                                        if (windowWiseItems[index] === undefined) {
                                                            windowWiseItems[index] = {
                                                                eachWindow: [{}]
                                                            }
                                                        }
                                                        windowWiseItems[index].eachWindow[102] = eachItem
                                                        localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                    }
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[102] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
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
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[103] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[103] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // TOP HUNG
                                        if (i.id === 3425) {

                                            InputValues.forEach((data, index) => {
                                                const pQ = ((((InputValues[index].width) * (InputValues[index].heightTopHung) / 92900)) * InputValues[index].qty)
                                                estQty = Number(estQty) + Number(pQ)
                                                // Code to store each Window Item
                                                const eachItem = {
                                                    costing_item_type: "COSTING",
                                                    coasting_item_id: i.id,
                                                    costing_Qty: Math.ceil(pQ / 30),
                                                    costing_rate: i.upvcrate,
                                                    costing_value: Math.ceil(pQ / 30) * i.upvcrate,
                                                    label: `${InputValues[index].label} - ${i.name}`,
                                                    label2: InputValues[index].label,
                                                    area: InputValues[index].totalSft,
                                                    count: Number(InputValues[index].qty),
                                                    length: (Number(Math.ceil(pQ / 30) / InputValues[index].qty) * 304.8).toFixed(0),
                                                    width: 100
                                                }
                                                if (windowWiseItems[index] === undefined) {
                                                    windowWiseItems[index] = {
                                                        eachWindow: [{}]
                                                    }
                                                }
                                                windowWiseItems[index].eachWindow[104] = eachItem
                                                localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                            })

                                            estQty = estQty / 30
                                            estQty = Math.ceil(estQty)
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[104] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // frictional Hings
                                        if (i.id === 3419) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].openableTopHungs * 2) * InputValues[index].qty
                                                if (InputValues[index].openableTopHungs > 0) {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[105] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[105] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 24
                                        if (i.id === 3429) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = 1 //((Number(InputValues[index].totalTopHungs) - 1) * 2) * InputValues[index].qty
                                                if (InputValues[index].windowType === "DOOR" || InputValues[index].windowType === "DDOOR") {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[106] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate
                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[106] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }

                                        // 25
                                        if (i.id === 3430) {
                                            InputValues.forEach((data, index) => {
                                                const pQ = (InputValues[index].totalTopHungs * 1) * InputValues[index].qty
                                                if (InputValues[index].windowType === "DDOOR") {
                                                    estQty += pQ
                                                    // Code to store each Window Item
                                                    const eachItem = {
                                                        costing_item_type: "COSTING",
                                                        coasting_item_id: i.id,
                                                        costing_Qty: pQ,
                                                        costing_rate: i.upvcrate,
                                                        costing_value: (pQ / InputValues[index].qty) * i.upvcrate,
                                                        label: `${InputValues[index].label} - ${i.name}`,
                                                        label2: InputValues[index].label,
                                                        area: InputValues[index].totalSft,
                                                        count: Number(InputValues[index].qty),
                                                        length: (Number(pQ / InputValues[index].qty) * 304.8).toFixed(0),
                                                        width: 100
                                                    }
                                                    if (windowWiseItems[index] === undefined) {
                                                        windowWiseItems[index] = {
                                                            eachWindow: [{}]
                                                        }
                                                    }
                                                    windowWiseItems[index].eachWindow[107] = eachItem
                                                    localStorage.setItem("windowWiseItems", JSON.stringify(windowWiseItems))
                                                } else {
                                                    estQty = estQty + 0
                                                }
                                            })
                                            rate = i.upvcrate

                                            if (estQty === undefined) {
                                                estQty = 0
                                            }
                                            value = estQty * rate
                                            FullTotalOfCoasting = FullTotalOfCoasting + value
                                            pdfArray = {
                                                costing_item_type: "COSTING",
                                                coasting_item_id: i.id,
                                                costing_Qty: estQty,
                                                costing_rate: rate,
                                                costing_value: value
                                            }
                                            pdfDataRow.push(pdfArray)
                                            costingItemArray[107] = pdfArray
                                            // localStorage.setItem("coastChild", JSON.stringify(costingItemArray))
                                        }
                                    }
                                    // localStorage.setItem("divisionOfTotalCoastAddedCoast", ((Number(FullTotalOfCoasting) + Number(addWaistage * totalSft) + Number(AddFactoryOverHead * totalSft) + Number(addProfit * totalSft)) / totalSft).toFixed(2))

                                })}
                            {/*  Each Window Items Listing */}
                            {
                                windowWiseItems && windowWiseItems.map((data, index) => {
                                    let totalOfEachWindow = 0
                                    data.eachWindow.forEach((dataIn, index) => {
                                        if (dataIn !== null) {
                                            totalOfEachWindow += (Math.round((dataIn.costing_rate * ((dataIn.length * dataIn.count) / 304.8)).toFixed(2)))
                                        }
                                    })
                                    return (

                                        <>
                                            <tr>
                                                <th colSpan={3} style={{ paddingTop: 8, fontSize: 16 }} className="text-center"><b>Window / Door Label: {data.eachWindow?.[0].label2}</b></th>
                                            </tr>
                                            {data.eachWindow.map((dataIn, index) => {
                                                return (
                                                    <>
                                                        <tr style={{
                                                            display: dataIn.costing_Qty === 0 ? 'none' : ''
                                                        }}>
                                                            <th style={{
                                                                width: 20
                                                            }} className="text-center">{dataIn.coasting_item_id}</th>
                                                            <td style={{
                                                                width: 50
                                                            }}>{dataIn.label}</td>
                                                            <td style={{
                                                                width: 50
                                                            }} className="text-right">{((dataIn.length * dataIn.count) / 304.8).toFixed(2)}</td>
                                                            <td style={{
                                                                width: 50
                                                            }} className="text-right">{Cookies.get('role') === 'ADMIN' ? dataIn.costing_rate : ''}</td>
                                                            <td style={{
                                                                width: 50
                                                            }} className="text-right">{Cookies.get('role') === 'ADMIN' ? (Math.round((dataIn.costing_rate * ((dataIn.length * dataIn.count) / 304.8)).toFixed(2))) : ''}</td>
                                                        </tr>
                                                    </>

                                                )
                                            })}
                                            <tr>
                                                <th colSpan={2} style={{ paddingTop: 8, fontSize: 16 }} className="text-center"><b>Coasting: {totalOfEachWindow}</b></th>
                                                <th colSpan={2} style={{ paddingTop: 8, fontSize: 16 }} className="text-center"><b>Area (Sqft): {Number(data.eachWindow?.[0].area).toFixed(2)}</b></th>
                                            </tr>
                                            <tr>
                                                <th colSpan={5} style={{
                                                    border: '1px solid #000',
                                                    backgroundColor: '#000'
                                                }}>
                                                </th>
                                            </tr>
                                        </>
                                    )

                                })
                            }
                            {/*  */}
                        </tbody>

                    </Table>

                </div>

            )}
            <br />
            <hr />
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
export default CoastingOfEachWindow

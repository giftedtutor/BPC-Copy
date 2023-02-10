import { useState, useEffect, useContext } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Button
} from "reactstrap"
import axios from "axios"

import TopProgressBar from './TopProgressBar'
// ** Styles

import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import baseURL from "../../../../../base-url/baseURL"
import upvcContext from '../../context/upvcContext'
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import moment from "moment"
//  
const QutationI = () => {

  const ucs = useContext(upvcContext)
  let doorArea = 0
  let totalSft = 0

  const [cosArry, setCosArray] = useState([])
  const history = useHistory()
  const windowWiseItems = JSON.parse(localStorage.getItem('windowWiseItems'))
  console.log('windowWiseItems in Qoutaion:::::::', windowWiseItems)
  const upvcAllCalculations = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  if (upvcAllCalculations === null) {

    alert('Please Input something first, You are navigating to Input Section')
    ucs.setStateCurrent(1)
    history.push('/BPC/apps/upvcCalculaions/qutation')

  }
  const profileType = upvcAllCalculations === null ? '' : upvcAllCalculations[0]?.profileType
  const DoorSelected = upvcAllCalculations?.filter(word => (word.windowType === 'DOOR' || word.windowType === 'DDOOR' || word.windowType === 'FIXED' || word.windowType === 'OPENABLE'))
  DoorSelected?.map((a) => { doorArea = doorArea + parseFloat(a.totalSft, 10) })
  upvcAllCalculations?.map((a) => { totalSft = totalSft + parseFloat(a.totalSft) })


  let totalAreaOfWindows = totalSft - doorArea
  if (totalAreaOfWindows <= 0.50) {
    totalAreaOfWindows = 0
  } else {
    totalAreaOfWindows = Number(totalAreaOfWindows).toFixed(2)
  }
  const [ClearGlass, setClearGlass] = useState(0)
  const [rateOfClearGlass, setrateOfClearGlass] = useState(0)
  const [doubleGlazingCharges, setDoubleGlazingCharges] = useState(0)
  const [singleGlazingCharges, setSingleGlazingCharges] = useState(0)
  const [totalAreaOf8mm, setTotalAreaOf8mm] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [totalAreaOf12mm, setTotalAreaOf12mm] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [totalNumberOfArchBend, setTotalNumberOfArchBend] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [temperedCharges8mm, setTemperedCharges8mm] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [temperedCharges5mm, setTemperedCharges5mm] = useState(0)
  const [decorativeCharges, setDecorativeCharges] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [carriage, setCarriage] = useState(Number(totalAreaOfWindows + doorArea).toFixed(2))
  const [rateOfCarriage, setRateOfCarriage] = useState(0)
  const [rateOfInstallation, setRateOfInstallation] = useState(0)
  const [rateOfTotalAreaOf5mm, setRateOfTotalAreaOf5mm] = useState(0)
  const [rateOfTotalAreaOf8mm, setRateOfTotalAreaOf8mm] = useState(0)
  const [rateOfTotalAreaOf12mm, setRateOfTotalAreaOf12mm] = useState(0)
  const [rateOfDecorativeBarCharges, setRateOfDecorativeBarCharges] = useState(0)
  const [rateOfTemperedCharges5mm, setRateOfTemperedCharges5mm] = useState(0)
  const [rateOfTemperedCharges8mm, setRateOfTemperedCharges8mm] = useState(0)
  const [rateOfDoubleGlazing, setRateOfDoubleGlazing] = useState(0)
  const [rateOfSingleGlazing, setRateOfSingleGlazing] = useState(0)
  const [rateOfArchBending, setRateOfArchBending] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [salesTax, setSalesTax] = useState(0)
  const [othersTax, setothersTax] = useState(0)
  const [data, setData] = useState([])
  const [dataE, setDataE] = useState([])
  const [totalAreaOf5mmTintedGlass, setTotalAreaOf5mmTintedGlass] = useState(0)
  const CoastingTotal = localStorage.getItem("divisionOfTotalCoastAddedCoast")
  let clientId = 0
  const topMAsterDetails = []
  clientId = upvcAllCalculations === null ? '' : upvcAllCalculations[0]?.clientId

  const [TermAndCon, setTermAndCon] = useState(`2- Quotation is valid for 3 days. 
3-  Maximum time limit for execution of work is 45 days after advance.`)
  const [TermOfPay, setTermOfPay] = useState(`1- Prices: Ex- Factory, carrige shell be charge in separate.
  A) 50% Down Payment
  B) 40% Before delivery ( 40 % of amount ).
  C) 10% On Delivery, Before Installation
  d) In case of glass, payment 100% in advance. Otherwise Quoted Glass Price will be VOID/revised accordingly.`)

  const [TermOfHardAndAccess, setTermOfHardAndAccess] = useState(
    " Handles, Locks, Gear Locks, Brush, Gaskets, Screws (Galvanized Rust Free), Re-inforcement 1mm (Galvanized Rust Free Local Steel), Screw Hole Covers, Drainage Slot Covers, Aluminium Railing, Aluminium/Fibre Netting, Rollers for Windows and Netting. Imported Spacers, Imported Corners, Imported Double Tape, Imported Chemical and Imported Dow Corning Weatherseal Silicone is used for Double Glazing. We offer 5 five years warranty on Double Glazing.  We use branded Profile 88mm/66mm with warranty of 20 years. Defaults in the payment shall terminate the warranty."
  )


  const capitalizeFirstLetter = (str) => {
    if (str === undefined) {
      str = 'Null'
    }
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

    return capitalized
  }

  const InputData = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  const DesignURl = InputData?.map((x, i) => {
    return (
      x.DesignImageUrl
    )
  })
  let SG = 0
  let DG = 0
  let decorativeBarSize = 0
  let installation = 1
  InputData?.map((data, index) => {
    if (data.beading === "SG") {
      SG = 1
    } else if (data.beading === "DG") {
      DG = 1
    } else if (data.decorativeBarSize === "") {
      decorativeBarSize = 0
    } else if (data.installation === "No") {
      installation = 0
    }

  })

  const dgSelected = upvcAllCalculations?.filter(word => word.beading === 'DG')
  const totalCarriage = carriage * rateOfCarriage
  const totalClearGlass = ClearGlass * rateOfClearGlass
  const totalInstallation = totalSft * rateOfInstallation
  const totalAmountOf5mmTintedGlass = rateOfTotalAreaOf5mm * totalAreaOf5mmTintedGlass
  const totalAmountOf8mmTintedGlass = rateOfTotalAreaOf8mm * totalAreaOf8mm
  const totalAmountOf12mmTintedGlass = rateOfTotalAreaOf12mm * totalAreaOf12mm
  const totalAmountOfDecorativeBar = rateOfDecorativeBarCharges * decorativeCharges
  const totalAmountOfTemperedCharges5mm = rateOfTemperedCharges5mm * temperedCharges5mm
  const totalAmountOfTemperedCharges8mm = rateOfTemperedCharges8mm * temperedCharges8mm
  const totalAmountOfDoubleGlazingCharges = rateOfDoubleGlazing * doubleGlazingCharges
  const totalAmountOfSingleGlazingCharges = rateOfSingleGlazing * singleGlazingCharges
  const totalAmountOfArchBending = rateOfArchBending * totalNumberOfArchBend
  const rateOfAreaOfDoor = (CoastingTotal) // (CoastingTotal * 0.91)
  const totalCoastAndWindow = doorArea * rateOfAreaOfDoor
  const totalAreaAndCost = totalAreaOfWindows * CoastingTotal // 98* 318
  const totalSumResult = totalAreaAndCost + totalCoastAndWindow + totalAmountOfArchBending + totalAmountOfDoubleGlazingCharges + totalAmountOfSingleGlazingCharges + totalAmountOfTemperedCharges8mm + totalAmountOfTemperedCharges5mm + totalAmountOfDecorativeBar + totalAmountOf8mmTintedGlass + totalAmountOf5mmTintedGlass + totalInstallation + totalCarriage + totalClearGlass + Number(totalAmountOf12mmTintedGlass)
  const percnetOfSaleTax = (((parseInt(totalSumResult, 10) + parseInt(discount, 10)) * salesTax) / 100)
  const percnetOfOthersTax = (((parseInt(totalSumResult, 10) + parseInt(discount, 10)) * othersTax) / 100)
  const AllFinalTotal = (totalSumResult - discount) + percnetOfSaleTax + percnetOfOthersTax
  const converter = require('number-to-words')
  // const test4 = converter.toWords(AllFinalTotal) // => “thirteen”

  const qutatuion1_master = {
    Quotation1_Total: Number(totalSumResult).toFixed(2),
    Quotation1_Discount: discount,
    Quotation1_sales_tax: salesTax,
    Quotation1_others_tax: othersTax,
    Quotation1_sale_after_tax: percnetOfSaleTax,
    Quotation1_total_amount: AllFinalTotal.toFixed(2),
    client_ID: 2,
    Quotation_date: "2021-01-10",
    Quotation_Sale_Rep: "hamza",
    TermAndCon,
    TermOfPay,
    TermOfHardAndAccess
  }
  topMAsterDetails.push(qutatuion1_master)
  localStorage.setItem("MasterDetailsQutation1", JSON.stringify(qutatuion1_master))

  if (CoastingTotal === undefined) CoastingTotal = 0

  const upvc = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  const salesRep = upvc === null ? '' : upvc[0]?.salesRep
  const qutation1_children = [
    {
      Quotation1_discription: 'Total Area of Doors',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: doorArea,
      Quotation1_rate_unit: rateOfAreaOfDoor,
      Quotation1_amount: totalCoastAndWindow,
      DesignImageUrl: '' //DesignURl[0]
    },
    {
      Quotation1_discription: 'Total Area of Windows',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: totalAreaOfWindows,
      Quotation1_rate_unit: CoastingTotal,
      Quotation1_amount: totalAreaAndCost,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Total No of Arch Bending',
      Quotation1_colour: '',
      Quotation1_unit: 'No',
      Quotation1_Quantity: totalNumberOfArchBend,
      Quotation1_rate_unit: rateOfArchBending,
      Quotation1_amount: totalAmountOfArchBending,
      DesignImageUrl: ''
    },
    {
      Quotation1_discription: 'Double Glazing Charges',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: doubleGlazingCharges,
      Quotation1_rate_unit: rateOfDoubleGlazing,
      Quotation1_amount: totalAmountOfDoubleGlazingCharges,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Tempered Charges 8mm',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: temperedCharges8mm,
      Quotation1_rate_unit: rateOfTemperedCharges8mm,
      Quotation1_amount: totalAmountOfTemperedCharges8mm,
      DesignImageUrl: ''
    },
    {
      Quotation1_discription: 'Tempered Charges 5mm',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: temperedCharges5mm,
      Quotation1_rate_unit: rateOfTemperedCharges5mm,
      Quotation1_amount: totalAmountOfTemperedCharges5mm,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Decorative Bars Charges',
      Quotation1_colour: '',
      Quotation1_unit: 'No',
      Quotation1_Quantity: decorativeCharges,
      Quotation1_rate_unit: rateOfDecorativeBarCharges,
      Quotation1_amount: totalAmountOfDecorativeBar,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: '8mm Plain Glass',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: totalAreaOf8mm,
      Quotation1_rate_unit: rateOfTotalAreaOf8mm,
      Quotation1_amount: totalAmountOf8mmTintedGlass,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: '5mm Tinted Glass',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: totalAreaOf5mmTintedGlass,
      Quotation1_rate_unit: rateOfTotalAreaOf5mm,
      Quotation1_amount: totalAmountOf5mmTintedGlass,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: '12mm Tinted Glass',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: totalAreaOf12mm,
      Quotation1_rate_unit: rateOfTotalAreaOf12mm,
      Quotation1_amount: totalAmountOf12mmTintedGlass,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Installation',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: totalSft,
      Quotation1_rate_unit: rateOfInstallation,
      Quotation1_amount: totalInstallation,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Carriage',
      Quotation1_colour: '',
      Quotation1_unit: 'LS',
      Quotation1_Quantity: carriage,
      Quotation1_rate_unit: rateOfCarriage,
      Quotation1_amount: totalCarriage,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Clear Glass',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: ClearGlass,
      Quotation1_rate_unit: rateOfClearGlass,
      Quotation1_amount: totalClearGlass,
      DesignImageUrl: ''

    },
    {
      Quotation1_discription: 'Single Glazing Charges',
      Quotation1_colour: '',
      Quotation1_unit: 'SFT',
      Quotation1_Quantity: singleGlazingCharges,
      Quotation1_rate_unit: rateOfSingleGlazing,
      Quotation1_amount: totalAmountOfSingleGlazingCharges,
      DesignImageUrl: ''

    }
  ]
  localStorage.setItem("Qutation1Childrens", JSON.stringify(qutation1_children))

  const Quotation1Details = (QoID) => {
    axios.get(`${baseURL}/getQuotation1?masterID=${QoID}`)
      .then(response => {
        const Qchild = response.data.childData
        const Qparent = response.data.masterData

        setTotalNumberOfArchBend(Qchild[1].Quotation1_Quantity)
        setRateOfArchBending(Qchild[1].Quotation1_rate_unit)
        setDoubleGlazingCharges(Qchild[2].Quotation1_Quantity)
        // setRateOfDoubleGlazing(Qchild[2].Quotation1_rate_unit)
        setRateOfSingleGlazing(Qchild[14].Quotation1_rate_unit)

        setTemperedCharges8mm(Qchild[3].Quotation1_Quantity)
        setRateOfTemperedCharges8mm(Qchild[3].Quotation1_rate_unit)

        setDecorativeCharges(Qchild[4].Quotation1_Quantity)
        setRateOfDecorativeBarCharges(Qchild[4].Quotation1_rate_unit)
        setTotalAreaOf5mmTintedGlass(Qchild[5].Quotation1_Quantity)
        setRateOfTotalAreaOf5mm(Qchild[5].Quotation1_rate_unit)
        setRateOfInstallation(Qchild[6].Quotation1_rate_unit)
        setCarriage(Qchild[7].Quotation1_Quantity)
        setRateOfCarriage(Qchild[7].Quotation1_rate_unit)

        setDiscount(response.data.masterData[0].Quotation1_Discount)
        setSalesTax(response.data.masterData[0].Quotation1_sales_tax)
        setothersTax(response.data.masterData[0].Quotation1_others_tax)

      })
      .catch(err => console.log(err))

  }

  const Quotation2Details = (QoID) => {
    axios.get(`${baseURL}/getQuotation2?masterID=${QoID}`)
      .then(response => {
        const Qchild = response.data.childData // Inputt view table
        const Qparent = response.data.masterData
        const parentQ = response.data.masterData?.map(({

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
    ucs.setStateQuotII(false)

  }
  useEffect(() => {
    axios.get(`${baseURL}/editClient?id=${clientId}`)
      .then(response => {
        setData(response.data.client)
      })
      .catch(err => console.log(err))

    axios.get(`${baseURL}/editEmployee?id=${salesRep}`)
      .then(response => {
        setDataE(response.data.employee)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    ucs.setStateCurrent(4)

    if (QEditID === '' || QEditID === null || QEditID === 'null' || QEditID === undefined) {
    } else {
      Quotation1Details(QEditID)
    }

    if (discount === '') {
      ucs.setStateQuotII(false)
      ucs.setStateBoq(false)
    } else {
      ucs.setStateQuotII(true)
    }
    if (upvcAllCalculations === null) {
      ucs.setStateCurrent(1)
    }
    checkValues()
  }, [QEditID, AllFinalTotal])

  useEffect(() => {
    let DG = 0
    let SG = 0
    upvcAllCalculations.forEach((data, index) => {
   
      if (data.beading === 'SG') {
        SG += Number(data.totalSft)
      } else if (data.beading === 'DG') {
        DG += Number(data.totalSft)
      }

    })
    console.log('SG:::::', SG)
    setDoubleGlazingCharges(DG.toFixed(2))
    setSingleGlazingCharges(SG.toFixed(2))
    setClearGlass((DG * 2).toFixed(2))
    setTotalAreaOf5mmTintedGlass((DG * 2).toFixed(2))
    setTemperedCharges5mm((DG * 2).toFixed(2))
    setTotalAreaOf8mm(SG.toFixed(2))
    setTotalAreaOf12mm(SG.toFixed(2))
    setTemperedCharges8mm(SG.toFixed(2))


  }, [])
  const coastChild = JSON.parse(localStorage.getItem("coastChild"))
  const MasterDetailsCoasting = JSON.parse(localStorage.getItem("MasterDetailsCoasting"))
  const TotalOfCasting = JSON.parse(localStorage.getItem("TotalOfCasting"))
  const MasterDetailsQutation1 = JSON.parse(localStorage.getItem("MasterDetailsQutation1"))
  const Qutation1Childrens = JSON.parse(localStorage.getItem("Qutation1Childrens"))
  const qutation2Children = JSON.parse(localStorage.getItem("qutation2Children"))
  const inputData = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  const MasterDetailsQutation2 = JSON.parse(localStorage.getItem("MasterDetailsQutation2"))

  const qutationDate = upvc === null ? '' : upvc[0]?.qutationDate
  const profileName = upvc === null ? '' : upvc[0]?.profileType
  const client_ID = localStorage.getItem('clientId')
  const article = {
    client_ID,
    Quotation_date: qutationDate,
    Quotation_Sale_Rep: salesRep,
    profileID: profileType,
    parentID: (QEditID === null || QEditID === "null" || QEditID === undefined) ? 0 : QEditID,

    // Quotation1_Total: MasterDetailsQutation1.Quotation1_Total,
    Quotation1_Total: MasterDetailsQutation1.Quotation1_Total,
    Quotation1_Discount: MasterDetailsQutation1.Quotation1_Discount,
    Quotation1_sales_tax: MasterDetailsQutation1.Quotation1_sales_tax,
    Quotation1_others_tax: MasterDetailsQutation1.Quotation1_others_tax,
    Quotation1_sale_after_tax: MasterDetailsQutation1.Quotation1_sale_after_tax,
    Quotation1_total_amount: MasterDetailsQutation1.Quotation1_total_amount,
    TermAndCon: MasterDetailsQutation1.TermAndCon,
    TermOfPay: MasterDetailsQutation1.TermOfPay,
    TermOfHardAndAccess: MasterDetailsQutation1.TermOfHardAndAccess,
    Quotation1_amount_in_words: "Testing ",
    Quotation2_additioal_cost_of_DGG_area: 0, // MasterDetailsQutation2.Quotation2_additioal_cost_of_DGG_area,
    Quotation2_additioal_cost_of_DGG_rate: 0, //MasterDetailsQutation2.Quotation2_additioal_cost_of_DGG_rate,
    Quotation2_additioal_cost_of_DGG_amount: 0, // MasterDetailsQutation2.Quotation2_additioal_cost_of_DGG_amount,
    Quotation2_other_charages_area: 0,
    Quotation2_other_charages_rate: 0,
    Quotation2_other_charages_amount: 0,
    Quotation2_discount_area: 0,
    Quotation2_discount_rate: 0,
    Quotation2_discount_amount: 0,
    Quotation2_transportation: 0, // MasterDetailsQutation2.Quotation2_transportation,
    Quotation2_grand_total: 0, //MasterDetailsQutation2.Quotation2_grand_total,
    Quotation2_average_rate_sft: 0,
    Quotation2_average_rate_window: 0,
    Quotation2_total_amount: 0, //MasterDetailsQutation2.Quotation2_total_amount,
    Quotation2_total_area: 0, //MasterDetailsQutation2.Quotation2_total_area,
    Quotation2_total_quantity: 0, //MasterDetailsQutation2.Quotation2_total_quantity,
    total_of_costing: (MasterDetailsCoasting.total_of_costing === null || MasterDetailsCoasting.total_of_costing === 'null') ? 0 : MasterDetailsCoasting.total_of_costing,
    Costing_TCPH_value: 0, //MasterDetailsCoasting.Costing_TCPH_value,
    Costing_AW_perentage: 0, //MasterDetailsCoasting.Costing_AW_perentage,
    Costing_AW_value: 0, //MasterDetailsCoasting.Costing_AW_value,
    Costing_AFO_perecntage: 0, //MasterDetailsCoasting.Costing_AFO_perecntage,
    Costing_AFO_value: 0, //MasterDetailsCoasting.Costing_AFO_value,
    Costing_total_cost_MIOW_value: 0, //MasterDetailsCoasting.Costing_total_cost_MIOW_value,
    Costing_add_profit_percentage: 0, //MasterDetailsCoasting.Costing_add_profit_percentage,
    Costing_add_profit_value: 0, //MasterDetailsCoasting.Costing_add_profit_value,
    Costing_total_cost_of_project_value: 0, //MasterDetailsCoasting.Costing_total_cost_of_project_value,
    Costing_difference_costing_and_grandtotal_Q2: 0,
    Costing_COP_divided_percentage_of_project: 0, //MasterDetailsCoasting.Costing_COP_divided_percentage_of_project,
    Q1Array: Qutation1Childrens,
    Q2Array: inputData,
    boqArray: {},
    cosArray: cosArry,
    ratePerSqFt: CoastingTotal, // rateOfAreaOfDoor
    windowWiseItems
  }
  const PushData = () => {
    axios.post(`${baseURL}/addMasterContent`, article, {
    }).then(response => {
      // setDatas(response.data)
      toast('Quotation has been Saved!')
      localStorage.removeItem('InputAllDataBPC')
      localStorage.removeItem('windowWiseItems')
      const QoIDID = null
      localStorage.setItem("EditQuotationID", QoIDID)
      history.push('/BPC/apps/upvcCalculaions/ViewQutation')
      ucs.setStateCurrent(1)
    }).catch(err => {
      toast('Quotations did not Save, Try Again!')
    })
  }

  const find_duplicate_in_array = (array) => {
    const duplicates = []
    array.forEach((el, i) => {
      array.forEach((element, index) => {
        if (i === index) return null
        if (element.coasting_item_id === el.coasting_item_id) {
          if (!duplicates.includes(el)) duplicates.push(el)
        }
      })
    })
    return duplicates
  }

  useEffect(() => {
    const filteredArray = []

    coastChild.forEach((data, index) => {
      if (Math.ceil(data?.costing_Qty) > 0) {
        filteredArray.push({
          coasting_item_id: data?.coasting_item_id,
          costing_Qty: data?.costing_Qty,
          costing_item_type: data?.costing_item_type,
          costing_rate: data?.costing_rate,
          costing_value: data?.costing_value
        })
      }

    })
    console.log('Filtered Array:::::::::::', filteredArray)
    setCosArray(filteredArray)
  }, [])

  return (
    <>

      <div className="table-responsive printme">
        <Table id="my-table" className="table table-striped" size="sm">
          <tr>
            <th>Client Name:</th>
            <td>{capitalizeFirstLetter(data.name)}</td>
            <th>Quotation Date:</th>
            <td>{moment(upvc === null ? '' : upvc[0]?.qutationDate).format('DD/MM/YYYY')}</td>
          </tr>
          <tr>
            <th>Contact No.</th>
            <td>{data.contact_no}</td>

            <th>City:</th>

            <td>{capitalizeFirstLetter(data.city)}</td>
          </tr>
          <tr>
            <th>E-Mail:</th>
            <td>{data.email}</td>
            <th>Sales Rep:</th>
            <td>{capitalizeFirstLetter(dataE?.name)}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>
              {capitalizeFirstLetter(data.address)}
            </td>
            <th></th>
            <th></th>

          </tr>
        </Table>
        <p style={{ paddingTop: 8, fontSize: 16 }}>
          Note:This Quotation is Valid For 7 Days.
        </p>
        <Table id="table" size="sm">
          <thead>
            <tr >
              <th className="text-center">S.No</th>
              <th>Description</th>
              <th >Unit</th>
              <th className="text-center">Area (Sqft)</th>
              <th className="text-center">Rate/Unit</th>
              <th className="text-center" >Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{
              display: Number(doorArea) === 0 ? 'none' : ''
            }}>
              <th className="text-center" style={{
                width: 20
              }} scope="row">1</th>
              <td >Total Area of Doors</td>
              <td>SFT</td>
              <td>{Number(doorArea).toFixed(2)}</td>
              <td>{Number(rateOfAreaOfDoor).toFixed(2)}</td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalCoastAndWindow.toFixed(2)}</td>


            </tr>
            <tr>
              <th className="text-center" style={{
                width: 20
              }} scope="row">2</th>
              <td style={{
                width: 120
              }}>Total Area of Windows</td>
              <td style={{
                width: 10
              }}>SFT</td>
              <td style={{
                width: 80
              }}>{totalAreaOfWindows}</td>
              <td style={{
                width: 80
              }}>
                {Number(CoastingTotal).toFixed(2)}
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAreaAndCost.toFixed(2)}</td>


            </tr>
            <tr style={{
              display: 'none'
            }}>
              <th className="text-center" scope="row">3</th>
              <td>Total No of Arch Bending</td>
              <td>No</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  value={totalNumberOfArchBend}
                  defaultValue={totalAreaOfWindows}
                  placeholder="Total Area OF Arch"
                  onChange={(event) => {
                    setTotalNumberOfArchBend(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  value={rateOfArchBending}

                  placeholder="Rate Of Arch Bending"
                  onChange={(event) => {
                    setRateOfArchBending(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfArchBending.toFixed(2)}</td>
            </tr>
            <tr style={{
              display: (SG === 0) ? 'none' : ''
            }}>
              <th style={{
                width: 20
              }} className="text-center" scope="row">4</th>
              <td style={{
                width: 150
              }}>Single Glazing Charges</td>
              <td>SFT</td>
              {/* <td>{doubleGlazingCharges}</td> */}
              <td> <input
                type="number"
                name="add-waistage"
                id="width"
                className="form-control"
                placeholder="Quantity Of Double Glazing"
                value={singleGlazingCharges}
                onChange={(event) => {
                  setSingleGlazingCharges(event.target.value)
                }}
              /></td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="rate Of Single Glazing"
                  value={rateOfSingleGlazing}
                  onChange={(event) => {
                    setRateOfSingleGlazing(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfSingleGlazingCharges.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-center" scope="row">5</th>
              <td>Tempered Charges 8mm</td>
              <td>SFT</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  value={temperedCharges8mm}
                  defaultValue={totalAreaOfWindows}
                  className="form-control"
                  placeholder="tempered Charges"
                  onChange={() => {
                    setTemperedCharges8mm(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Rate Of Tempered Charges"
                  value={rateOfTemperedCharges8mm}
                  onChange={(event) => {
                    setRateOfTemperedCharges8mm(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfTemperedCharges8mm.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-center" scope="row">6</th>
              <td>Tempered Charges 5mm</td>
              <td>SFT</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  value={temperedCharges5mm}
                  className="form-control"
                  placeholder="tempered Charges"
                  onChange={(event) => {
                    setTemperedCharges5mm(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Area OF Arch"
                  value={rateOfTemperedCharges5mm}
                  onChange={(event) => {
                    setRateOfTemperedCharges5mm(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfTemperedCharges5mm.toFixed(2)}</td>
            </tr>
            <tr style={{
              display: (decorativeBarSize === 0) ? 'none' : ''
            }}>
              <th className="text-center" scope="row">7</th>
              <td>Decorative Bars Charges</td>
              <td>No</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  value={decorativeCharges}
                  className="form-control"
                  placeholder="Decorative Charges"
                  onChange={(event) => {
                    setDecorativeCharges(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Rate Of Decorative Bar Charges"
                  value={rateOfDecorativeBarCharges}

                  onChange={() => {
                    setRateOfDecorativeBarCharges(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfDecorativeBar.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-center" scope="row">8</th>
              <td>8mm Plain Glass</td>
              <td>SFT</td>
              <td>
                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  value={totalAreaOf8mm}
                  className="form-control"
                  placeholder="Area of 8mm"
                  onChange={(event) => {
                    setTotalAreaOf8mm(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Arch"
                  value={rateOfTotalAreaOf8mm}

                  onChange={(event) => {
                    setRateOfTotalAreaOf8mm(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOf8mmTintedGlass.toFixed(2)}</td>
            </tr>

            <tr>
              <th className="text-center" scope="row">9</th>
              <td>12mm Plain Glass</td>
              <td>SFT</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  value={totalAreaOf12mm}
                  className="form-control"
                  placeholder="12mm"
                  onChange={(event) => {
                    setTotalAreaOf12mm(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="12mm"
                  value={rateOfTotalAreaOf12mm}

                  onChange={(event) => {
                    setRateOfTotalAreaOf12mm(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOf12mmTintedGlass.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-center" scope="row">10</th>
              <td>5mm Tinted Glass</td>
              <td>SFT</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Quantity OF Arch"
                  value={totalAreaOf5mmTintedGlass}

                  onChange={(event) => {
                    setTotalAreaOf5mmTintedGlass(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Area OF Arch"
                  value={rateOfTotalAreaOf5mm}

                  onChange={(event) => {
                    setRateOfTotalAreaOf5mm(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOf5mmTintedGlass.toFixed(2)}</td>
            </tr>
            <tr style={{
              display: (installation === 0) ? 'none' : ''
            }}>
              <th className="text-center" scope="row">11</th>
              <td>Installation</td>
              <td>SFT</td>
              <td>{Number(totalSft).toFixed(2)}</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Area OF Arch"
                  value={rateOfInstallation}
                  onChange={(event) => {
                    setRateOfInstallation(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalInstallation.toFixed(2)}</td>
            </tr>
            <tr>
              <th className="text-center" scope="row">12</th>
              <td>Carriage</td>
              <td>LS</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Carriage"
                  value={carriage}
                  onChange={(event) => {
                    setCarriage(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Area OF Arch"
                  value={rateOfCarriage}

                  onChange={(event) => {
                    setRateOfCarriage(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalCarriage.toFixed(2)}</td>
            </tr>

            <tr>
              <th className="text-center" scope="row">13</th>
              <td>Clear Glass 5 mm</td>
              <td>SFT</td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Carriage"
                  value={ClearGlass}
                  onChange={(event) => {
                    setClearGlass(event.target.value)
                  }}
                />
              </td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="Total Area OF Arch"
                  value={rateOfClearGlass}

                  onChange={(event) => {
                    setrateOfClearGlass(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalClearGlass.toFixed(2)}</td>
            </tr>

            <tr style={{
              display: (DG === 0) ? 'none' : ''
            }}>
              <th className="text-center" scope="row">14</th>
              <td>Double Glazing Charges</td>
              <td>SFT</td>
              {/* <td>{doubleGlazingCharges}</td> */}
              <td> <input
                type="number"
                name="add-waistage"
                id="width"
                className="form-control"
                placeholder="Quantity Of Double Glazing"
                value={doubleGlazingCharges}
                onChange={(event) => {
                  setDoubleGlazingCharges(event.target.value)
                }}
              /></td>
              <td>

                <input
                  type="number"
                  name="add-waistage"
                  id="width"
                  className="form-control"
                  placeholder="rate Of Double Glazing"
                  value={rateOfDoubleGlazing}
                  onChange={(event) => {
                    setRateOfDoubleGlazing(event.target.value)
                  }}
                />
              </td>
              <td className="text-right" style={{
                width: 50,
                paddingRight: '4%'
              }}>{totalAmountOfDoubleGlazingCharges.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <br />

      <div className="form-row">
        <div className="form-group col-md-8">

        </div>
        <div className="form-group col-md-4">
          <td style={{
            fontWeight: 'bold',
            fontSize: 23
          }} className="pr-1">
            {" "}
            <b>Grand Total (PKR):</b>
          </td>
          <td>
            <span className="font-weight-bolder" style={{
              fontWeight: 'bold',
              fontSize: 23
            }}>{`${totalSumResult.toFixed(2)} /-`}</span>
          </td>
        </div>
      </div>
      <hr />
      <br />
      <div className="form-row">
        <div className="form-group col-md-10"></div>

        <div className="form-group col-md-2">
          <Button color='primary' onClick={PushData}>Store Quotation</Button>
        </div>
      </div>
      <TopProgressBar />

      <hr />
      <Card>
        {" "}
        <CardBody className="invoice-padding pt-0">
          <Row>
            <Col sm="8">
              <br />
              <h4>Terms & Conditions</h4>


              <h4>Terms of Payment:</h4>
              <p>
                <textarea className="form-control" value={TermOfPay} onChange={(e) => setTermOfPay(e.target.value)} />
              </p>
              <p>
                <textarea className="form-control" value={TermAndCon} onChange={(e) => setTermAndCon(e.target.value)} />
              </p>
              {/* <h4>Hardware & Accessories:</h4>
              <p>
              <textarea  className="form-control" value={TermOfHardAndAccess} rows={6}onChange={(e) => setTermOfHardAndAccess(e.target.value)} />
              </p> */}

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
export default QutationI

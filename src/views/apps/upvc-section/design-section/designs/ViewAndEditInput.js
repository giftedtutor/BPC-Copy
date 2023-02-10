import { useEffect, useState, useContext } from 'react'

import { useHistory } from "react-router"
import { useLocation } from "react-router-dom"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import axios from "axios"
import baseURL from "../../../../../base-url/baseURL"

//MUI
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { refreshTable } from './WindowDesignAndInput.js'
import { Button } from 'reactstrap'
import upvcContext from '../../context/upvcContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const ViewProject = () => {

  // MUI

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const ucs = useContext(upvcContext)
  const history = useHistory()
  const location = useLocation()
  const [Inc, setInc] = useState(0)
  const [Reload, setReload] = useState(0)

  const QoID = ((location.state === null || location.state === undefined) ? '' : location.state.params)

  let InputDataFromLS = JSON.parse(localStorage.getItem('InputAllDataBPC'))
  if (InputDataFromLS === null || InputDataFromLS === undefined) {
    InputDataFromLS = []
  }
  const [rows, setRows] = useState([])

  const [QTY, setQTY] = useState([])
  const [Installation, setInstallation] = useState([])
  const [Width, setWidth] = useState([])
  const [Height, setHeight] = useState([])
  const [WindType, setWindType] = useState([])
  const [ProfileTye, setProfileTye] = useState([])
  const [PanelLeaf, setPanelLeaf] = useState([])

  const [modal, setModal] = useState(false)
  const [showImage, setShowImage] = useState('')
  const [addFormData, setAddFormData] = useState({
    windowNo: "",
    qty: "",
    width: "",
    height: "",
    totalMm: "",
    totalSft: "",
    installation: "",
    windowType: "",
    profileType: "",
    doorBase: "",
    inwardOutward: "",
    panelLeaf: "",
    slidingPanels: "",
    openableLeafCut: "",
    topHungCut: "",
    beading: "",
    multiLockingSystem: "",
    profileType: ""
  })
  const handleModal = () => setModal(!modal)
  const tdClickHandle = () => {
    handleModal()
  }

  const Quotation1Details = (QoID) => {
    axios.get(`${baseURL}/getQuotation1?masterID=${QoID}`)
      .then(response => {
        const Qchild = response.data.childData
        const Qparent = response.data.masterData

      })
      .catch(err => console.log(err))

  }

  const Quotation2Details = (QoID) => {
    axios.get(`${baseURL}/getQuotation2?masterID=${QoID}`)
      .then(response => {
        const Qparent = response.data.masterData
        const childQ = response.data.childData.map(({
          id,
          salesRep,
          clientId,
          qutationDate,
          qty,
          Width,
          Height,
          Installation,
          windowType,
          profileTypee,
          PanelLeaf,
          SlidingPanel,
          Beading,
          multiLockingSystem,
          profileType,

          totalNumberOfPanels,
          numberOfOpenablePanels,
          numberOfFixedPanels,
          decorativeBarSize: barSize,
          doubleGlaze,
          location,
          DesignImageUrl,
          customTopHung,
          wheel,
          dummyWheel,

          divider,
          firstSize,
          secondSize,
          thirdSize,
          fourthSize,
          mullion,
          slidingTopHungs,
          fixedTopHungs,
          openableTopHungs,
          totalTopHungs,
          heightTopHung,
          coasting,
          cFirstPanel,
          cSecondPanel,
          cThirdPanel,
          cFourthPanel,
          cFifthPanel,
          cSixthPanel,
          dGlaze,
          mesh,
          customFirstTop,
          customSecondTop,
          customThirdTop,
          customFourthTop,
          customFifthTop,
          customSixthTop,
          InterLock,

          topProfileType,
          threePanelDivider,
          doorBase,
          pType,
          topBeading,
          categoryShape,
          topPType,
          label,
          doorPanelSize
        }) => ({
          salesRep,
          qutationDate,
          clientId,
          qty: Number(qty),
          width: (Width),
          height: (Height),
          totalMm: ((Width * (Number(Height) + Number(heightTopHung)))),
          totalSft: ((((Width * (Number(Height) + Number(heightTopHung))) / 92900) * qty)),
          installation: Installation,
          windowType,
          profileTypee,
          panelLeaf: PanelLeaf,
          slidingPanels: SlidingPanel,
          beading: Beading,
          multiLockingSystem,
          profileType,

          totalNumberOfPanels,
          numberOfOpenablePanels,
          numberOfFixedPanels,
          decorativeBarSize: barSize,
          doubleGlaze,
          location,
          DesignImageUrl,
          customTopHung,
          wheel,
          dummyWheel,
          divider,
          firstSize,
          secondSize,
          thirdSize,
          fourthSize,
          mullion,
          slidingTopHungs,
          fixedTopHungs,
          openableTopHungs,
          totalTopHungs,
          heightTopHung,

          coasting,
          cFirstPanel,
          cSecondPanel,
          cThirdPanel,
          cFourthPanel,
          cFifthPanel,
          cSixthPanel,
          dGlaze,
          mesh,
          customFirstTop,
          customSecondTop,
          customThirdTop,
          customFourthTop,
          customFifthTop,
          customSixthTop,
          InterLock,

          topProfileType,
          threePanelDivider,
          doorBase,
          pType,
          topBeading,
          categoryShape,
          topPType,
          label,
          doorPanelSize

        }))
        setRows(childQ)

        // dispatch(
        // handleFormSubmit(childQ[0])
        // )
        localStorage.setItem('clientId', childQ[0]?.clientId)
        localStorage.setItem('InputAllDataBPC', JSON.stringify(childQ))
        setReload(Reload + 1)

      })
      .catch(err => console.log(err))

  }
  useEffect(() => {

    if ((location.state === null || location.state === undefined)) {
      setRows(InputDataFromLS === null || InputDataFromLS[0]?.data === null ? [] : InputDataFromLS)
      setReload(Reload + 1)
    } else {
      Quotation1Details(QoID)
      Quotation2Details(QoID)
      localStorage.setItem("EditQuotationID", QoID)
    }

  }, [QoID, Inc, refreshTable])

  useEffect(() => {
    if (rows.length !== 0) {
      ucs.setStateVsection(false)
      ucs.setStateInput(false)
      ucs.setStateQuotI(true)
    } else {
      ucs.setStateVsection(true)
      ucs.setStateInput(false)
      ucs.setStateQuotI(true)
    }
  }, [rows])
  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))

  }
  const handleChange = idx => e => {
    const { name, value } = e.target
    QTY[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: value,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: ((((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900))) > 10 ? ((((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * Number(value))) : (10 * Number(value)),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    // dispatch(
    //   handleFormSubmit(rowss[0])
    //   )
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }


  const handleChange1 = idx => e => {
    const { name, value } = e.target
    Width[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: value,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (value * rows[idx].height),
      totalMm: (value * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((value * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((value * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }
    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    Height[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: value,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (Number(rows[idx].width) * (Number(value) + Number(rows[idx].heightTopHung))),
      totalSft: (((Number(rows[idx].width) * (Number(value) + Number(rows[idx].heightTopHung))) / 92900) > 10 ? (((Number(rows[idx].width) * (Number(value) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty)),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }


  const handleChange22 = idx => e => {
    const { name, value } = e.target
    //Height[idx] = value
    rows[idx].heightTopHung = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: value,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(value))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(value))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(value))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange3 = idx => e => {
    const { name, value } = e.target
    Installation[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: value,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }
  const handleChange32 = idx => e => {
    const { name, value } = e.target
    rows[idx].beading = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: value,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange15 = idx => e => {
    const { name, value } = e.target
    rows[idx].label = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: value
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }
  const handleChange33 = idx => e => {
    const { name, value } = e.target
    rows[idx].multiLockingSystem = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: value,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange35 = idx => e => {
    const { name, value } = e.target
    rows[idx].location = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: value,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange5 = idx => e => {
    const { name, value } = e.target
    ProfileTye[idx] = value
    rows[idx].profileType = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileType: value,
      profileTypee: rows[idx].profileTypee,

      slidingPanels: rows[idx].slidingPanels,
      panelLeaf: rows[idx].panelLeaf,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }

  const handleChange8 = idx => e => {
    const { name, value } = e.target
    PanelLeaf[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      salesRep: rows[idx].salesRep,
      qutationDate: rows[idx].qutationDate,
      clientId: rows[idx].clientId,
      qty: rows[idx].qty,
      width: rows[idx].width,
      height: rows[idx].height,
      heightTopHung: rows[idx].heightTopHung,
      totalMm: (rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))),
      totalSft: (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900)) > 10 ? (((rows[idx].width * (Number(rows[idx].height) + Number(rows[idx].heightTopHung))) / 92900) * rows[idx].qty) : (10 * rows[idx].qty),
      installation: rows[idx].installation,
      windowType: rows[idx].windowType,
      profileTypee: rows[idx].profileTypee,
      profileType: rows[idx].profileType,
      doorBase: rows[idx].doorBase,
      inwardOutward: rows[idx].inwardOutward,
      panelLeaf: value,
      slidingPanels: rows[idx].slidingPanels,

      beading: rows[idx].beading,
      multiLockingSystem: rows[idx].multiLockingSystem,
      profileType: rows[idx].profileType,
      totalNumberOfPanels: rows[idx].totalNumberOfPanels,
      numberOfOpenablePanels: rows[idx].numberOfOpenablePanels,
      numberOfFixedPanels: rows[idx].numberOfFixedPanels,
      decorativeBarSize: rows[idx].decorativeBarSize,
      doubleGlaze: rows[idx].doubleGlaze,
      location: rows[idx].location,
      DesignImageUrl: rows[idx].DesignImageUrl,
      customTopHung: rows[idx].customTopHung,
      wheel: rows[idx].wheel,
      dummyWheel: rows[idx].dummyWheel,
      divider: rows[idx].divider,
      firstSize: rows[idx].firstSize,
      secondSize: rows[idx].secondSize,
      thirdSize: rows[idx].thirdSize,
      fourthSize: rows[idx].fourthSize,
      mullion: rows[idx].mullion,
      slidingTopHungs: rows[idx].slidingTopHungs,
      fixedTopHungs: rows[idx].fixedTopHungs,
      openableTopHungs: rows[idx].openableTopHungs,
      totalTopHungs: rows[idx].totalTopHungs,
      coasting: rows[idx].coasting,
      cFirstPanel: rows[idx].cFirstPanel,
      cSecondPanel: rows[idx].cSecondPanel,
      cThirdPanel: rows[idx].cThirdPanel,
      cFourthPanel: rows[idx].cFourthPanel,
      cFifthPanel: rows[idx].cFifthPanel,
      cSixthPanel: rows[idx].cSixthPanel,
      dGlaze: rows[idx].dGlaze,
      mesh: rows[idx].mesh,
      customFirstTop: rows[idx].customFirstTop,
      customSecondTop: rows[idx].customSecondTop,
      customThirdTop: rows[idx].customThirdTop,
      customFourthTop: rows[idx].customFourthTop,
      customFifthTop: rows[idx].customFifthTop,
      customSixthTop: rows[idx].customSixthTop,
      collar: rows[idx].collar,
      InterLock: rows[idx].InterLock,
      espagnolette: rows[idx].espagnolette,
      pType: rows[idx].pType,

      topProfileType: rows[idx].topProfileType,
      threePanelDivider: rows[idx].threePanelDivider,
      doorBase: rows[idx].doorBase,
      topBeading: rows[idx].topBeading,
      categoryShape: rows[idx].categoryShape,
      topPType: rows[idx].topPType,
      label: rows[idx].label,
      doorPanelSize: rows[idx].doorPanelSize
    }

    setRows(rowss)
    localStorage.setItem('InputAllDataBPC', JSON.stringify(rowss))
  }
  console.log('Input Values:::::::', rows)
  return (
    <>
      {/* MUI Model */}
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={showImage} alt="Red dot" height='100%' width='100%' />
          </Box>
        </Modal>

      </div>
      <br />
      <br />
      <div style={{
        display: rows.length === 0 ? 'none' : ''
      }} className="table-responsive printme">
        <table className="table table-striped">
          <thead>
            <tr>

              <th scope="col">Qty</th>
              <th scope="col"> Width</th>
              <th scope="col"> Height</th>
              <th scope="col"> Top Hung Height</th>
              <th scope="col"> Total MM</th>
              <th scope="col"> Total SFT</th>
              <th scope="col"> Label</th>
              <th scope="col"> Installation</th>
              <th scope="col"> Windows Type</th>
              <th scope="col"> Profile Type</th>
              <th scope="col"> Profile</th>
              <th scope="col"> Location</th>

              <th scope="col"> Total No of Panels</th>
              <th scope="col"> Sliding Panels</th>
              <th scope="col"> Openable Panels</th>
              <th scope="col"> Fixed Panels</th>

              <th scope="col"> Beading</th>
              <th scope="col"> Multi Locking System</th>
              <th scope="col"> Design</th>
              <th scope="col"> Remove</th>

            </tr>
          </thead>
          <tbody>
            {rows.map(
              (x, idx) => {
                return (
                  <tr key={idx.toString()}>

                    <td>

                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="uqrt"
                        value={rows[idx].qty}
                        onChange={handleChange(idx)}
                        placeholder='Qty' />

                    </td>
                    <td>
                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="width"
                        value={rows[idx].width}
                        onChange={handleChange1(idx)}
                        placeholder='W' />
                    </td>
                    <td>
                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="height"
                        value={rows[idx].height}
                        onChange={handleChange2(idx)}
                        placeholder='H' />
                    </td>
                    <td>
                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="height"
                        value={rows[idx].heightTopHung}
                        onChange={handleChange22(idx)}
                        placeholder='H' />
                    </td>
                    <td>{Number(x.totalMm).toFixed(2)}</td>
                    <td>{Number(x.totalSft).toFixed(2)}</td>
                    <td>
                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="height"
                        value={rows[idx].label}
                        onChange={handleChange15(idx)}
                        placeholder='Label' />
                    </td>
                    <td>
                      <select className="custom-select"
                        onChange={handleChange3(idx)}

                        style={{ width: 200 }} name="item" required>

                        <option value={rows[idx].installation}>{rows[idx].installation}</option>
                        {rows[idx].installation === "Yes" ? '' : (<option value="Yes">Yes</option>)}
                        {rows[idx].installation === "No" ? '' : (<option value="No">No</option>)}
                      </select>
                    </td>
                    <td>
                      <td>
                        {rows[idx].windowType}
                      </td>
                    </td>
                    <td>
                      <select className="custom-select"
                        onChange={handleChange5(idx)}
                        value
                        style={{ width: 200 }} name="item" required>

                        <option value={rows[idx].profileType}>{rows[idx].profileType === "1" ? 'BURAQ' : (rows[idx].profileType === "2" ? 'EURO' : (rows[idx].profileType === "3" ? 'PAMO' : (rows[idx].profileType === "4" ? "PROLINE" : (rows[idx].profileType === "5" ? "CONCH" : (rows[idx].profileType === "6" ? "WINTECH" : (rows[idx].profileType === "7" ? "DECEUNINCK" : (rows[idx].profileType === "8" ? "SKYPEN" : (rows[idx].profileType === "9" ? "SUPERWIN" : rows[idx].profileType))))))))}</option>
                        {rows[idx].profileType === "1" ? '' : (<option value="1">BURAQ</option>)}
                        {rows[idx].profileType === "2" ? '' : (<option value="2">EURO</option>)}
                        {rows[idx].profileType === "3" ? '' : (<option value="3">PAMO</option>)}
                        {rows[idx].profileType === "4" ? '' : (<option value="4">PROLINE</option>)}
                        {rows[idx].profileType === "5" ? '' : (<option value="5">CONCH</option>)}
                        {rows[idx].profileType === "6" ? '' : (<option value="6">WINTECH</option>)}
                        {rows[idx].profileType === "7" ? '' : (<option value="7">DECEUNINCK</option>)}
                        {rows[idx].profileType === "8" ? '' : (<option value="8">SKYPEN</option>)}
                        {rows[idx].profileType === "9" ? '' : (<option value="9">SUPERWIN</option>)}
                      </select>
                    </td>

                    <td>{x.profileTypee}</td>
                    <td>
                      <input type="Integer" className="form-control" style={{ width: 100 }}
                        name="location"
                        value={rows[idx].location}
                        onChange={handleChange35(idx)}
                        placeholder='Location' />
                    </td>
                    <td>{x.totalNumberOfPanels}</td>
                    <td>{x.slidingPanels}</td>
                    <td>{x.numberOfOpenablePanels}</td>
                    <td>{x.numberOfFixedPanels}</td>

                    <td>
                      <select className="custom-select"
                        onChange={handleChange32(idx)}

                        style={{ width: 200 }} name="item" required>

                        <option value={rows[idx].beading}>{rows[idx].beading}</option>
                        {rows[idx].beading === "SG" ? '' : (<option value="SG">SG</option>)}
                        {rows[idx].beading === "DG" ? '' : (<option value="DG">DG</option>)}
                      </select>
                    </td>
                    <td>
                      <select className="custom-select"
                        onChange={handleChange33(idx)}

                        style={{ width: 200 }} name="item" required>
                        <option value={rows[idx].multiLockingSystem}>{rows[idx].multiLockingSystem}</option>
                        {rows[idx].multiLockingSystem === "Yes" ? '' : (<option value="Yes">Yes</option>)}
                        {rows[idx].multiLockingSystem === "No" ? '' : (<option value="No">No</option>)}
                      </select>
                    </td>
                    <td>
                      <img onClick={() => {
                        handleOpen()
                        setShowImage(x.DesignImageUrl)
                      }} src={x.DesignImageUrl} alt="Red dot" height={100} width={100} />
                    </td>
                    <td> <Button.Ripple onClick={() => {
                      handleRemoveSpecificRow(idx)
                    }} color='danger'>Remove</Button.Ripple>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ViewProject 

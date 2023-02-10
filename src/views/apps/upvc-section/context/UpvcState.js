
import React, { useEffect, useState, createContext } from "react"
import upvcContext from './upvcContext'

const UpvcState = (props) => {

const [StateCurrent, setStateCurrent] = React.useState(1)
const [StateInput, setStateInput] = React.useState(false)
const [StateVsection, setStateVsection] = React.useState(false)
const [StateCosting, setStateCosting] = React.useState(false)
const [StateQuotI, setStateQuotI] = React.useState(false)
const [StateQuotII, setStateQuotII] = React.useState(false)
const [StateBoq, setStateBoq] = React.useState(false)

  return (
  
    <upvcContext.Provider value={{StateInput, setStateInput, StateVsection, setStateVsection, StateCosting, setStateCosting, StateQuotI, setStateQuotI, StateQuotII, setStateQuotII, StateBoq, setStateBoq, StateCurrent, setStateCurrent }}>
      {props.children}
    </upvcContext.Provider>
  )

}
export default UpvcState

// ** Third Party Components
import { createContext, useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router"

import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Table,
  CardHeader,
  CardTitle,
  Button
} from "reactstrap"
import { ArrowLeft, ArrowRight, ChevronRight } from 'react-feather'
import { Link } from 'react-router-dom'
import upvcContext from '../../context/upvcContext'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import ViewProject from '../../design-section/designs/ViewAndEditInput'

const TopProgressBar = () => {

  const ucs = useContext(upvcContext)
  const history = useHistory()

  const [Con, setCon] = useState(false)
  const [Con2, setCon2] = useState(false)
  const [Con3, setCon3] = useState(false)
  const [Con4, setCon4] = useState(false)
  const [Con5, setCon5] = useState(false)
  const [Con6, setCon6] = useState(false)

  const check = () => {

    if (ucs.StateInput === true) {
      setCon(true)
    } else { setCon(false) }
    if (ucs.StateVsection === true) {
      setCon2(true)
    } else { setCon2(false) }
    if (ucs.StateCosting === true) {
      setCon3(true)
    } else { setCon3(false) }
    if (ucs.StateQuotI === true) {
      setCon4(true)
    } else { setCon4(false) }
    if (ucs.StateQuotII === true) {
      setCon5(true)
    } else { setCon5(false) }
    if (ucs.StateBoq === true) {
      setCon6(true)
    } else { setCon6(false) }

  }

  useEffect(() => {
    check()
  }, [])


  const checkStatus = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 1) {
      col = 'success'
    } else if (ucs.StateInput === false) {
      col = 'gray'
    }
    return col
  }

  const checkStatus2 = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 2) {
      col = 'success'
    } else {
      col = 'gray'
    }
    return col
  }

  const checkStatus3 = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 3) {
      col = 'success'
    } else {
      col = 'gray'
    }
    return col
  }
  const checkStatus4 = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 4) {
      col = 'success'
    } else {
      col = 'gray'
    }
    return col
  }
  const checkStatus5 = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 5) {
      col = 'success'
    } else {
      col = 'gray'
    }
    return col
  }
  const checkStatus6 = () => {
    let col = 'gray'
    if (ucs.StateCurrent === 6) {
      col = 'success'
    } else {
      col = 'gray'
    }
    return col
  }


  return (
    <div >

      <Card>
        <CardBody>

          <Button
            disabled={ucs.StateInput}
            className="mr-1"

            color={checkStatus()}

            style={{ marginBottom: 20 }}
            onClick={() => {
              ucs.setStateCurrent(1)
              ucs.setStateCosting(true)
              history.push('/BPC/apps/upvcCalculaions/qutation')
            }}
          >
            Input   <ChevronRight />
          </Button>

          <Button
            // disabled = {!Con2}
            // disabled =  {ucs.StateCurrent === 2}
             disabled =  { ucs.StateVsection }
            className="mr-1"
            color={checkStatus2()}
            style={{ marginBottom: 20 }}
            onClick={() => {
              ucs.setStateCurrent(2)
              ucs.setStateCosting(true)
              history.push('/BPC/apps/upvcCalculaions/coasting')
            }}

          >
            Costing   <ChevronRight />
          </Button>

          <Button
            // disabled = {!Con2}
            // disabled =  {ucs.StateCurrent === 1}
            disabled =  { ucs.StateVsection }
            className="mr-1"
            color={checkStatus3()}
            style={{ marginBottom: 20 }}
            onClick={() => {
              ucs.setStateCurrent(3)
              ucs.setStateCosting(true)
              history.push('/BPC/apps/upvcCalculaions/eachCoasting')
            }}

          >
           Each Costing   <ChevronRight />
          </Button>

          <Button
            disabled={ucs.StateQuotI}
            className="mr-1"
            color={checkStatus4()}
            style={{ marginBottom: 20 }}
            onClick={() => {
              history.push('/BPC/apps/upvcCalculaions/qutationI')
              ucs.setStateCurrent(4)
            }}
          >
            Quotation
            <ChevronRight />
          </Button>
        </CardBody>
      </Card>

    </div>
  )
}

export default TopProgressBar
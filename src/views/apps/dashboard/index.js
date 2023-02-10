// **  Component imports
import { Container, Row, Col } from "reactstrap"
import DashState from './context/dashState'

// ** User List Component
import StatsCard from './StatsCard'
import ItemStocksStatus from './ItemStocksStatus'
import SupplierLedgerGraph from "./SupplierLedgerGraph"
import ClientLedgerGraph from "./ClientLedgerGraph"
import InventoryItemStatus from "./InventoryItemStatus"
import ProductionOrderStatus from "./ProductionOrderStatus"
import VehicleStatus from "./VehicleStatus"
import ProjectTimeline from "./ProjectTimeline"
import MonthWiseSale from "./MonthWiseSale"

// import ProjectCompletion from "./projectCompletion"  

// ** Styles
import "@styles/react/apps/app-users.scss"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import Cookies from "js-cookie"

const ViewDash = () => {
  const history = useHistory()
  const role = Cookies.get('role')

  let admin
  if (role === 'ADMIN') {
    admin = true
  } else {
    admin = false
  }

  let accountant
  if (role === 'ACCOUNTANT') {
    accountant = true
  } else {
    accountant = false
  }

  let sales
  if (role === 'SALES') {
    sales = true
  } else {
    sales = false
  }

  let production
  if (role === 'PRODUCTION') {
    production = true
  } else {
    production = false
  }

  let finance
  if (role === 'FINANCE') {
    finance = true
  } else {
    finance = false
  }
  useEffect(() => {
    if (Cookies.get('userID') === undefined || Cookies.get('userID') === null) {
      history.push('/BPC/login')
    }
  })

  return (
    <DashState>
      <Container >
        <Row>
          <Col> <StatsCard cols={{ md: '3', sm: '6' }} /></Col>
        </Row>
        {finance === true || admin === true ? (
          <Row>
            <Col> <ItemStocksStatus cols={{ md: '3', sm: '6' }} /></Col>
          </Row>
        ) : ''}
        <Row>
          {admin === true || accountant === true ? (
            <Col xs={12} md={6}>  <SupplierLedgerGraph /></Col>
          ) : ''}
          {admin === true || accountant === true ? (
            <Col xs={12} md={6}>  <ClientLedgerGraph /></Col>
          ) : ''}

        </Row>
        <Row>
          {production === true || admin === true || sales === true ? <Col xs={12} md={6}> <ProjectTimeline /> </Col> : ''}
          {sales === true || admin === true ? <Col xs={12} md={6}> <MonthWiseSale /> </Col> : ''}
        </Row>

        <Row  >
          {/* <Col  xs={12} md={6}> <VehicleStatus/> </Col>  */}

          {/* <Col xs={12} md={12}>  <ProductionOrderStatus /></Col> */}
        </Row>


        {finance === true || admin === true ? <Row>
          <Col xs={12} md={12}>  <InventoryItemStatus /></Col>

        </Row> : ""}

      </Container>
    </DashState>
  )
}

export default ViewDash

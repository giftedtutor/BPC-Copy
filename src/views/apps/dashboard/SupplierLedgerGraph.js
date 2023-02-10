// ** User List Component

// ** Styles
import "@styles/react/apps/app-users.scss"

import React, { useEffect, useState, useContext } from "react"
import { Container, Row, Col } from "reactstrap"
import { Line } from "react-chartjs-2"
import { MDBContainer } from "mdbreact"
import SDropDown from "./components/Supplierdropdown"
import baseURL from '../../../base-url/baseURL'

//context api
import DashContext from './context/dashContext'

const SupplierLedgerGraph = () => {

  const a = useContext(DashContext)
  const [data, setData] = React.useState([])
  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`


  const [isLoading, setLoading] = useState(true)

  const dataMine = {
    labels: a.STime,
    datasets: [
      {
        label: "Payable",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: a.SPaid
      }
    ]
  }

  useEffect(() => {
    fetch(`${baseURL}/supplierLedgerGraph?supplierID=0&&fromDate=&&toDate=${todayDate}`)
      .then((response) => response.json())
      .then((records) => {
        const rec = records.SupplierLedger.map((data, index) => {
          return data.remaining
        })
        const rec2 = records.SupplierLedger.map((data, index) => {
          return data.paymentDate
        })
        a.setSPaid(rec)
        a.setSTime(rec2)


        a.setSLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])


  return a.SisLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <MDBContainer>
      <Row>
        <Col xs={12} md={12}> <h3 className="mt-4">Supplier Ledger</h3> </Col>
        
      </Row>
        <Row>
        <Col xs={12} md={12}> <h6 className="mt-1">   <SDropDown className="mt-5" /> </h6> </Col>
        </Row>
      <Line overflow="scroll" data={dataMine} options={{ responsive: true }} />
    </MDBContainer>
  )
}

export default SupplierLedgerGraph

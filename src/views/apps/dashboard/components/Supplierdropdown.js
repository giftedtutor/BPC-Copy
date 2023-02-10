import React, { useEffect, useState, useContext } from 'react'

import { Dropdown, Selection } from 'react-dropdown-now'
import 'react-dropdown-now/style.css'
import DashContext from '../context/dashContext'
import baseURL from '../../../../base-url/baseURL'

const Supplierdropdown = () => {

  const [DateFrom, setDateFrom] = useState('')
  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)
  
  const a = useContext(DashContext)

  const [data, setData] = React.useState([])

  const [isLoading, setLoading] = useState(true)
const [supplierID, setSupplierID] = useState(0)

  useEffect(() => {
    fetch(`${baseURL}/getSuppliersDropdown`)
      .then((response) => response.json())
      .then((records) => {

        const rec = records.Suppliers.map(({ supplier_id, name }) => ({ id: supplier_id, value: supplier_id, label: name }))
        const rec2 = [
          {
            id: 0,
            value: 0,
            label: "Display All"
          }
        ]
        const object = rec2.concat(rec)
        setData(object)

        setLoading(false)

      })
      .catch((error) => console.log(error))
  }, [])

  const GetSupplierLedgerDetailsByID = (val) => {

    const URL = `${baseURL}/supplierLedgerGraph?supplierID=${val}&&fromDate=${DateFrom}&&toDate=${currentDate}`
    fetch(URL)
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

  }

  useEffect(() => {
    GetSupplierLedgerDetailsByID(supplierID)
  }, [supplierID, DateFrom, currentDate])
  return isLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (


    <div className="form-row">
    <div className="form-group col-md-4">
    <label >Select Supplier</label>
    <Dropdown
      placeholder="Display All"
      className="my-className"
      options={data}
      onChange={(value) => setSupplierID(value.id)}

    />
    </div>
    <div className="form-group col-md-4">
      <label >Date From</label>
      <input type="date" className="form-control" placeholder="" value={DateFrom}
        onFocus={(e) => e.target.select()} required
        onChange={(e) => setDateFrom(e.target.value)} />
    </div>


    <div className="form-group col-md-4">
      <label>Date To</label>
      <input type="date" className="form-control" placeholder="" value={currentDate}
        onFocus={(e) => e.target.select()} required
        onChange={(e) => setCurrentDate(e.target.value)} />
    </div>
  </div>

  )
}
export default Supplierdropdown


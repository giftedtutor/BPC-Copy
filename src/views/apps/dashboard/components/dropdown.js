
import React, { useEffect, useState, useContext } from 'react'

import { Dropdown, Selection } from 'react-dropdown-now'
import 'react-dropdown-now/style.css'
import DashContext from '../context/dashContext'
import baseURL from '../../../../base-url/baseURL'


const dropdown = () => {

  const [DateFrom, setDateFrom] = useState('')
  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)
  
  const a = useContext(DashContext)

  const [data, setData] = React.useState([])
  const [clientID, setClientID] = useState(0)

  const [isLoading, setLoading] = useState(true)


  const populateDropdown = () => {
    fetch(`${baseURL}/getClientsDropdown`)
      .then((response) => response.json())
      .then((records) => {

        const rec = records.clients.map(({ id, name }) => ({ id, value: id, label: name }))
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
  }

  const GetClientLedgerDetailsByID = (val) => {
 
    fetch(`${baseURL}/clientLedgerGraph?ClientID=${val}&&fromDate=${DateFrom}&&toDate=${currentDate}`)
      .then((response) => response.json())
      .then((records) => {
        const rec = records.ClientLedger.map((data, index) => {
          return data.remaining
        })
        const rec2 = records.ClientLedger.map((data, index) => {
          return data.paymentDate
        })


        a.setCPaid(rec)
        a.setCTime(rec2)
        a.setCLoading(false)
      })
      .catch((error) => console.log(error))

  }
  useEffect(() => {
    GetClientLedgerDetailsByID(clientID)
  }, [clientID, DateFrom, currentDate])
  useEffect(() => {
    populateDropdown()
  }, [])


  return isLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="form-row">
    <div className="form-group col-md-4">
    <label >Select Client</label>
    <Dropdown
      placeholder="Display All"
      className="my-className"
      options={data}
      onChange={(value) => setClientID(value.id)}

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
export default dropdown

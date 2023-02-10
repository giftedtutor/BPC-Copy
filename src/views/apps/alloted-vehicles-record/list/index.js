import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import CurrencyFormat from 'react-currency-format'
import baseURL from '../../../../base-url/baseURL'
import moment from 'moment'

const AllotedVehicleInventory = () => {

  const [ProjectID, setProjectID] = useState('')

  const [stylee, setStyle] = useState('none')

  const [VehicleCondition, setVehicleCondition] = useState()
  const [Art, setArt] = useState()
  const [WorkLocation, setWorkLocation] = useState()
  const [Description, setDescription] = useState()

  const [EmployeeName, setEmployeeName] = useState([])
  const [GetVehicles, setGetVehicles] = useState([])

  const [getItemsNested, setGetItemsNested] = useState([])

  const [ReturnQuantity, setReturnQuantity] = useState([])
  const [Item, setItem] = useState([])

  const [Stocks, setStocks] = useState([])
  const [returnDate, setReturnDate] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [rows1, setRows1] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [Main, setMain] = useState(0)
  const [deleteRefresher, setDeleteRefresher] = useState(0)

  const history = useHistory()

  const GetRows = (val) => {
    setLoading(true)
    Axios.get(`${baseURL}/getAlotedVehicleRecord?vehicleID=${val}&&sort=asc&&colName=id&&records=200&&pageNo=1&&table=alot_vehicle_records`)
      .then(response => {
        if (response.data.record.data[0] === undefined) {
          toast('This Vehicle has not any Allotted Record!')
          setRows([])
          setLoading(false)

        } else {
          setRows(response.data.record.data)
          setLoading(false)
        }
      })
      .catch(err => console.log(err))
  }

  const handleChange = e => {
    const { value } = e.target
    GetRows(value)
  }

  const returnVehicle = (vID) => {

    let txt
    if (confirm("Are you Really want to Return?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/returnAlotedVehicle?projectID=${ProjectID}&&vehicleID=${vID}`)
        .then(data => {
          if (data.data.result === "Vehicle Returned Successfully") {

            toast('Vehicle Returned Successfully')

            GetRows(ProjectID)
            setDeleteRefresher(deleteRefresher + 1)
          } else if (data.data.result === "First alot Another Vehicle and then retun this one") {
            toast('First alot Another Vehicle and then retun this one!')
          } else {
            toast('Something went Wrong!')
          }

        }).catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {

    Axios.get(`${baseURL}/getVehiclesDropdown`)
      .then(response => {
        setGetVehicles(response.data.Vehicles)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

  }, [])


  return (
    <div>
      <form>
        <div className="form-row">

          <div className="form-group col-md-3">
            <label>Select Vehicle</label>
            <select onMouseEnter={e => {
              setStyle('block')
            }}
              onMouseLeave={e => {
                setStyle('none')
              }} class="custom-select"
              name="vehicle"
              onChange={(e) => handleChange(e)}
              onFocus={(e) => e.target.any} required>

              <option >Select Vehicle</option>
              {GetVehicles.map((cat, index) => (
                <option key={index} value={cat.id} >{cat.name} - {cat.vehicleNO}</option>
              ))}
            </select>
            <p style={{ border: '1px solid gray', borderRadius: 20, display: stylee, width: 150, padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Select a Vehicle!</p>
          </div>
        </div>

        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="table-responsive">
            <table className="table table-striped">

              <thead>
                <tr>
                  <th scope="col">Sr. No</th>
                  <th scope="col">Project</th>
                  <th scope="col">Remarks</th>

                  <th scope="col">Date</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr key={idx}>
                    <td>
                      {idx + 1}

                    </td>

                    <td>

                      {rows[idx].projectName}

                    </td>
                    <td>

                      {rows[idx].remarks}

                    </td>

                    <td>

                      {moment(rows[idx].date).format('DD/MM/YYYY')}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="form-row">
          <div className="form-group col-md-10">
          </div>
          <div className="form-group col-md-2">
          </div>
        </div>
      </form>
    </div>
  )
}

export default AllotedVehicleInventory 
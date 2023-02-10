import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const VehicleMaintenance = () => {


  const [PartsToReplaceRepair, setPartsToReplaceRepair] = useState('')
  const [VehiclePeriodic, setVehiclePeriodic] = useState('')
  const [Date, setDate] = useState('')
  const [Expenses, setExpenses] = useState('')
  const [SelectDriver, setSelectDriver] = useState('')
  const [Description, setDescription] = useState('')
  const [GetEmployee, setGetEmployee] = useState([])
  const [VehicleID, setVehicleID] = useState()
  const [GetVehicle, setGetVehicle] = useState([])

  const history = useHistory()

  const addClient = () => {
    if (SelectDriver === '') {
      toast('Fill out SelectDriver field!')
    } else if (Expenses === '') {
      toast('Fill out Expenses field!')
    } else if (PartsToReplaceRepair === '') {
      toast('Fill out PartsToReplaceRepair field!')
    } else if (Date === '') {
      toast('Provide Contact Number of more than 9 digits!')
    } else if (SelectDriver !== '' && Expenses !== '' && PartsToReplaceRepair !== '' && Date !== '') {

      fetch(`${baseURL}/addMaintenanceDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vehicleID: VehicleID,
          parts_to_raplace: PartsToReplaceRepair,
          vehicle_periodic: VehiclePeriodic,
          expenses: Expenses,
          employeeID: SelectDriver,
          description: Description,
          date: Date
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Vehicle Maintenance details saved successfully") {
            toast('Vehicle Maintenance details saved successfully!')
            history.push('/BPC/apps/vehicle-maintenance/list')
          } else {
            toast('Vehicle Details did not add, Please try again ')

          }

        }).catch(err => {

        })
    } else {
      toast('Fill out fields correctly!')
    }


  }


  useEffect(() => {

    Axios.get(`${baseURL}/getEmployees?sort=asc&&colName=id`)
      .then(response => {
        setGetEmployee(response.data.employee.data)

      })
      .catch(err => console.log(''))

    Axios.get(`${baseURL}/getVehicles?pageNo=1&&records=200&&sort=asc&&colName=id`)
      .then(response => {
        setGetVehicle(response.data.vehicles.data)
      })

  }, [])


  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Part to Replace/Repair</label>
            <input type="text" className="form-control" placeholder="Part to Replace/Repair" value={PartsToReplaceRepair}
              style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
              onChange={(e) => setPartsToReplaceRepair(e.target.value)} />
          </div>
          <div className="form-group col-md-4">
            <label >Vehicle Periodic</label>
            <input type="date" className="form-control" placeholder="" value={VehiclePeriodic}
              onChange={(e) => setVehiclePeriodic(e.target.value)} />
          </div>
          <div className="form-group col-md-4">
            <label >Date</label>
            <input type="date" className="form-control" placeholder="" value={Date}
              onChange={(e) => setDate(e.target.value)} />
          </div>

        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Expenses</label>
            <input type="Integer" className="form-control" placeholder="Expenses" value={Expenses}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setExpenses(e.target.value)} />
          </div>

          <div className="form-group col-md-4">
            <label>Select Driver</label>
            <select class="custom-select" onChange={(e) => setSelectDriver(e.target.value)}
              onFocus={(e) => e.target.any}
              required>
              <option>Select Driver</option>
              {GetEmployee.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label>Select Vehicle</label>
            <select class="custom-select" onChange={(e) => setVehicleID(e.target.value)}
              onFocus={(e) => e.target.any}
              required>
              <option>Select Vehicle</option>
              {GetVehicle.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Description</label>
            <textarea type="text" className="form-control" placeholder="Description" value={Description}
              style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
              onChange={(e) => setDescription(e.target.value)} />
          </div>


        </div>

        <Button.Ripple color='primary' onClick={addClient}>
          Add
        </Button.Ripple>
      </form>
    </div>
  )
}

export default VehicleMaintenance 
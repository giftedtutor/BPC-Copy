import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory, useLocation } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import Cookies from 'js-cookie'
import baseURL from '../../../base-url/baseURL'

const QCForProject = () => {

  const role = Cookies.get('role')

  const [GetEmployee, setGetEmployee] = useState([])
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [OPeningClosing, setOPeningClosing] = useState(false)
  const [cuttingFrameProfleAndSteel, setcuttingFrameProfleAndSteel] = useState(false)
  const [screwing, setscrewing] = useState(false)
  const [welding, setwelding] = useState(false)
  const [cleaning, setcleaning] = useState(false)
  const [hardwareAssembles, sethardwareAssembles] = useState(false)
  const [beading, setbeading] = useState(false)
  const [fitting, setfitting] = useState(false)

  const location = useLocation()
  const projectID = location.state.params

  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }
  const addVehicle = () => {
    setIsButtonDisabled(true)
    if (projectID === '' || projectID !== '') {

      fetch(`${baseURL}/quantityControlStore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID,
          cuttingFrameProfleAndSteel: cuttingFrameProfleAndSteel === true ? 1 : 0,
          screwing: screwing === true ? 1 : 0,
          welding: welding === true ? 1 : 0,
          cleaning: cleaning === true ? 1 : 0,
          hardwareAssembles: hardwareAssembles === true ? 1 : 0,
          beading: beading === true ? 1 : 0,
          fitting: fitting === true ? 1 : 0

        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Quantity Control Created Successfully") {
            toast('Quantity Control Created Successfully!')
            history.push('/BPC/apps/daily-project-production-report/list')
          } else {
            toast('QC did not add, Please try again!')
          }

        }).catch(err => {
          console.log(err)
        })
    } else {
      toast('Fill out fields correctly!')
    }
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000)

  }


  useEffect(() => {

    Axios.get(`${baseURL}/getProjects?sort=asc&&colName=id`)
      .then(response => {
        setGetProjects(response.data.projects.data)

      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getEmployees?sort=asc&&colName=id`)
      .then(response => {
        setGetEmployee(response.data.employee.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div>
      {/* Loader */}
      {isLoading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>) : (
        <form>
          <h3 style={{
            margin: 20
          }}>Quality Check (QC) Form!</h3>
          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setOPeningClosing(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">Opening / Closing</label>
          </div>
          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setcuttingFrameProfleAndSteel(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">Frame and Profile</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setscrewing(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">SCREWING</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setwelding(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">WELDING</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setcleaning(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">CLEANING</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => sethardwareAssembles(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">HARDWARE ASSEMBLES</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setbeading(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">BEADING CUTTING</label>
          </div>

          <div class="form-check" style={{
            margin: 20
          }}>
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => setfitting(e.target.checked)} />
            <label class="form-check-label" for="exampleCheck1">FITTING</label>
          </div>


          <div className="form-row">
            <div class="form-group col-md-12" style={{
              margin: 20
            }}>
              <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={addVehicle}>
                Store
              </Button.Ripple>
            </div>
          </div>
        </form>)}
    </div>
  )
}

export default QCForProject
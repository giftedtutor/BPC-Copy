import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import moment from 'moment'

const AllotedMachinesRecords = () => {
  const [stylee, setStyle] = useState('none')
  const [GetMachines, setGetMachines] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const history = useHistory()

  const GetRows = (val) => {
    setLoading(true)
    Axios.get(`${baseURL}/getAlotedMachineRecord?machineID=${val}&&sort=asc&&colName=id&&records=200&&pageNo=1&&table=alot_machine_records`)
      .then(response => {
        if (response.data.record.data[0] === undefined) {
          toast('This Machine has not any Allotted Record!')
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

  useEffect(() => {

    Axios.get(`${baseURL}/getMachinesList`)
      .then(response => {
        setGetMachines(response.data.machines)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div>
      <form>
        <div className="form-row">

          <div className="form-group col-md-3">
            <label>Select Machine</label>
            <select onMouseEnter={e => {
              setStyle('block')
            }}
              onMouseLeave={e => {
                setStyle('none')
              }} class="custom-select"
              name="Machine"
              onChange={(e) => handleChange(e)}
              onFocus={(e) => e.target.any} required>

              <option >Select Machine</option>
              {GetMachines.map((cat, index) => (
                <option key={index} value={cat.id} >{cat.name}</option>
              ))}
            </select>
            <p style={{ border: '1px solid gray', borderRadius: 20, display: stylee, width: 150, padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Select a Machine</p>
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

export default AllotedMachinesRecords 
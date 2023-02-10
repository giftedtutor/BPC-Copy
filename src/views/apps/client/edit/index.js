import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import CurrencyFormat from 'react-currency-format'


const edit = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [previous_balance, setPreviousBalance] = useState()
  const [contact_no, setContactNo] = useState('')

  const history = useHistory()
  const location = useLocation()
  const [suppliersF, setSuppliersF] = useState([])
  const [isLoading, setLoading] = useState(true)
  const id = location.state.params
  const [rows, setRows] = useState([])

  const editClient = () => {

    Axios.get(`${baseURL}/editClient?id=${id}`)
      .then(response => {
        setSuppliersF(response.data.client)
        setName(response.data.client.name)
        setContactNo(response.data.client.contact_no)
        setAddress(response.data.client.address)
        setEmail(response.data.client.email)
        setCity(response.data.client.city)
        setPreviousBalance(response.data.client.previous_balance)
        setLoading(false)

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    editClient()
  }, [])

  const updateClients = () => {
    if (name === '') {
      toast('Enter Name')
    } else if (
      name !== ''
    ) {
      fetch(`${baseURL}/updateClient?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          contact_no,
          address,
          email: Email,
          city,
          previous_balance,
          rows
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Client Details updated Successfully") {
           toast('Client Details updated Successfully!')
            history.push('/BPC/apps/client/list')
          } else if (data.result === "") {
            toast('Client Details updated Successfully!')
            history.push('/BPC/apps/client/list')
          } else {
            toast('Client Details did not update, Please try again ')
           }

        }).catch(err => {
          console.log(err)
        })
    } else {
      toast('Fill out fields correctly!')
    }
  }

  const handleChange = idx => e => {
    const { name, value } = e.target

    const rowss = [...rows]
    rowss[idx] = {
      personName: value,
      designation: rows[idx].designation,
      phone_no: rows[idx].phone_no,
      concernedPersonID: rows[idx].concernedPersonID

    }
    setRows(rowss)
  }

  const handleChange1 = idx => e => {
    const { name, value } = e.target

    const rowss = [...rows]
    rowss[idx] = {
      personName: rows[idx].personName,
      designation: value,
      phone_no: rows[idx].phone_no,
      concernedPersonID: rows[idx].concernedPersonID


    }
    setRows(rowss)
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target

    const rowss = [...rows]
    rowss[idx] = {
      personName: rows[idx].personName,
      designation: rows[idx].designation,
      phone_no: value,
      concernedPersonID: rows[idx].concernedPersonID

    }
    setRows(rowss)
  }

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
          <div className="form-row">
            <div className="form-group col-md-6">
              <label >Name</label>
              <input type="text" className="form-control" placeholder="Client Name " value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group col-md-6">
              <label>Contact #</label>
              <CurrencyFormat
                className="form-control"
                placeholder="923440110312"
                value={contact_no}
                onFocus={e => e.target.select()}
                onChange={e => setContactNo(e.target.value)}
                format="############"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="1234 Main St" value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Email (Optional)</label>
              <input type="email" className="form-control" placeholder="" value={Email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label >City</label>
              <input type="text" className="form-control" placeholder="City" value={city}
                onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label >Previous Balance (PKR)</label>
              <input type="number" className="form-control" placeholder="50000" value={previous_balance}
                disabled
                onChange={(e) => setPreviousBalance(e.target.value)} />
            </div>
            
          </div>
          {/* <div className="table-responsive">
            <table className="table table-striped">

              <thead>
                <tr>
                  <th scope="col">Concern Person</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Phone No</th>

                  <th scope="col">Remove</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr key={idx}>
                    <td>


                      <input type="text" className="form-control" placeholder="ConcernPerson" value={rows[idx].personName}
                        style={{ textTransform: 'capitalize', width: 200 }} onFocus={(e) => e.target.select()} required
                        onChange={handleChange(idx)} />

                    </td>

                    <td>


                      <input type="text" className="form-control" placeholder="Designation" value={rows[idx].designation}
                        style={{ textTransform: 'capitalize', width: 200 }} onFocus={(e) => e.target.select()} required
                        onChange={handleChange1(idx)} />

                    </td>

                    <td>


                      <CurrencyFormat type="Number" className="form-control"
                        placeholder="923440110312" value={rows[idx].phone_no}
                        style={{ width: 200 }}
                        onChange={handleChange2(idx)} />

                    </td>
                    <td>
                      <Button.Ripple onClick={() => {
                       
                      }} color='danger'>Delete</Button.Ripple>
                    </td>
                   
                  </tr>
                ))}

              </tbody>

            </table>
          </div> */}
          <Button.Ripple color='primary' onClick={updateClients}>
            Update
          </Button.Ripple>
        </form>)}
    </div>
  )
}

export default edit
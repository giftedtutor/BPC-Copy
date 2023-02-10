import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'
import CurrencyFormat from 'react-currency-format'

const addClient = () => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [previous_balance, setPreviousBalance] = useState(0)
  const [contact_no, setContactNo] = useState('')
  const history = useHistory()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')
  const [style4, setStyle4] = useState('none')
  const [style5, setStyle5] = useState('none')
  const [style6, setStyle6] = useState('none')
  const [style7, setStyle7] = useState('none')


  const [ConcernPerson, setConcernPerson] = useState([])
  const [Designation, setDesignation] = useState([])
  const [PhoneNo, setPhoneNo] = useState([])
  const [rows, setRows] = useState([])

  const addClient = () => {
    setIsButtonDisabled(true)

    if (name === '') {
      toast('Enter Name!')
    } else if (address === '') {
      toast('Fill out address field!')
    } else if (city === '') {
      toast('Fill out City field!')
    } else if (previous_balance === '') {
      toast('Fill out Previous Balance field!')
    } else if (contact_no === '') {
      toast('Provide Contact Number of more than 9 digits!')
    } else if (name !== '' && address !== '' && city !== '' && previous_balance !== '' && contact_no !== '') {

      fetch(`${baseURL}/addClient`, {
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
          if (data.result === "Client Details Added Successfully") {
            toast('Client Details Added Successfully!')
            history.push('/BPC/apps/client/list')
          } else if (data.result === "") {
            toast('Client Details Added Successfully!')
            history.push('/BPC/apps/client/list')
          } else {
            toast('Client Details did not add, Please try again ')
            history.push('/BPC/apps/client/add')
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


  const handleChange = idx => e => {
    const { name, value } = e.target
    ConcernPerson[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: value,
      designation: Designation[idx],
      phone_no: PhoneNo[idx]

    }
    setRows(rowss)
  }

  const handleChange1 = idx => e => {
    const { name, value } = e.target
    Designation[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: ConcernPerson[idx],
      designation: value,
      phone_no: PhoneNo[idx]

    }
    setRows(rowss)
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    PhoneNo[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: ConcernPerson[idx],
      designation: Designation[idx],
      phone_no: value

    }
    setRows(rowss)
  }
  const handleAddRow = () => {

    const item = {
      personName: "",
      designation: "",
      phone_no: ""

    }
    setRows([...rows, item])
  }

  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
  }
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label >Name</label>
            <input onMouseEnter={e => {
              setStyle('block')
            }}
              onMouseLeave={e => {
                setStyle('none')
              }} type="text" className="form-control" placeholder="Client Name " value={name}
              style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} required
              onChange={(e) => setName(e.target.value)} />
         </div>
          <div className="form-group col-md-6">
            <label>Mobile No</label>

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
          <input onMouseEnter={e => {
            setStyle3('block')
          }}
            onMouseLeave={e => {
              setStyle3('none')
            }} type="text" className="form-control" placeholder="1234 Main St" value={address}
            style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} required
            onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Email (Optional)</label>
            <input onMouseEnter={e => {
              setStyle5('block')
            }}
              onMouseLeave={e => {
                setStyle5('none')
              }} type="email" className="form-control" placeholder="example@gmail.com" value={Email}
              style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} required
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group col-md-4">
            <label >City</label>
            <input onMouseEnter={e => {
              setStyle6('block')
            }}
              onMouseLeave={e => {
                setStyle6('none')
              }} type="text" className="form-control" placeholder="City" value={city}
              style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} required
              onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="form-group col-md-4">
            <label >Previous Balance (PKR)</label>
            <input onMouseEnter={e => {
              setStyle7('block')
            }}
              onMouseLeave={e => {
                setStyle7('none')
              }} type="number" className="form-control" placeholder="50000" value={previous_balance}
              onFocus={(e) => e.target.select()} required
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
                    <CurrencyFormat type="Number" className="form-control" placeholder="923440110312" value={rows[idx].phone_no}
                      style={{ textTransform: 'capitalize', width: 200 }} onFocus={(e) => e.target.select()} required
                      onChange={handleChange2(idx)} />

                  </td>
                  <td>
                    <Button.Ripple onClick={() => {
                      handleRemoveSpecificRow(idx)
                    }} color='danger'>Remove</Button.Ripple>
                  </td>
                  
                </tr>
              ))}

            </tbody>

          </table>
        </div> */}
        <div className="form-row">

          <div className="form-group col-md-10">

            {/* <Button.Ripple color='primary' class="Right" onClick={handleAddRow}>
              Add Concern Person
            </Button.Ripple> */}
          </div>

          <div className="form-group col-md-2">
            <Button.Ripple color='primary' onClick={addClient}
              disabled={isButtonDisabled}
            >
              Store
            </Button.Ripple>
          </div>
        </div>

      </form>
    </div>
  )
}

export default addClient
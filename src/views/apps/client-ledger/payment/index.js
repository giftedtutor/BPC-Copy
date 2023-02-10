import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const payment = () => {

  const [name, setName] = useState('')
  const [Remaining, setRemaining] = useState(0)
  const [description, setDescription] = useState('')
  const [payType, setPayType] = useState('Cash')
  const [previousBalance, setPreviousBalance] = useState(0)
  const [payment, setPayment] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [File, setFile] = useState('')
  const history = useHistory()
  const location = useLocation()
  const [suppliersF, setSuppliersF] = useState([])
  const [isLoading, setLoading] = useState(true)
  const id = location.state.params

  const editClient = () => {

    Axios.get(`${baseURL}/editClient?id=${id}`)
      .then(response => {
        setPreviousBalance(response.data.client.previous_balance)
        setName(response.data.client.name)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    editClient()
  }, [])

  const AddPayToSupplier = () => {
    setIsButtonDisabled(true)
    if (name === '' || payType === '') {
      toast('Fill out All the Fields')
    } else if (
      name !== '' && payType !== ''
    ) {
      const formData = new FormData()
      formData.append("file", File)
      const data = JSON.stringify({
        previousBalance,
        payment,
        remaining: (previousBalance - payment),
        paymentType: payType,
        description,
        clientID: id
      })
      formData.append("data", data)
      Axios.post(`${baseURL}/addPaymentFromClient`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(data => {
        if (data.data.result === "Payment to Client done successfully") {
          toast('Payment to Client done successfully!')
          history.push('/BPC/apps/client-ledger/list/add.js')
        } else if (data.data.result === 'There is some error') {
          toast('There is some error')
        } else {
          toast('Payment to Client failed, Please try again ')
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
            <div className="form-group col-md-4">
              <label >Client</label>
              <input type="text" className="form-control" placeholder="" value={name}
                disabled
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label>Payment (PKR)</label>
              <input type="Number" className="form-control" placeholder="20000" value={payment}
                onChange={(e) => setPayment(e.target.value)} />
            </div>

            <div className="form-group col-md-4">
              <label>Remaining (PKR)</label>
              <input type="text" className="form-control" placeholder="" disabled value={previousBalance - payment}
                onChange={(e) => setRemaining(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">

              <label >Payment Type</label>
              <select class="custom-select" value={payType} onChange={(e) => setPayType(e.target.value)} required>
                <option value=''>Select Payment Type</option>
                <option value='Bank'>Bank</option>
                <option value='Cash'>Cash</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label >Description</label>
              <textarea className="form-control" placeholder="Describe here ...." value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label >Previous Balance (PKR)</label>
              <input type="text" className="form-control" placeholder="Previous Balance" value={previousBalance}
                disabled
                onChange={(e) => setPreviousBalance(e.target.value)} />
            </div>

          </div>
          {/* 3rd Row */}

          <div className="form-row">
            {payType === 'Bank' ? (
              <div className="form-group col-md-4">
                <label >Upload Receipt</label>
                <input type="file" className="form-control"

                  onChange={(e) => setFile(e.target.files[0])} />

              </div>
            ) : ""}
          </div>
          <div className="form-group">

          </div>
          <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={AddPayToSupplier}>
            Receive
          </Button.Ripple>
        </form>)}
    </div>
  )
}

export default payment
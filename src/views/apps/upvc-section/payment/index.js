import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const QuotationPayment = () => {

  const [name, setName] = useState('')
  const [Remaining, setRemaining] = useState('')
  const [description, setDescription] = useState('')
  const [payType, setPayType] = useState('')
  const [previousBalance, setPreviousBalance] = useState(0)
  const [paid, setpaid] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [uploadFile, setUploadFile] = useState()
  const [flag, setFlag] = useState(0)

  const history = useHistory()
  const location = useLocation()
  const [suppliersF, setSuppliersF] = useState([])
  const [isLoading, setLoading] = useState(true)
  const id = location.state.params.client_ID
  const Q1_Total = location.state.params.Q1_Total.toFixed(0)
  const Q1_id = location.state.params.Q1_id
  // const id = 1

  const changeHandlerFile = (event) => {
    event.preventDefault()
    setUploadFile(event.target.files[0])
    setFlag(1)

  }

  const editClient = () => {


    Axios.get(`${baseURL}/editClient?id=${id}`)
      .then(response => {
        setName(response.data.client.name)
        setLoading(false) //stop loading when data is fetched
        setPreviousBalance(response.data.client.previous_balance)

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    editClient()
  }, [])

  const AddPayToSupplier = () => {
    const cr = (Q1_Total / 1.66)
    setIsButtonDisabled(true)
    if (name === '') {
      toast('Enter Name')
    } else if (Number(paid) < Number(cr)) {
      toast('Please Pay atleast 60% of Quotation!')
    } else if (payType === '') {
      toast('Please Select Pay Method!')
    } else if (
      name !== ''
    ) {
      // fetch(`${baseURL}/quotationPayment`, {
      //     method:"POST",
      //     headers:{
      //         "Content-Type":"application/json"
      //     },
      //     body:JSON.stringify({
      //         clientID: id,
      //         quotationID:Q1_id,
      //         total_amount:Number(Q1_Total),
      //         previousBalance, 
      //         paid:Number(paid),
      //         remaining: (Number(Q1_Total) - Number(paid)),
      //         paymentType : payType,
      //         description
      //     })
      // }).then(res => res.json())
      const formData = new FormData()
      formData.append("file", uploadFile)
      const data = JSON.stringify(
        {
          clientID: id,
          quotationID: Q1_id,
          total_amount: Number(Q1_Total),
          previousBalance,
          paid: Number(paid),
          remaining: (Number(Q1_Total) - Number(paid)),
          paymentType: payType,
          description,
          flag
        })
      formData.append("data", data)
      Axios.post(`${baseURL}/quotationPayment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(data => {
          if (data.data.result === "Payment done Successfully") {
            toast('Payment Done Successfully!')
            history.push('/BPC/apps/upvcCalculaions/ViewQutation')
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


  // useEffect(() => {

  //     addCategory()
  // }, [])


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
          <h3 style={{ paddingBottom: 20 }}>Please Pay at least 60% of Quotation Amount!</h3>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label >Client</label>
              <input type="text" className="form-control" placeholder="" value={name}
                disabled
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label>Paid (PKR)</label>
              <input type="Number" className="form-control" placeholder={`${Number(Q1_Total / 1.66).toFixed(2)}`} value={paid}
                onChange={(e) => setpaid(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label>60 % Amount (PKR)</label>
              <input type="Number" className="form-control" placeholder="20000" value={Number(Q1_Total / 1.66).toFixed(2)}
                // onChange={(e) => setpaid(e.target.value)} 
                disabled
              />
            </div>

            <div className="form-group col-md-3">
              <label>Remaining (PKR)</label>
              <input type="text" className="form-control" placeholder="" disabled value={(Q1_Total - paid).toFixed(2)}
                onChange={(e) => setRemaining(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">

              <label >Payment Type</label>
              <select class="custom-select" value={payType} onChange={(e) => setPayType(e.target.value)} required>
                <option value=''>Select Payment Type</option>
                <option value='Bank'>Bank</option>
                <option value='Cash'>Cash</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label >Description</label>
              <textarea className="form-control" placeholder="Describe here ...." value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group col-md-3">
              <label >Previous Balance (PKR)</label>
              <input type="text" className="form-control" placeholder="Previous Balance" value={previousBalance}
                disabled
                onChange={(e) => setPreviousBalance(e.target.value)} />
            </div>
            {payType === 'Bank' ? (<div className="form-group col-md-3">
              <label  >Upload File (Optional)</label>
              <input type="file" className="form-control"
                onChange={changeHandlerFile} />
            </div>) : ''}
          </div>
          <div className="form-group">

          </div>
          <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={AddPayToSupplier}>
            PAY
          </Button.Ripple>
        </form>)}
    </div>
  )
}

export default QuotationPayment
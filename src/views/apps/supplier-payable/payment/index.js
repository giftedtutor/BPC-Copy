import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const Payment = () => {

    const [name, setName] = useState('')
    const [Remaining, setRemaining] = useState('')
    const [description, setDescription] = useState('')
    const [payType, setPayType] = useState('')
    const [previousBalance, setPreviousBalance] = useState(0)
    const [payment, setPayment] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params

    const editClient = () => {
        Axios.get(`${baseURL}/getSupplier?supplierID=${id}&&sort=ASC&&colName=id`)
            .then(response => {
                setPreviousBalance(response.data.supplier.previous_balance)
                setName(response.data.supplier.name)
                setLoading(false) //stop loading when data is fetched

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        editClient()
    }, [])

    const AddPayToSupplier = () => {
        if (name === '') {
            toast('Enter Name')
        } else if (
            name !== ''
        ) {
            fetch(`${baseURL}/addPaymentToSupplier?supplierID=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    previousBalance,
                    payment,
                    remaining: (previousBalance - payment),
                    paymentType: payType,
                    description
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Payment to supplier done successfully") {

                        toast('Payment to supplier done successfully!')
                        history.push('/BPC/apps/supplier-payable/list')
                    } else {
                        toast('Payment to supplier failed, Please try again ')
                    }

                }).catch(err => {
                    console.log(err)
                })
        } else {
            toast('Fill out fields correctly!')
        }


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
                            <label >Supplier Name</label>
                            <input type="text" className="form-control" placeholder="" value={name}
                                disabled
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Payment</label>
                            <input type="text" className="form-control" placeholder="Pay" value={payment}
                                onChange={(e) => setPayment(e.target.value)} />
                        </div>

                        <div className="form-group col-md-4">
                            <label>Remaining</label>
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
                            <label >Previous Balance</label>
                            <input type="text" className="form-control" placeholder="Previous Balance" value={previousBalance}
                                disabled
                                onChange={(e) => setPreviousBalance(e.target.value)} />
                        </div>

                    </div>

                    <Button.Ripple color='primary' onClick={AddPayToSupplier}>
                        Add Payment
                    </Button.Ripple>
                </form>)}
        </div>
    )
}

export default Payment
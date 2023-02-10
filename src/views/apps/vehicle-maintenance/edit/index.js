import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../baseURL/baseURL'

const Edit = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [previous_balance, setPreviousBalance] = useState()
    const [contact_no, setContactNo] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params
    // const id = 1

    const editClient = () => {

        Axios.get(`${baseURL}/editClient?id=${id}`)
            .then(response => {
                setSuppliersF(response.data.client)
                setName(response.data.client.name)
                setContactNo(response.data.client.contact_no)
                setAddress(response.data.client.address)
                setProvince(response.data.client.province)
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
                    province,
                    city,
                    previous_balance
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Client Details updated Successfully") {

                        toast('Client Details updated Successfully!')
                        history.push('/BPC/apps/client/list')
                    } else {
                        toast('Client Details did not update, Please try again ')
                        history.push('/BPC/apps/client/list')
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
                        <div className="form-group col-md-6">
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Client Name " value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Contact #</label>
                            <input type="text" className="form-control" placeholder="03440000000" value={contact_no}
                                onChange={(e) => setContactNo(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="1234 Main St" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Province</label>
                            <input type="text" className="form-control" placeholder="Province" value={province}
                                onChange={(e) => setProvince(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >City</label>
                            <input type="text" className="form-control" placeholder="City" value={city}
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Previous Balance</label>
                            <input type="number" className="form-control" placeholder="50000" value={previous_balance}
                                onChange={(e) => setPreviousBalance(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">

                    </div>
                    <Button.Ripple color='primary' onClick={updateClients}>
                        Update
                    </Button.Ripple>
                </form>)}
        </div>
    )
}

export default Edit
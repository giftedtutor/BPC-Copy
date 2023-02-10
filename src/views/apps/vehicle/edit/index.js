import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const Edit = () => {

    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [model, setModel] = useState('')
    const [vehicleNO, setVehicleNO] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params

    const editVehicle = () => {
        Axios.get(`${baseURL}/editVehicle?id=${id}`)
            .then(response => {
                setSuppliersF(response.data.vehicle)
                setName(response.data.vehicle.name)
                setColor(response.data.vehicle.color)
                setModel(response.data.vehicle.model)
                setVehicleNO(response.data.vehicle.vehicleNO)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        editVehicle()
    }, [])

    const updateVehicle = () => {
        if (name === '') {
            toast('Enter Name')
        } else if (
            name !== ''
        ) {
            fetch(`${baseURL}/updateVehicle?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    color,
                    model: 'A',
                    vehicleNO
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Vehicle Details Updated Successfully") {
                        toast('Vehicle Details Updated Successfully!')
                        history.push('/BPC/apps/vehicle/list')
                    } else {
                        toast('Vehicle Details did not update, Please try again ')
                        history.push('/BPC/apps/vehicle/list')
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
                            <input type="text" className="form-control" placeholder="Vehicle Name " value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>color</label>
                            <input type="text" className="form-control" placeholder="Color" value={color}
                                onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label >vehicleNO</label>
                            <input type="text" className="form-control" placeholder="Vehicle NO" value={vehicleNO}
                                onChange={(e) => setVehicleNO(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">

                    </div>
                    <Button.Ripple color='primary' onClick={updateVehicle}>
                        Update
                    </Button.Ripple>
                </form>)}
        </div>
    )
}

export default Edit
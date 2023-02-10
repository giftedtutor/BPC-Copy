import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const ChangeUnit = () => {

    const [unitName1, setUnitName1] = useState()
    const [unitCode1, setUnitCode1] = useState()
    const [unitName2, setUnitName2] = useState()
    const [unitCode2, setUnitCode2] = useState()
    const [unitQuantity1, setUnitQuantity1] = useState(0.00)
    const [unitQuantity2, setUnitQuantity2] = useState(0.00)
    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params

    const editUnit = () => {

        Axios.get(`${baseURL}/editUnit?id=${id}`)
            .then(response => {
                setSuppliersF(response.data.unit)
                setUnitName1(response.data.unit.unit1name)
                setUnitCode2(response.data.unit.unit2code)
                setUnitName2(response.data.unit.unit2name)
                setUnitCode1(response.data.unit.unit1code)
                setUnitQuantity1(response.data.unit.unit1quantity)
                setUnitQuantity2(response.data.unit.unit1quantity)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        editUnit()
    }, [])

    const updateUnit = () => {
        if (unitName1 === '') {
            toast('Enter  Name')
        } else if (
            unitName1 !== ''
        ) {
            fetch(`${baseURL}/updateUnit?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    unit1name: unitName1,
                    unit2name: unitName2,
                    unit1code: unitCode1,
                    unit2code: unitCode2,
                    unit1quantity: unitQuantity1,
                    unit2quantity: unitQuantity2
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Unit Updated successfully") {
                  
                        toast('Unit Updated successfully!')
                        history.push('/BPC/apps/product/unitList')
                    } else {
                        toast('Unit did not update, Please try again ')
                        history.push('/BPC/apps/product/unitList')
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
                    <h1>Unit 1</h1>
                    <div className="form-row">


                        <div className="form-group col-md-4">
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Unit Name" style={{ textTransform: 'capitalize' }} value={unitName1}
                                onChange={(e) => setUnitName1(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Code</label>
                            <input type="text" className="form-control" placeholder="Unit Code" value={unitCode1}
                                onChange={(e) => setUnitCode1(e.target.value)} />
                        </div>
                    </div>
                    {/* 2nd row */}
                    <h1>Unit 2</h1>
                    <div className="form-row">


                        <div className="form-group col-md-4">
                            <label >Name</label>
                            <input type="text" className="form-control" style={{ textTransform: 'capitalize' }} placeholder="Unit Name" value={unitName2}
                                onChange={(e) => setUnitName2(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Code</label>
                            <input type="text" className="form-control" placeholder="Unit Code" value={unitCode2}
                                onChange={(e) => setUnitCode2(e.target.value)} />
                        </div>
                    </div>

                    {/* 3rd row */}

                    <h1>Define Conversion</h1>
                    <div className="form-row">


                        <div className="form-group col-md-3">
                            <label >Unit 1</label>
                            <input type="text" className="form-control" placeholder="0.00" value={unitQuantity1}
                                onChange={(e) => setUnitQuantity1(e.target.value)} />
                        </div>
                        <div className="form-group col-md-1"> <h1 style={{ marginTop: 22, marginLeft: 31 }}> = </h1> </div>
                        <div className="form-group col-md-3">
                            <label >Unit 2</label>
                            <input type="text" className="form-control" placeholder="0.00" value={unitQuantity2}
                                onChange={(e) => setUnitQuantity2(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">

                    </div>
                    <Button.Ripple color='primary' onClick={updateUnit}>
                        Update
                    </Button.Ripple>
                </form>)}
        </div>
    )
}

export default ChangeUnit
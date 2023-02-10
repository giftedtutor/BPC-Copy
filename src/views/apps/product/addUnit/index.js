import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'


const addunit = () => {

    const [unitName1, setUnitName1] = useState()
    const [unitCode1, setUnitCode1] = useState()
    const [unitName2, setUnitName2] = useState()
    const [unitCode2, setUnitCode2] = useState()
    const [unitQuantity1, setUnitQuantity1] = useState(0.00)
    const [unitQuantity2, setUnitQuantity2] = useState(0.00)
    const history = useHistory()


    const AddUnit = () => {
        if (unitName1 === '') {
            toast('Enter Unit Name')
        } else if (unitCode1 === '') {
            toast('Enter Unit Code')
        } else if (
            unitName1 !== '' && unitCode1 !== ''
        ) {
            fetch(`${baseURL}/addUnit`, {
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
                    if (data.result === "Unit saved successfully") {
                        toast('Unit saved successfully!')
                        history.push('/BPC/apps/product/unitList')
                    } else {
                        toast('Unit did not place, Please try again ')
                        history.push('/BPC/apps/product/addUnit')
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
            <form>
                <h1>Unit 1</h1>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Unit Name" value={unitName1} style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitName1(e.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Code</label>
                        <input type="text" className="form-control" placeholder="Unit Code" value={unitCode1} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitCode1(e.target.value)} />
                    </div>
                </div>
                {/* 2nd row */}
                <h1>Unit 2</h1>
                <div className="form-row">

                    <div className="form-group col-md-4">
                        <label >Name</label>
                        <input type="text" className="form-control" style={{ textTransform: 'capitalize' }} placeholder="Unit Name" value={unitName2} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitName2(e.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Code</label>
                        <input type="text" className="form-control" placeholder="Unit Code" value={unitCode2} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitCode2(e.target.value)} />
                    </div>
                </div>

                {/* 3rd row */}

                <h1>Define Conversion</h1>
                <div className="form-row">


                    <div className="form-group col-md-3">
                        <label >Unit 1</label>
                        <input type="number" step="any"
                            className="form-control" placeholder="0.00" value={unitQuantity1} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitQuantity1(e.target.value)}

                        />
                    </div>
                    <div className="form-group col-md-1"> <h1 style={{ marginTop: 22, marginLeft: 31 }}> = </h1> </div>
                    <div className="form-group col-md-3">
                        <label >Unit 2</label>
                        <input type="text" className="form-control" placeholder="0.00" value={unitQuantity2} onFocus={(e) => e.target.select()}
                            onChange={(e) => setUnitQuantity2(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">

                </div>
                <Button.Ripple color='primary' onClick={AddUnit}>
                    Add Unit
                </Button.Ripple>
            </form>
        </div>
    )
}

export default addunit
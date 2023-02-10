import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'

const Return = () => {

    const [SelectVehicle, setSelectVehicle] = useState('')
    const [SelectInventory, setSelectInventory] = useState('')
    const [VehicleNeedRepair, setVehicleNeedRepair] = useState('')
    const [PartsToReplaceRepair, setPartsToReplaceRepair] = useState('')
    const [RepairExpense, setRepairExpense] = useState()
    const [DateOfReturn, setDateOfReturn] = useState('')
    const history = useHistory()

    const addClient = () => {
        if (SelectInventory === '') {
            toast('Fill out SelectInventory field!')
        } else if (VehicleNeedRepair === '') {
            toast('Fill out VehicleNeedRepair field!')
        } else if (PartsToReplaceRepair === '') {
            toast('Fill out PartsToReplaceRepair field!')
        } else if (RepairExpense === '') {
            toast('Fill out Previous Balance field!')
        } else if (DateOfReturn === '') {
            toast('Provide Contact Number of more than 9 digits!')
        } else if (SelectInventory !== '' && VehicleNeedRepair !== '' && PartsToReplaceRepair !== '' && RepairExpense !== '' && DateOfReturn !== '') {

            fetch(`${baseURL}/addClient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Client Details Added Successfully") {

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
    }
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label >Vehicle Selection</label>
                        <select class="custom-select" onChange={(e) => setSelectVehicle(e.target.value)}
                            onFocus={(e) => e.target.any}
                            required>
                            <option>Select </option>
                            {/* {productType.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))}  */}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Inventory Selection</label>
                        <select class="custom-select"
                            onFocus={(e) => e.target.any}
                            onChange={(e) => setSelectInventory(e.target.value)} required>
                            <option>Select </option>
                            {/* {productType.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))}  */}
                        </select>
                    </div>

                    <div className="form-group col-md-3">
                        <label>Vehicle Need repair</label>
                        <select class="custom-select"
                            onFocus={(e) => e.target.any} onChange={(e) => setVehicleNeedRepair(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            {/* {productType.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))}  */}
                        </select>
                    </div>


                    {VehicleNeedRepair === 'yes' ? <div className="form-group col-md-3">
                        <label>Part to Replace/Repair</label>
                        <input type="text" className="form-control" placeholder=""
                            style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} value={PartsToReplaceRepair}
                            onChange={(e) => setPartsToReplaceRepair(e.target.value)} />
                    </div> : ''}
                </div>
                <div className="form-row">

                    <div className="form-group col-md-4">
                        <label >Repair Expenses</label>
                        <input type="Integer" className="form-control" placeholder="Repair Expenses" value={RepairExpense}
                            style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} required
                            onChange={(e) => setRepairExpense(e.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Date of return</label>
                        <input type="date" className="form-control" placeholder="" value={DateOfReturn}
                            onFocus={(e) => e.target.select()} required
                            onChange={(e) => setDateOfReturn(e.target.value)} />
                    </div>

                </div>
                <div className="form-group">

                </div>
                <Button.Ripple color='primary' onClick={addClient}>
                    Add
                </Button.Ripple>
            </form>
        </div>
    )
}

export default Return 
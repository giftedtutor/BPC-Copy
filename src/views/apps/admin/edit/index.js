import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'

const addUnit = () => {

    const [name, setName] = useState('')
    const [fatherName, setFatherName] = useState('')

    const [email, setEmail] = useState()
    const [dob, setDob] = useState()
    const [cnic, setCnic] = useState('')
    const [mobile, setContactNo] = useState()
    const [salary, setSalary] = useState()
    const [department, setDepartment] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params
    // const id = 1

    const editClient = () => {

        Axios.get(`http://thesfb.live/Eastern-highway/api/editEmployee?id=${id}`)
            .then(response => {

                setSuppliersF(response.data.employee)
                setName(response.data.employee.name)
                setFatherName(response.data.employee.fatherName)
                setEmail(response.data.employee.email)
                setAddress(response.data.employee.address)
                setDob(response.data.employee.dob)
                setCnic(response.data.employee.cnic)
                setContactNo(response.data.employee.mobile)
                setSalary(response.data.employee.salary)
                setDepartment(response.data.employee.department)
                setGender(response.data.employee.gender)
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
            fetch(`http://thesfb.live/Eastern-highway/api/updateEmployee?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    fatherName,
                    email,
                    dob,
                    cnic,
                    mobile,
                    salary,
                    department,
                    gender,
                    address
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.result === "Employee updated successfully") {
                        toast('Employee updated successfully!')
                        history.push('/BPC/apps/employee/list')
                    } else {
                        toast('Employee did not update, Please try again ')
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
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Name " value={name} style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Father Name</label>
                            <input type="text" className="form-control" placeholder="Father Name " value={fatherName}
                                style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
                                onChange={(e) => setFatherName(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Joining Date</label>
                            <input type="date" className="form-control" placeholder="" value={dob}
                                onChange={(e) => setDob(e.target.value)} />
                        </div>

                        <div className="form-group col-md-4">
                            <label>CNIC</label>
                            <input type="text" className="form-control" placeholder="16101-0099000-0" value={cnic}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setCnic(e.target.value)} />
                        </div>

                        <div className="form-group col-md-4">
                            <label>Mobile No</label>
                            <input type="Integer" className="form-control" placeholder="03440000000" value={mobile}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setContactNo(e.target.value)} />
                        </div>
                    </div>


                    <div className="form-row">

                        <div className="form-group col-md-4">
                            <label >salary</label>
                            <input type="Integer" className="form-control" placeholder="20000" value={salary}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Department</label>
                            <input type="text" className="form-control" placeholder="Department" value={department}
                                style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
                                onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-group col-md-4">
                            <label >Gender</label>
                            <select class="custom-select" onChange={(e) => setGender(e.target.value)} value={gender} onFocus={(e) => e.target.any} required>
                                <option>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-7">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="1234 Main St" value={address}
                                style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <Button.Ripple color='primary' onClick={updateClients}>
                        Update
                    </Button.Ripple>
                </form>)}
        </div>
    )
}

export default addUnit
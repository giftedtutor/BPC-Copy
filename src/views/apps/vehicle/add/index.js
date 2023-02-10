import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import Cookies from 'js-cookie'

const addVehicleDetails = () => {
    
    const role = Cookies.get('role')
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [model, setModel] = useState('')
    const [vehicleNO, setVehicleNO] = useState('')
    const [GetProjects, setGetProjects] = useState([])
    const [Project, setProject] = useState()
    const [SelectDriver, setSelectDriver] = useState('')
    const [GetEmployee, setGetEmployee] = useState([]) 
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const [stylee, setStyle] = useState('none')
    const [style2, setStyle2] = useState('none')
    const [style3, setStyle3] = useState('none')

    let valB
    if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
      valB = true
    } else {
      valB = false
    }
    const addVehicle = () => {
      setIsButtonDisabled(true)
         if (name === '') {
            toast('Enter Name!')
          } else if (color === '') {
            toast('Fill out color field!')
          } else if (vehicleNO === '') {
            toast('Fill out vehicleNO field!')
          } else if (name !== '' && color !== '' 
                ) {

        fetch(`${baseURL}/addVehicle`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                color,
                model:'A',
                vehicleNO
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Vehicle Details Added Successfully") {
                toast('Vehicle Details Added Successfully!')
                history.push('/BPC/apps/vehicle/list')
            } else {
                toast('Vehicle Details did not add, Please try again ')
                history.push('/BPC/apps/vehicle/add') 
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


    useEffect(() => {

        Axios.get(`${baseURL}/getProjects?sort=asc&&colName=id`)
        .then(response => {
          setGetProjects(response.data.projects.data)
        })
        .catch(err => console.log(err))
        Axios.get(`${baseURL}/getEmployees?sort=asc&&colName=id`)
        .then(response => {
          setGetEmployee(response.data.employee.data)
           setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div>
            {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
             <form>
        <div className="form-row">
        <div className="form-group col-md-4">
            <label >Name</label>
            <input  onMouseEnter={e => {
                            setStyle('block')
                        }}
                        onMouseLeave={e => {
                            setStyle('none')
                        }}  type="text" className="form-control" placeholder="Vehicle Name " value={name}
               onFocus={(e) => e.target.select()}
            onChange={(e) => setName(e.target.value)} />
        </div>
        
        <div className="form-group col-md-4">
        <label>Color</label>
        <input onMouseEnter={e => {
                            setStyle2('block')
                        }}
                        onMouseLeave={e => {
                            setStyle2('none')
                        }} type="text" className="form-control" placeholder="Color"  value={color}
           onFocus={(e) => e.target.select()}
            onChange={(e) => setColor(e.target.value)}/>
        </div>
      
        </div>

        <div className="form-row">
      
        <div className="form-group col-md-4">
            <label >Vehicle No</label>
            <input onMouseEnter={e => {
                            setStyle3('block')
                        }}
                        onMouseLeave={e => {
                            setStyle3('none')
                        }} type="text" className="form-control" placeholder="Vehicle NO" value={vehicleNO}
              onFocus={(e) => e.target.select()}
            onChange={(e) => setVehicleNO(e.target.value)} />
        </div>
      
        </div>
        <div className="form-group">

        </div>
        <Button.Ripple color='primary'   disabled={isButtonDisabled} onClick={addVehicle}>
                Add Vehicle
              </Button.Ripple>
        </form>)}
        </div>
    )
} 

export default addVehicleDetails
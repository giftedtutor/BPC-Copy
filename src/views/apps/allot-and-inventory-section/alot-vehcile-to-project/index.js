import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import moment from 'moment'

const AllotVehicleToProject = () => {
    
  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')

  const [EmployeeName, setEmployeeName] = useState([])
  const [EmployeeID, setEmployeeID] = useState('')
    const [purchaseOrder, setPurchaseOrder] = useState(0)
    
    const [stylee, setStyle] = useState('none')
    const [style2, setStyle2] = useState('none')

    const [Category, setCategory] = useState([])
    const [SubCategory, setSubCategory] = useState([])
    const [Item, setItem] = useState([])
    const [unitPrice, setUnitPrice] = useState([])
    const [quantity, setQuantity] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const [returnDate, setReturnDate] = useState([])
    const [numberOfRow, setNumberOfRow] = useState(0)
    const [indexUni, setIndexUni] = useState(0)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    

    // table 2
    const [Product, setProduct] = useState([])
    const [ProductType, setProductType] = useState([])
    const [Size, setSize] = useState([])
    const [quantity2, setQuantity2] = useState([])


    const [previousBalance, setPreviousBalance] = useState('')
    const [totalBill, setTotalBill] = useState(0)

     const [Stocks, setStocks] = useState([])
     const [stock, setStock] = useState(0)

    const [toProduce, setToProduce] = useState([])
    const [productTypeArray, setProductTypeArray] = useState([]) 

    const [getCategory, setGetCategory] = useState([])
    const [getSubCategory, setSubGetCategory] = useState([])
    const [getItem, setGetItem] = useState([])
    const [GetVehicles, setGetVehicles] = useState([])
    const [VehicleID, setVehicleID] = useState()
    const [VehiclesArray, setVehiclesArray] = useState([])

    const [getCategoryNested, setGetCategoryNested] = useState([])
    const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
    const [getItemsNested, setGetItemsNested] = useState([])
    const [FirstQArray, setFirstQArray] = useState([])
  
    const [getProductNested, setGetProductNested] = useState([])
    const [getProductTypeNested, setGetProductTypeNested] = useState([])
    const [getProductSizeNested, setGetProductSizeNested] = useState([])

    const [isLoading, setLoading] = useState(true)
    const history = useHistory()
    const [v, setV] = useState(0)
    let todayDate = new Date()
    const dd = String(todayDate.getDate()).padStart(2, '0')
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = todayDate.getFullYear()
  
    todayDate = `${yyyy}-${mm}-${dd}`
    const [currentDate, setCurrentDate] = useState(todayDate)
    // 
    const [rows, setRows] = useState([])
    const [Plus, setPlus] = useState(0)
    const [Plus2, setPlus2] = useState(0)
 
    const [rows2, setRows2] = useState([])
  
    const alotInventory = () => {
      setIsButtonDisabled(true)

          if (VehicleID === '') {
            toast('Please Select a Project!')
          }  else if (currentDate === '') {
            toast('Please Choose currentDate!')
          } else if (GetVehicles.length === 0) {
            toast('Currently You Have No Vehicle To Allot, Add Vehicle First!')
          } else if (VehicleID  !== '' && currentDate !== '') {   
        fetch(`${baseURL}/alotVehicle`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              projectID: ProjectAPIID,
              currentDate,
              rows
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Vehicle Alloted Successfully") {
       
                toast('Vehicle Allotted Successfully')
                history.push('/BPC/apps/alot-to-project-listing/list')
      
            } else {
                toast('Vehicle did not Allot, Please try again ')
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

    const handleChange = idx => e => {
      const { name, value } = e.target
      VehiclesArray[idx] = value
        const rowss = [...rows]
        rowss[idx] = {
          vehicleID: value
        }
        setRows(rowss)
     
      }
    const handleAddRow = () => {
      const item = {
       vehicleID: ""

      }
     setRows([...rows, item])
    }

    const handleRemoveSpecificRow = (idx) => {
      const rowss = [...rows]
      const RemoveRow1 = rowss.splice(idx, 1)
      setRows(rowss)
    }

      useEffect(() => {
     
      Axios.get(`${baseURL}/getprojectsDropdown`)
      .then(response => {
        setProjectName(response.data.projects)
        setLoading(false)
       
      })
      .catch(err => console.log(err))

      Axios.get(`${baseURL}/getNonAlotedVehicles`)
      .then(response => {
        setGetVehicles(response.data.vehicles)
        setLoading(false) 
       
      })
      .catch(err => console.log(err))

      if (getCategory !== '') {
        setLoading(false) 
      }
    }, [Product, Plus2])

    return (
        <div>
          
      {/*  */}
  
             <form>
                  {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
        <div className="form-row">
        <div className="form-group col-md-4">
            <label >Projects</label>
            <select onMouseEnter={e => {
                            setStyle('block')
                        }}
                        onMouseLeave={e => {
                            setStyle('none')
                        }}  class="custom-select" onChange={(e) => setProjectAPIID(e.target.value)}
         onFocus={(e) => e.target.any} 
            required>
            <option>Select Project</option>
            {ProjectName.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-4">
        <label >Date</label>
        <input  onMouseEnter={e => {
                            setStyle2('block')
                        }}
                        onMouseLeave={e => {
                            setStyle2('none')
                        }} type="date" className="form-control" 
                          name="date"
                          value={currentDate}
                           onFocus={(e) => e.target.select()}
                          onChange={(e) => setCurrentDate(e.target.value)}
                           />
         </div>
        </div>)}
        {/*  */}

<div style={{height:1, width: 700}}>
  {/* Just for Space */}
      </div>

     {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
        <div className="table-responsive">
      <table className="table table-striped">
     
     <thead>
     <tr>
         <th scope="col">Vehicles</th>
         <th scope="col">Remove</th>
         
       </tr>
     </thead>
  
     <tbody> 
               {rows.map((cat, idx) => (
                        <tr id={idx} key={idx}>
                        <td>
                         
                       <select class="custom-select"
                       name="vehicle"
                          onChange={handleChange(idx)} 
                         onFocus={(e) => e.target.any} required>
                          
                        <option >Select Vehicle</option>
                        {GetVehicles.map((cat, index) => (
                          <option key={index} value={cat.id} >{cat.name} - {cat.vehicleNO}</option>
                          ))}
                          </select>
                        </td>
                        <td>
                       <Button.Ripple onClick={() => {
                          handleRemoveSpecificRow(idx)
                        }} color='danger'>Remove</Button.Ripple>
                        </td> 
                       </tr>
                ))}
               
     </tbody>
   
     </table>
        </div>)}

        <div className="form-row">
        <div className="form-group col-md-10">
        <Button.Ripple color='primary' class="Right" onClick={() => {
         handleAddRow()
        }}>
               Add New Vehicle
              </Button.Ripple>
              </div>
              <div className="form-group col-md-2">

                <Button.Ripple color='primary'  disabled={isButtonDisabled} onClick={alotInventory}>
                Store
                </Button.Ripple>
                </div>
              </div>

              {/*  */}

              <div style={{height:1, width: 700}}>
          {/* Just for Space */}
              </div>
        </form>
        </div>
    )
} 

export default AllotVehicleToProject
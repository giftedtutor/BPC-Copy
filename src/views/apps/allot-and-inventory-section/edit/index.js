import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const addUnit = () => {
    
    const [UnitID, setUnitID] = useState()
    const [categoryID, setCategoryID] = useState()
    const [SubCategoryID, setSubCategoryID] = useState('')
    const [Name, setName] = useState()
    const [Length, setLength] = useState(0)
    const [Width, setWidth] = useState(0)
    const [MinimumLevel, setMinimumLevel] = useState()
    const [Measure, setMeasure] = useState(0)
    const [getCategory, setGetCategory] = useState([])
    const [getSubCategory, setSubGetCategory] = useState([])
    const [getUnit, setGetUnit] = useState([])
    const [UnitQuantity1, setUnitQuantity1] = useState(0)
    const [UpvcRate, setUpvcRate] = useState(0)
    const [BoqCastingType, setBoqCastingType] = useState(0)
    const [localName, setLocalName] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params
    // const id = 1

    const editCategory = () => {

        Axios.get(`${baseURL}/editItem?id=${id}`)
        .then(response => {
          console.log("Edit:::::::", response.data)

          setSuppliersF(response.data.item)
          const unitFullName = `${response.data.item[0].unit1quantity} ${response.data.item[0].unit1code} ${response.data.item[0].unit2quantity} ${response.data.item[0].unit2code}`
          setUnitID(unitFullName)
          setCategoryID(response.data.item[0].categoryName)
          setSubCategoryID(response.data.item[0].subCategoryName)
          setName(response.data.item[0].name)
          setLength(response.data.item[0].length)
          setWidth(response.data.item[0].width)
          setUpvcRate(response.data.item[0].upvcrate)
          setBoqCastingType(response.data.item[0].Boq_Costing_Type)
          setLocalName(response.data.item[0].localName)
       
          setMinimumLevel(response.data.item[0].minimumLevel)
        //   setMeasure(response.data.item[0].measure)
          console.log('MIIN:::', response.data.item[0].minimumLevel)
          setLoading(false)

        //   setTotal(response.data.Categories.total)
        //   setLoading(false)
        })
        .catch(err => console.log(err))
   }

   useEffect(() => {
    editCategory()
   }, [])
   
    const updateCategory = () => {
         if (UnitID === '') {
            toast('Enter UnitID')
          }  else if (
            UnitID !== ''
          ) {
        fetch(`${baseURL}/updateItem?id=${id}`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                unitID: suppliersF[0].unitID,
                categoryID:suppliersF[0].categoryID,
                subCategoryID: suppliersF[0].subCategoryID, 
                name:Name,
                length: Length, 
                width: Width,
                upvcrate:UpvcRate,
                Boq_Costing_Type:BoqCastingType,
                // measure: Measure,
                minimumLevel: MinimumLevel,
                localName
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Item Updated successfully") {
                console.log(data)
                toast('Item Updated successfully!')
                history.push('/BPC/apps/allot-and-inventory-section/multiple-items-ratelist')
            } else {
                toast('Item Details did not update, Please try again ')
            }
         
        }).catch(err => {
            console.log('ERROR :::: ', err)
        })
    } else {
        toast('Fill out fields correctly!')
    }


    }


    // useEffect(() => {

    //     addCategory()
    // }, [])


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
        <div className="form-group col-md-3">
            <label >Unit </label>
            <input type="text" disabled className="form-control" placeholder="Unit ID " value={UnitID}
            onChange={(e) => setUnitID(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Category </label>
            <input type="text" disabled className="form-control" placeholder="Category " value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Sub Category </label>
            <input type="text" disabled className="form-control" placeholder="Sub Category" value={SubCategoryID}
            onChange={(e) => setSubCategoryID(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Name</label>
            <input type="text" className="form-control" placeholder="Name" value={Name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        </div>
        {/* 2nd row */}

        <div className="form-row">
        <div className="form-group col-md-3">
            <label >Local Name</label>
            <input type="text" className="form-control" placeholder="Name" value={localName}
           style={{textTransform: 'capitalize'}}  onFocus={(e) => e.target.select()} required
            onChange={(e) => setLocalName(e.target.value)} />
        
        </div>
        <div className="form-group col-md-3"> 
         <label >Length</label>
            <input type="text" className="form-control" placeholder="Length" value={Length}
            onChange={(e) => setLength(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Width</label>
            <input type="text" className="form-control" placeholder="Width" value={Width}
            onChange={(e) => setWidth(e.target.value)} />
        </div>
        {/* <div className="form-group col-md-3">
            <label >Measure</label>
            <input type="text" className="form-control" placeholder="Measure"    value={Measure}
            onChange={(e) => setMeasure(e.target.value)} />
        </div> */}
           <div className="form-group col-md-3">
            <label >Minimum Level</label>
            <input type="Number" className="form-control" placeholder="Level" value={MinimumLevel}
            onFocus={(e) => e.target.select()}  
            onChange={(e) => setMinimumLevel(e.target.value)} />
        </div>
       
        </div>
    {/* 3rd Row */}

    <div className="form-row">
    <div className="form-group col-md-3">
            <label >UPVC Rate (PKR)</label>
            <input type="Number" className="form-control" placeholder="Level" value={UpvcRate}
            onFocus={(e) => e.target.select()}  
            onChange={(e) => setUpvcRate(e.target.value)} />
        </div>
       <div className="form-group col-md-3">
       <label >Boq Casting Type</label>
             
             <select class="custom-select" onFocus={(e) => e.target.any} value={BoqCastingType}  onChange={(e) => setBoqCastingType(e.target.value)} required>
             <option>Select Type</option>
           
             <option value='BOQ'>BOQ</option>
             <option value='CASTING'>CASTING</option>
             
                </select>
       </div>
       </div>
   
        <Button.Ripple color='primary' onClick={updateCategory}>
                Update
              </Button.Ripple>
        </form>)}
        </div>
    )
} 

export default addUnit
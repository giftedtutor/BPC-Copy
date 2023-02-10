import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const addInventory = () => {
    
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
  
    const [isLoading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false)
    const [check, setCheck] = useState(0)
    
    const history = useHistory()
    const handleChange = () => {
      setChecked(!checked)

    }
    const AddItem = () => {
         if (UnitID === '') {
            toast('Enter Batch No')
          } else if (
            UnitID !== '' &&
            categoryID !== '' &&
            SubCategoryID !== '' &&
            Name !== ''
         ) {
            let check2
            if (checked === false) {
              setCheck(0)
              check2 = 0
            } else if (checked === true) {
              setCheck(1)
              check2 = 1
            } 

        fetch(`${baseURL}/items`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                unitID: UnitID,
                categoryID,
                subCategoryID: SubCategoryID, 
                name:Name,
                length: 0, 
                width: 0,
                measure: Measure,
                minimumLevel: MinimumLevel,
                useFormula: check2
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Item saved successfully") {
                toast('Item saved successfully!')
                history.push('/BPC/apps/allot-and-inventory-section/list')
            } else {
                toast('Item did not add, Please try again ')
                history.push('/BPC/apps/allot-and-inventory-section/add') 
            }
         
        }).catch(err => {
            console.log(err)
        })
    } else {
        toast('Fill out fields correctly!')
    }
  }

    useEffect(() => {
        Axios.get(`${baseURL}/getCategoriesDropdown`)
        .then(response => {
          setGetCategory(response.data.Categories)
   
        })
        .catch(err => console.log(err))
        // 
        Axios.get(`${baseURL}/getSubCatByCatID?categoryID=${categoryID}&&sort=asc&&colName=id`)
        .then(response => {
          setSubGetCategory(response.data.subCategories)
        })
        .catch(err => console.log(err))
        // 
        Axios.get(`${baseURL}/getUnitsDropdown`)
        .then(response => {
          setGetUnit(response.data.Units) 
          setLoading(false) 
        })
        .catch(err => console.log(err))
 
        Axios.get(`${baseURL}/editUnit?id=${UnitID}`)
        .then(response => {
         setUnitQuantity1(response.data.unit.unit1quantity)
         
        })
        .catch(err => console.log(err))
   
      }, [categoryID, UnitID])


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
            <label >Unit</label>
             
            <select class="custom-select" onFocus={(e) => e.target.any} required onChange={(e) => setUnitID(e.target.value)} >
            <option>Select Unit</option>
            {getUnit.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.unit1quantity} {cat.unit1code} = {cat.unit2quantity} {cat.unit2code}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Category </label>
             
            <select class="custom-select" onFocus={(e) => e.target.any}   onChange={(e) => setCategoryID(e.target.value)} required>
            <option>Select Category</option>
            {getCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Sub Category</label>
             
            <select class="custom-select" onFocus={(e) => e.target.any} onChange={(e) => setSubCategoryID(e.target.value)} required>
            <option>Select Sub Category</option>
            {getSubCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Name</label>
            <input type="text" className="form-control" placeholder="Name" value={Name}
           onFocus={(e) => e.target.select()} required
            onChange={(e) => setName(e.target.value)} />
        </div>
        </div>
        {/* 2nd row */}

        <div className="form-row">
       
        <div className="form-group col-md-3">
            <label >Measure</label>
            <input type="text" className="form-control" placeholder="Measure"   value={Measure}
            onChange={(e) => setMeasure(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Minimum Level</label>
            <input type="Number" className="form-control" placeholder="Level" value={MinimumLevel}
            onFocus={(e) => e.target.select()}  
            onChange={(e) => setMinimumLevel(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Check it, if you want to use Formula!</label>
            <input  className="form-control" type="checkbox"
          checked={checked} 
          onChange={handleChange}
            onFocus={(e) => e.target.any}  
          />
        </div>
        </div>
    
        <Button.Ripple color='primary' onClick={AddItem}>
                Add Stock
              </Button.Ripple>
        </form>)}
        </div>
    )
}  

export default addInventory
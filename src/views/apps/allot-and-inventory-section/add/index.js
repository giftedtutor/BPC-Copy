import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { width } from '@mui/system'

const addInventory = () => {
    
    const [UnitID, setUnitID] = useState()
    const [categoryID, setCategoryID] = useState()
    const [SubCategoryID, setSubCategoryID] = useState('')
    const [Name, setName] = useState()
    const [localName, setLocalName] = useState()
    const [Length, setLength] = useState(19)
    const [Width, setWidth] = useState(1)
    const [MinimumLevel, setMinimumLevel] = useState(11)
    const [Measure, setMeasure] = useState(0)
    const [getCategory, setGetCategory] = useState([])
    const [getSubCategory, setSubGetCategory] = useState([])
    const [getUnit, setGetUnit] = useState([])
    const [UnitQuantity1, setUnitQuantity1] = useState(0)
    const [UpvcRate, setUpvcRate] = useState(200)
    const [BoqCastingType, setBoqCastingType] = useState(0)
    const history = useHistory()

    const [stylee, setStyle] = useState('none')
    const [style2, setStyle2] = useState('none')
    const [style3, setStyle3] = useState('none')
    const [style33, setStyle33] = useState('none')
    const [style4, setStyle4] = useState('none')
    const [style5, setStyle5] = useState('none')
    const [style6, setStyle6] = useState('none')
    const [style7, setStyle7] = useState('none')
    const [style8, setStyle8] = useState('none')
    const [style9, setStyle9] = useState('none')

    const AddItem = () => {
        console.log('nnnnnnn....', UnitID)
         if (UnitID === undefined || '') {
            toast('Enter Unit Number')
          } else if (categoryID === undefined || '') { 
             toast('Select Category!')
          } else if (SubCategoryID === undefined || '') { 
            toast('Select SubCategory!')
         } else if (Name === '') { 
            toast('Enter Name!')
         } else if (Length === '') { 
            toast('Enter Length!')
         } else if (Width === '') { 
            toast('Enter Width!')
         } else if (MinimumLevel === '') { 
            toast('Enter Minimum Level!')
         } else if (UpvcRate === '') { 
            toast('Enter UPVCRate!')
         } else if (
            UnitID !== '' &&
            categoryID !== '' &&
            SubCategoryID !== '' &&
            Name !== ''
         
            // Length !== '' &&
            // Width !== '' &&
            // MinimumLevel !== ''
          ) {

        fetch(`${baseURL}/addItem`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                unitID: UnitID,
                categoryID,
                subCategoryID: SubCategoryID, 
                name:Name,
                length: Length, 
                width: Width,
                upvcrate:UpvcRate,
                Boq_Costing_Type: 'COSTING',
                localName,
                // measure: Measure,
                minimumLevel: MinimumLevel
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Item saved successfully") {
                // console.log(data)
                toast('Item saved successfully!')
                history.push('/BPC/apps/allot-and-inventory-section/multiple-items-ratelist')
            } else {
                toast('Item did not add, Please try again ')
            }
         
        }).catch(err => {
            console.log('ERROR :::: ', err)
        })
    } else {
        toast('Fill out fields correctly!')
    }


    }

    useEffect(() => {
        Axios.get(`${baseURL}/getCategoriesItems`)
        .then(response => {
          console.log('Catgeories::::::::', response.data.Categories)
          setGetCategory(response.data.Categories)
        //   setLoading(false) 
        })
        .catch(err => console.log(err))
        // 
      
        // // 
        Axios.get(`${baseURL}/getUnitsItem`)
        .then(response => {
        //   console.log('units ::::::::::', response.data.units)
          setGetUnit(response.data.units)  
        })
        .catch(err => console.log(err))
        
      }, [])

      const getSubCatByCatID = (catID) => {
        Axios.get(`${baseURL}/getSubCatByCatID?categoryID=${catID}&&sort=ASC&&colName=id`)
        .then(response => {
        //   console.log('Sub Cate:::::', response.data.subCategories)
          setSubGetCategory(response.data.subCategories)
        })
        .catch(err => console.log(err))
      }

    return (
        <div>
             <form>
        <div className="form-row">
        <div className="form-group col-md-3">
            <label >Unit</label>
             
            <select onMouseEnter={e => {
                            setStyle('block')
                        }}
                        onMouseLeave={e => {
                            setStyle('none')
                        }}  class="custom-select" onFocus={(e) => e.target.any} required onChange={(e) => setUnitID(e.target.value)} >
            <option>Select Unit</option>
            {getUnit.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.unit1quantity} {cat.unit1code} = {cat.unit2quantity} {cat.unit2code}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Category </label>
             
            <select  onMouseEnter={e => {
                            setStyle2('block')
                        }}
                        onMouseLeave={e => {
                            setStyle2('none')
                        }}  class="custom-select" onFocus={(e) => e.target.any} required  onChange={(e) => {

                        setCategoryID(e.target.value)
                        getSubCatByCatID(e.target.value)
                    } }>
            <option>Select Category</option>
            {getCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Sub Category</label>
             
            <select onMouseEnter={e => {
                            setStyle3('block')
                        }}
                        onMouseLeave={e => {
                            setStyle3('none')
                        }} class="custom-select" onFocus={(e) => e.target.any} required  onChange={(e) => setSubCategoryID(e.target.value)} >
            <option>Select Sub Category</option>
            {getSubCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
        </div>
        <div className="form-group col-md-3">
            <label >Name</label>
            <input onMouseEnter={e => {
                            setStyle5('block')
                        }}
                        onMouseLeave={e => {
                            setStyle5('none')
                        }}  type="text" className="form-control" placeholder="Name" value={Name}
           style={{textTransform: 'capitalize'}}  onFocus={(e) => e.target.select()} required
            onChange={(e) => setName(e.target.value)} />
        </div>
        </div>
        {/* 2nd row */}

        <div className="form-row">
        <div className="form-group col-md-3">
            <label >Local Name</label>
            <input  type="text" className="form-control" placeholder="Local NAme" value={localName}
           style={{textTransform: 'capitalize'}}  onFocus={(e) => e.target.select()} required
            onChange={(e) => setLocalName(e.target.value)} />
         
        </div>
        <div className="form-group col-md-3">
            <label >Length</label>
            <input onMouseEnter={e => {
                            setStyle6('block')
                        }}
                        onMouseLeave={e => {
                            setStyle6('none')
                        }} type="Number" className="form-control" placeholder="Length" onFocus={(e) => e.target.select()}   value={Length}
            onChange={(e) => setLength(e.target.value)} />
        </div>
        <div className="form-group col-md-3">
            <label >Width</label>
            <input onMouseEnter={e => {
                            setStyle7('block')
                        }}
                        onMouseLeave={e => {
                            setStyle7('none')
                        }} type="Number" className="form-control" placeholder="Width" onFocus={(e) => e.target.select()}    value={Width}
            onChange={(e) => setWidth(e.target.value)} />
       </div>
        <div className="form-group col-md-3">
            <label >Minimum Level</label>
            <input onMouseEnter={e => {
                            setStyle4('block')
                        }}
                        onMouseLeave={e => {
                            setStyle4('none')
                        }} type="Number" className="form-control" placeholder="Level" value={MinimumLevel}
            onFocus={(e) => e.target.select()}  
            onChange={(e) => setMinimumLevel(e.target.value)} />
       </div>
     
        </div>
    {/* 3rd Row */}

    <div className="form-row">
    <div className="form-group col-md-3">
            <label >UPVC Rate (PKR)</label>
            <input onMouseEnter={e => {
                            setStyle8('block')
                        }}
                        onMouseLeave={e => {
                            setStyle8('none')
                        }}  type="Number" className="form-control" placeholder="Level" value={UpvcRate}
            onFocus={(e) => e.target.select()}  
            onChange={(e) => setUpvcRate(e.target.value)} />
       </div>
     
       </div>
   
        <Button.Ripple color='primary' onClick={AddItem}>
                Add Item
              </Button.Ripple>
        </form>
        </div>
    )
}  

export default addInventory
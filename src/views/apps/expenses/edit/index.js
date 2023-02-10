import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'

const addUnit = () => {
    
    const [name, setName] = useState('')
    const [ProductID, setProductID] = useState('')
    const [getProducts, setGetProducts] = useState('')

    const history = useHistory()
    const location = useLocation()
    const [suppliersF, setSuppliersF] = useState([])
    const [isLoading, setLoading] = useState(true)
    const id = location.state.params
    // const id = 1

    const editClient = () => {

        Axios.get(`http://thesfb.live/Eastern-highway/api/editProductType?id=${id}`)
        .then(response => {
          setSuppliersF(response.data.productType)
          setName(response.data.productType.name)
          setProductID(response.data.productType.productID)
         
        })
        .catch(err => console.log(err))
   }

   useEffect(() => {
    editClient()
    Axios.get(`http://thesfb.live/Eastern-highway/api/getProducts?sort=asc&&colName=id`)
    .then(response => {
      setGetProducts(response.data.products.data)
      setLoading(false) //stop loading when data is fetched
     
    })
    .catch(err => console.log(err))
   }, [])
   
    const updateClients = () => {
         if (name === '') {
            toast('Enter Name')
          }  else if (
            name !== ''
          ) {
        fetch(`http://thesfb.live/Eastern-highway/api/updateProductType?id=${id}`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,
                name
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "Product type Updated successfully") {
          
                toast('Product Type Updated successfully!')
                history.push('/BPC/apps/productType/list')
            } else {
                toast('Product type did not update, Please try again ')
               
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
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
                        <form>
                        <div className="form-row">
                        <div className="form-group col-md-6">
                        <label>Product Name</label>
                      
                            <select class="custom-select" onChange={(e) => setProductID(e.target.value)} 
                            value={ProductID}
                             onFocus={(e) => e.target.any} 
                            required>
                              <option>Select Product</option>
                            {getProducts.map((cat, index) => (
                              <option key={index} value={cat.id}>{cat.name}</option>
                               ))} 
                               </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label >Product Type's Name</label>
                            <input type="text" className="form-control" placeholder="Name" value={name}
                            style={{textTransform: 'capitalize'}}  onFocus={(e) => e.target.select()} required
                            onChange={(e) => setName(e.target.value)} />
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
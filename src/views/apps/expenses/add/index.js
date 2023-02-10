import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
// import Cookies from 'js-cookie'
const expenses = () => {

  const [File, setFile] = useState('')
  const [balance, setBalance] = useState(0)
    
  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')
  const [style4, setStyle4] = useState('none')

  const [Category, setCategory] = useState('')
  const [CategoryID, setCategoryID] = useState('')
  const [SubCategory, setSubCategory] = useState('')
  const [Amount, setAmount] = useState('')
  const [Description, setDescription] = useState('')
    
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [GetCategory, setGetCategory] = useState([])
    const [GetSubCategory, setGetSubCategory] = useState([])
    const [isButtonDisabled2, setIsButtonDisabled2] = useState(false)

    const [isLoading, setLoading] = useState(true)
    const current = new Date()
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    const history = useHistory()
    
    const addSubCat = () => {
      setIsButtonDisabled(true)
      if (CategoryID === '') {
        toast('Enter CategoryID Name!')
      }  else if (CategoryID !== '' && Description !== '' && Amount !== '' && SubCategory !== '') {

          fetch(`${baseURL}/Expensestore`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              expCatID:Number(CategoryID),
              expSubCatID: Number(SubCategory),
                description: Description,
                amount: Amount,
                date
            })
        }).then(res => res.json()).then(data => {
              if (data.result === "Expense saved successfully") {
                
                  toast('Expense saved successfully!')
                  history.push('/BPC/apps/expenses/list')
              } else {
                  toast('Expense did not add, Please try again ')
                 
              }
           
          }).catch(err => {
              console.log(err)
          })
      } else {
          toast('Fill out all fields correctly!')
      }

    setTimeout(() => { 
      setIsButtonDisabled(false)
    }, 3000)

    }
 const getSubCat = (val) => {
  Axios.get(`${baseURL}/getExpenseSubCat/${val}`)
  .then(response => {
    setGetSubCategory(response.data.subcategories)
    setLoading(false) //stop loading when data is fetched
   
  })
  .catch(err => console.log(err))
 }
    useEffect(() => {
      Axios.get(`${baseURL}/getExpenseCat`)
      .then(response => {
        setGetCategory(response.data.categories)
        setLoading(false) //stop loading when data is fetched
       
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
            <div className="form-group col-md-3">
        <label>Category</label>
      
            <select onMouseEnter={e => {
                            setStyle('block')
                        }}
                        onMouseLeave={e => {
                            setStyle('none')
                        }} class="custom-select" onChange={(e) => {
              setCategoryID(e.target.value)
              getSubCat(e.target.value)
              setGetSubCategory([])
            }}
             onFocus={(e) => e.target.any}  disabled={isButtonDisabled2}
            required>
              <option>Select Category</option>
            {GetCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
         </div> 
        <div className="form-group col-md-3">
        <label> Sub Category</label>
      
            <select onMouseEnter={e => {
                            setStyle2('block')
                        }}
                        onMouseLeave={e => {
                            setStyle2('none')
                        }}  class="custom-select" disabled={isButtonDisabled2} onChange={(e) => setSubCategory(e.target.value)} 
             onFocus={(e) => e.target.any} 
            required>
              <option>Select Sub Category</option>
            {GetSubCategory.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
       </div> 
        <div className="form-group col-md-3">
            <label >Amount</label>
            <input  onMouseEnter={e => {
                            setStyle3('block')
                        }}
                        onMouseLeave={e => {
                            setStyle3('none')
                        }} type="Number" disabled={isButtonDisabled2} className="form-control" placeholder="Amount" value={Amount}
             onFocus={(e) => e.target.select()} required
            onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="form-group col-md-3">
            <label >Description</label>
            <input onMouseEnter={e => {
                            setStyle4('block')
                        }}
                        onMouseLeave={e => {
                            setStyle4('none')
                        }} type="text" className="form-control" placeholder="Describe here ...." value={Description}
            disabled={isButtonDisabled2} onFocus={(e) => e.target.select()} required
            onChange={(e) => setDescription(e.target.value)} />
        </div>

          </div>
          <div className="form-row">
         
        </div>
        <Button.Ripple color='primary'   disabled={isButtonDisabled} onClick={addSubCat}>
                Add
              </Button.Ripple>
        </form>)}
        </div>
    )
} 

export default expenses
import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const createExpenseAccount = () => {

  const [Category, setCategory] = useState('')
  const [CategoryID, setCategoryID] = useState('')
  const [SubCategory, setSubCategory] = useState('')
  const [ProductID, setProductID] = useState('')
  const [GetCategory, setGetCategory] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [Inc, SetInc] = useState(0)

  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')

  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  const addCat = () => {
    setIsButtonDisabled(true)
    if (Category === '') {
      toast('Enter Category Name!')
    } else if (Category !== '') {

      fetch(`${baseURL}/Expensecatstore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          categoryName: Category
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Expense category saved successfully") {

            toast('Expense category saved successfully!')
            SetInc(Inc + 1)
          } else {
            toast('Product did not add, Please try again ')
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

  const addSubCat = () => {
    setIsButtonDisabled(true)
    if (CategoryID === '') {
      toast('Enter CategoryID Name!')
    } else if (CategoryID !== '') {

      fetch(`${baseURL}/Expensesubcatstore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catID: Number(CategoryID),
          subCategoryName: SubCategory
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Expense Sub category saved successfully") {
            toast('Expense Sub category saved successfully!')
            history.push('/BPC/apps/expenses/add')
          } else {
            toast('Expense Sub category did not add, Please try again ')
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
    Axios.get(`${baseURL}/getExpenseCat`)
      .then(response => {
        setGetCategory(response.data.categories)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

  }, [Inc])

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

            <div className="form-group col-md-3">
              <label >Category Name</label>
              <input onMouseEnter={e => {
                setStyle('block')
              }}
                onMouseLeave={e => {
                  setStyle('none')
                }} type="text" className="form-control" placeholder="Name" value={Category}
                onFocus={(e) => e.target.select()} required
                onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="form-group col-md-3">

              <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={addCat} style={{ marginTop: 23 }}>
                Save Category
              </Button.Ripple>

            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Category</label>

              <select onMouseEnter={e => {
                setStyle3('block')
              }}
                onMouseLeave={e => {
                  setStyle3('none')
                }} class="custom-select" onChange={(e) => setCategoryID(e.target.value)}
                onFocus={(e) => e.target.any}
                required>
                <option>Select Category</option>
                {GetCategory.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label >Sub Category Name</label>
              <input onMouseEnter={e => {
                setStyle2('block')
              }}
                onMouseLeave={e => {
                  setStyle2('none')
                }} type="text" className="form-control" placeholder="Name" value={SubCategory}
                onFocus={(e) => e.target.select()} required
                onChange={(e) => setSubCategory(e.target.value)} />
            </div>
          </div>


          <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={addSubCat}>
            Add Sub Category
          </Button.Ripple>
        </form>)}
    </div>
  )
}

export default createExpenseAccount
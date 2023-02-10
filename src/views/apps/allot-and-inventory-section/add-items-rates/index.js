import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const AddItemsRates = () => {

  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')


  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')

  const [EmployeeName, setEmployeeName] = useState([])
  const [EmployeeID, setEmployeeID] = useState('')
  const [purchaseOrder, setPurchaseOrder] = useState(0)
  const [date, setDate] = useState('')

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

  const [ItemNotFilterArray, sendNotItemArray] = useState([])
  const [Stocks, setStocks] = useState([])
  const [stock, setStock] = useState(0)

  const [toProduce, setToProduce] = useState([])
  const [productTypeArray, setProductTypeArray] = useState([])

  const [getCategory, setGetCategory] = useState([])
  const [getSubCategory, setSubGetCategory] = useState([])
  const [getItem, setGetItem] = useState([])
  const [GetNonAlotMachines, setGetNonAlotMachines] = useState([])
  const [machineID, setmachineID] = useState()
  const [RateArray, setRateArray] = useState([])

  const [SubCategoryID, setSubCategoryID] = useState('')
  const [CategoryID, setCategoryID] = useState('')


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

  const [rows, setRows] = useState([])
  const [Plus, setPlus] = useState(0)
  const [Plus2, setPlus2] = useState(0)

  const [ItemBaseOnCatAndSubCat, setItemBaseOnCatAndSubCat] = useState([])

  const [rows2, setRows2] = useState([])

  const rest = (idx) => {
    getSubCategoryNested[idx] = ''
    getItemsNested[idx] = ''
    quantity[idx] = ''
    Stocks[idx] = ''

    setRows(rows)

  }

  const reset2 = (idx) => {
    getProductTypeNested[idx] = ''
    getProductSizeNested[idx] = ''
    quantity[idx] = ''
    Stocks[idx] = ''
    setRows2(rows2)

  }

  const parentStock = (val, idx) => {
    Axios.get(`${baseURL}/getProductStock?productID=${Product[idx]}&&productTypeID=${ProductType[idx]}&&size=${val}&&sort=ASC&&colName=id`)
      .then(response => {
        if (response.data.stock !== null) {
          setStock(response.data.stock.quantity) // Parent table 
        } else {
          setStock(0)
        }
      })
      .catch(err => console.log(err))
  }
  const getItems = (val) => {
    Axios.get(`${baseURL}/ListingcatSubItems?catId=${CategoryID}&&subcatId=${val}`)
      .then(response => {
        const filterArray = response.data.items.map(({ id, upvcrate, categoryID, subCategoryID }) => ({ itemID: id, price: upvcrate, categoryID, subCategoryID }))

        sendNotItemArray(response.data.items)
        setRows(filterArray)
      })
      .catch(err => console.log(err))
  }
  const allCat = () => {
    Axios.get(`${baseURL}/getCategoriesFromStock?sort=ASC&&colName=id`)
      .then(response => {
        const arr = getCategoryNested.concat([response.data.categories])
        setGetCategoryNested(arr)
      })
      .catch(err => console.log(err))
  }

  const alotInventory = () => {
    setIsButtonDisabled(true)

    if (CategoryID === '') {
      toast('Please Select a Project!')
    } else if (CategoryID !== '') {
      fetch(`${baseURL}/additemPrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Array: rows
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Item Price saved successfully") {
            toast('Item Rates Saved Successfully!')
            history.push('/BPC/apps/allot-and-inventory-section/list')

          } else {
            toast('Items Rates did not Update, Please try again ')
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
    RateArray[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      itemID: ItemNotFilterArray[idx]?.id,
      price: Number(value),
      categoryID: Number(CategoryID),
      subCategoryID: Number(SubCategoryID)

    }
    setRows(rowss)

  }

  useEffect(() => {
    Axios.get(`${baseURL}/getCategoriesItems`)
      .then(response => {
        setGetCategory(response.data.Categories)
      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getSubCategoriesItems`)
      .then(response => {
        setSubGetCategory(response.data.SubCategories)
      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getUnitsItem`)
      .then(response => {
        setGetUnit(response.data.units)
      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getprojectsDropdown`)
      .then(response => {
        setProjectName(response.data.projects)
        setLoading(false)

      })
      .catch(err => console.log(err))


    Axios.get(`${baseURL}/getNonAlotedMachines`)
      .then(response => {
        setGetNonAlotMachines(response.data.machines)
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
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="form-row">

            <div className="form-group col-md-3">
              <label >Category </label>

              <select onMouseEnter={e => {
                setStyle2('block')
              }}
                onMouseLeave={e => {
                  setStyle2('none')
                }} class="custom-select" onFocus={(e) => e.target.any} required onChange={(e) => setCategoryID(e.target.value)} >
                <option>Select Category</option>
                {getCategory.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <p style={{ border: '1px solid gray', borderRadius: 20, display: style2, width: 220, padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Please Select Category!</p>
            </div>
            <div className="form-group col-md-3">
              <label >Sub Category</label>

              <select onMouseEnter={e => {
                setStyle3('block')
              }}
                onMouseLeave={e => {
                  setStyle3('none')
                }} class="custom-select" onFocus={(e) => e.target.any} required onChange={(e) => {
                  setSubCategoryID(e.target.value)
                  setSubCategoryID(e.target.value)
                  getItems(e.target.value)

                }} >
                <option>Select Sub Category</option>
                {getSubCategory.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <p style={{ border: '1px solid gray', borderRadius: 20, display: style3, width: 240, padding: 10, margin: 10, backgroundColor: 'grey', color: 'white' }}>Please Select Sub Category!</p>
            </div>
          </div>)}
        {/*  */}

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>

        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="table-responsive">
            <table className="table table-striped">

              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Rate</th>


                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>

                      <input type="text" className="form-control" placeholder="Item Name" value={ItemNotFilterArray[idx]?.name}
                        style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} disabled
                      />
                    </td>
                    <td>
                      <input type="Number" className="form-control" placeholder="Rate" value={cat.price}
                        style={{ textTransform: 'capitalize', width: 250 }} onFocus={(e) => e.target.select()}
                        onChange={handleChange(idx)} />
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="form-row">
          <div className="form-group col-md-10">

          </div>
          <div className="form-group col-md-2">

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={alotInventory}>
              Update
            </Button.Ripple>
          </div>
        </div>

        {/*  */}

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>
      </form>
    </div>
  )
}

export default AddItemsRates
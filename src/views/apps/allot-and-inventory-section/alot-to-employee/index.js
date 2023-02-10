import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../baseURL/baseURL'

const AllotToEmployee = () => {

  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')

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

  const [rows2, setRows2] = useState([])

  const rest = (idx) => {
    getSubCategoryNested[idx] = ''
    getItemsNested[idx] = ''
    quantity[idx] = ''
    Stocks[idx] = ''

    setRows(rows)

  }
  const allCat = () => {
    Axios.get(`${baseURL}/getCategoriesFromStock?sort=ASC&&colName=id`)
      .then(response => {
        const arr = getCategoryNested.concat([response.data.categories])
        setGetCategoryNested(arr)

      })
      .catch(err => console.log(err))
  }


  const childStock = (childStockValue, idx) => {

    Axios.get(`${baseURL}/getInvStockByItemID?categoryID=${Category}&&itemID=${childStockValue}&&sort=ASC&&colName=id`)
      .then(response => {

        if (response.data.stock !== null) {
          Stocks[idx] = response.data.stock.quantity
        } else {
          Stocks[idx] = 0
        }
        setRows(rows)
      })
      .catch(err => console.log(err))
  }

  const alotInventory = () => {
    setIsButtonDisabled(true)

    if (EmployeeID === '') {
      toast('Please Select an Employee!')
    } else if (date === '') {
      toast('Please Choose Date!')
    } else if (quantity[indexUni] > Stocks[indexUni]) {
      toast('Inventory Quantity must be less than OR equal to Stock')
    } else if (returnDate[indexUni] === undefined) {
      toast('Please chose Return Date!')
    } else if (quantity === '') {
      toast('Please enter Quantity!')
    } else if (EmployeeID !== '' && returnDate[indexUni] !== undefined && date !== '') {
      fetch(`${baseURL}/alotInventoryToEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employeeID: Number(EmployeeID),
          date,
          invArray: rows
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Inventory alloted to employee successfully") {

            toast('Inventory alloted to employee successfully')
            history.push('/BPC/apps/alot-to-employeeListing/list')
          } else {
            toast('Inventory did not Alot, Please try again ')
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

  const Itemcategory = (sub, idnx, catID) => {
    Axios.get(`${baseURL}/getItemsFromStock?subCategoryID=${sub}&categoryID=${catID}&&sort=ASC&&colName=id`)
      .then(response => {
        getItemsNested[idnx] = response.data.items
        setRows(rows)
        setLoading(false)
      })

  }

  const getCat = (val, idnx) => {

    Axios.get(`${baseURL}/getSubCategoriesFromStock?categoryID=${val}&&sort=ASC&&colName=id`)
      .then(response => {

        getSubCategoryNested[idnx] = response.data.subcategories
        getItemsNested[idnx] = ''

        setRows(rows)
      })
      .catch(err => console.log(err))
  }

  const handleChange = idx => e => {
    const { name, value } = e.target
    rest(idx)
    getCat(value, idx)
    if (Category[idx] !== '' || Category[idx] !== null) {
      Category[idx] = value
      // SubCate(value)
      setPlus(Plus + 1)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: value,
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    } else {
      const c = Category.concat(value)
      setCategory(c)
      setPlus(Plus + 1)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: value,
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    }
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    Itemcategory(value, idx, Category[idx])
    if (SubCategory[idx] !== '' || SubCategory[idx] !== null) {
      SubCategory[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: value,
        itemID: Item[idx],

        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    } else {

      const sc = SubCategory.concat(value)
      setSubCategory(sc)

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: value,
        itemID: Item[idx],
        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    }
  }

  const handleChange3 = idx => e => {
    const { name, value } = e.target
    setIndexUni(idx)
    setItem(value)
    childStock(value, idx)
    if (Item[idx] !== '' || Item[idx] !== null) {
      const i = Item.concat(value)
      setItem(i)
      Item[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        ItemID: value,

        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    } else {

      const i = Item.concat(value)
      setItem(i)

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        ItemID: value,

        inventoryQuantity: quantity[idx],

        returnDate: returnDate[idx]
      }
      setRows(rowss)
    }
  }

  const handleChange5 = idx => e => {
    const { name, value } = e.target
    setIndexUni(idx)
    if (quantity[idx] !== '' || quantity[idx] !== null) {
      quantity[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        inventoryQuantity: value,

        returnDate: returnDate[idx]

      }

      setRows(rowss)
    } else {

      const q = quantity.concat(value)
      setQuantity(q)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],

        inventoryQuantity: value,

        returnDate: returnDate[idx]

      }

      setRows(rowss)
    }

  }

  const handleChange7 = idx => e => {
    const { name, value } = e.target
    if (quantity[idx] !== '' || quantity[idx] !== null) {
      returnDate[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],

        inventoryQuantity: quantity[idx],

        returnDate: value
      }
      setRows(rowss)
      setV(0)
      setNumberOfRow(idx + 1)
    } else {
      const rd = returnDate.concat(value)
      setReturnDate(rd)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],

        inventoryQuantity: quantity[idx],

        returnDate: value
      }
      setRows(rowss)
      setV(0)
      setNumberOfRow(idx + 1)
    }
  }


  const handleAddRow = () => {
    const item = {
      category: "",
      subCategory: "",
      item: "",
      inventoryQuantity: "",
      returnDate: ""

    }
    setRows([...rows, item])
  }
  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getCategoriesFromStock?sort=ASC&&colName=id&&records=90000000000`)
      .then(response => {
        const arr = getCategoryNested.concat([response.data.categories])
        setGetCategoryNested(arr)

      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getLastOrderID?sort=asc&&colName=id`)
      .then(response => {
        setPurchaseOrder((response.data.orderNo) + 1)

      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getProjects?sort=asc&&pageNo=1&&records=200&&colName=id&&table=projects`)
      .then(response => {
        console.log('Data::::::', response.data)
        setProjectName(response.data.projects.data)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getEmployeesDropdown`)
      .then(response => {
        console.log('Employees::::::', response.data)
        setEmployeeName(response.data.employees)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getProductsFromStock?sort=asc&&colName=id`)
      .then(response => {
        const arr = getProductNested.concat([response.data.products])
        setGetProductNested(arr)

        setLoading(false)
      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getVehicles?pageNo=1&&records=200&&sort=asc&&colName=id`)
      .then(response => {
        setGetVehicles(response.data.vehicles.data)
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
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Employee</label>
            <select class="custom-select" onChange={(e) => setEmployeeID(e.target.value)}
              onFocus={(e) => e.target.any}
              required>
              <option>Select Employee</option>
              {EmployeeName.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name} - {cat.department}</option>
              ))}
            </select>

          </div>
          <div className="form-group col-md-4">
            <label >Date</label>
            <input type="date" className="form-control"
              name="Date"
              value={date}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
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
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Item</th>

                  <th scope="col">Quantity</th>
                  <th scope="col">Stocks</th>

                  <th scope="col">Return Date</th>
                  <th scope="col">Remove</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>

                      <select class="custom-select" style={{ width: 150 }}
                        name="category"
                        onChange={handleChange(idx)}
                        onFocus={(e) => e.target.any} required>

                        <option >Select Category</option>
                        {getCategoryNested[idx] && getCategoryNested[idx].map((cat, index) => (
                          <option key={index} value={cat.id} >{cat.categoryName}</option>
                        ))}
                      </select>
                    </td>

                    <td>

                      <select class="custom-select" style={{ width: 150 }}
                        onFocus={(e) => e.target.any}
                        name="subCategory"
                        onChange={handleChange2(idx)}
                        required>

                        <option >Select Sub Category</option>
                        {getSubCategoryNested[idx] && getSubCategoryNested[idx].map((cat, index) => (
                          <option key={index} value={cat.id} >{cat.subcategoryName}</option>
                        ))}
                      </select>
                    </td>

                    <td>

                      <select class="custom-select" style={{ width: 150 }}
                        name="item"
                        value={rows[idx].itemID}
                        onChange={handleChange3(idx)}
                        onFocus={(e) => e.target.any}
                        required>
                        <option >Select Item</option>
                        {getItemsNested[idx] && getItemsNested[idx].map((cat, index) => (
                          <option key={index} value={cat.id} >{cat.itemName}</option>
                        ))}
                      </select>
                    </td>


                    <td>
                      <input type="Number" className="form-control" style={{ width: 100 }}
                        name="quantity"
                        onFocus={(e) => e.target.select()} required
                        value={rows[idx].quantity}
                        onChange={handleChange5(idx)}
                        placeholder="Quantity" />
                    </td>

                    <td>
                      <input type="Number" className="form-control" style={{ width: 100 }}
                        name="Stocks" disabled
                        // value={rows[idx].Stocks}
                        value={Stocks[idx] && Stocks[idx]}
                        placeholder="" />
                    </td>

                    <td>
                      <input type="date" className="form-control" style={{ width: 100 }}
                        name="returnDate"
                        value={rows[idx].returnDate}
                        onChange={handleChange7(idx)}
                        placeholder="returnDate" />
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
              allCat()
            }}>
              Add New Item
            </Button.Ripple>
          </div>
          <div className="form-group col-md-2">

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={alotInventory}>
              Store
            </Button.Ripple>
          </div>
        </div>

        {/*  */}

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>
        <div className="form-row">

        </div>


      </form>
    </div>
  )
}

export default AllotToEmployee
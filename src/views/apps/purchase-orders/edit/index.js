import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { useLocation } from "react-router-dom"
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const Edit = () => {

  const [SupplierName, setSupplierName] = useState('')
  const [purchaseOrder, setPurchaseOrder] = useState()
  const [flag, setFlag] = useState(0)
  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const [Item, setItem] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [tax, setTax] = useState()
  const [numberOfRow, setNumberOfRow] = useState([])
  const [orderDate, setOrderDate] = useState('')
  const [currentPay, setCurrentPay] = useState(0)
  const [payType, setPayType] = useState(0)
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [salePrice, setSalePrice] = useState([])

  const [AvailableQuantity, setAvailableQuantity] = useState([])
  const [v, setV] = useState(0)
  const [CategoryName, setCategoryName] = useState([])
  const [SubCategoryName, setSubCategoryName] = useState([])
  const [ItemName, setItemName] = useState([])
  const [previousBalance, setPreviousBalance] = useState('')
  const [totalBill, setTotalBill] = useState(20)
  const [getCategory, setGetCategory] = useState('')
  const [getSubCategory, setSubGetCategory] = useState('')
  const [getItem, setGetItem] = useState('i')
  const [isLoading, setLoading] = useState(true)
  const [parentID, setParentID] = useState([])
  const [childID, setChildID] = useState([])

  const [UnitName, setUnitName] = useState([])
  const [UnitIDD, setUnitIDD] = useState([])
  const [Measure, setMeasure] = useState([])

  const [rows, setRows] = useState([{}])
  const [rowsAPI, setRowsAPI] = useState([])

  const history = useHistory()
  const location = useLocation()
  const [suppliersF, setSuppliersF] = useState([])
  const [supplierID, setSupplierID] = useState(0)
  const [rowsIt, setRowsIt] = useState([])
  const [uploadFile, setUploadFile] = useState()

  const id = location.state.params
  const editData = () => {

    Axios.get(`${baseURL}/editOrder?id=${id}`)
      .then(response => {
        setSuppliersF(response.data.order[0]) // order and items
        setPurchaseOrder(response.data.order[0].id)
        setOrderDate(response.data.order[0].date)
        setTotalBill(response.data.order[0].totalAmount)
        setCurrentPay(response.data.order[0].paid)
        setPreviousBalance(response.data.order[0].remaining)
        setStatus(response.data.order[0].status)
        setSupplierName(response.data.order[0].supplierName)
        setSupplierID(response.data.order[0].supplierID)
        setPayType(response.data.order[0].paymentType)
        setDescription(response.data.order[0].description)
        setTax(response.data.order[0].tax)
        const rrr = response.data.items.map(({ categoryID, id, itemID, quantity, subCategoryID, availableQuantity, measure, price, salePrice, unitID }) => ({ categoryID, childID: id, itemID, quantity, subCategoryID, availableQuantity, measure, price, salePrice, unitID }))
        setRows(rrr)
        setRowsIt(response.data.items)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    editData()
  }, [])

  const changeHandlerFile = (event) => {
    event.preventDefault()
    setUploadFile(event.target.files[0])
    setFlag(1)

  }

  const up = () => {
    rowsIt.map((cat, idx) => {
      Category[idx] = cat.categoryID
      SubCategory[idx] = cat.subCategoryID
      Item[idx] = cat.itemID

      unitPrice[idx] = cat.price
      quantity[idx] = cat.quantity
      parentID[idx] = cat.ParenID
      childID[idx] = cat.id
      salePrice[idx] = cat.salePrice
      Measure[idx] = cat.measure
      UnitIDD[idx] = cat.unitID
      UnitName[idx] = cat.unit1name
      CategoryName[idx] = cat.categoryName
      SubCategoryName[idx] = cat.subcategoryName
      ItemName[idx] = cat.itemName
      AvailableQuantity[idx] = cat.availableQuantity
    })
  }
  up()
  const updateOrder = () => {
    if (Category === '') {
      toast('Category are required')
    } else if (SubCategory === '') {
      toast('Sub Category should not be nulled')
    } else if (Item === '') {
      toast('Item should not be nulled')
    } else if (quantity === '') {
      toast('Quantity should not be nulled')
    } else if (unitPrice === '') {
      toast('Unit Price should not be nulled')
    } else if (tax === '') {
      toast('Tax field should not be nulled')
    } else if (orderDate === null || orderDate === '') {
      toast('Provide Order Date')
    } else if (payType === null || payType === '') {
      toast('Select Payment Type')
    } else if (supplierID === '') {
      toast('Select Supplier')
    } else if (salePrice === '' || salePrice === null) {
      toast('Enter Sale Price')
    } else if (
      Category !== '' &&
      supplierID !== '' &&
      totalBill !== '' &&
      purchaseOrder !== '' &&

      payType !== null &&
      salePrice !== null &&

      orderDate !== null
    ) {
      const formData = new FormData()
      formData.append("file", uploadFile)
      const data = JSON.stringify({
        supplierID,
        totalAmount: totalBill,
        rows,
        orderID: purchaseOrder,
        paid: currentPay,
        remaining: previousBalance,
        paymentType: payType,
        description,
        tax,
        flag

      })
      formData.append("data", data)
      Axios.post(`${baseURL}/updateOrder?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(data => {
          if (data.data.result === "Order updated successfully") {

            toast('Order updated successfully!')
            history.push('/BPC/apps/purchase-orders/list')
          } else {
            toast('Order did not update, Please try again ')

          }

        }).catch(err => {
          console.log(err)
        })
    } else {
      toast('Fill out fields correctly!')
    }


  }

  const handleChange = idx => e => {
    const { name, value } = e.target

    const rowss = [...rows]
    rowss[idx] = {
      categoryID: value,
      subCategoryID: rows[idx].subCategoryID,
      itemID: rows[idx].itemID,
      price: rows[idx].price,
      quantity: rows[idx].quantity,
      //  total: (unitPrice * quantity) + Number(value),
      unitID: rows[idx].unitID,
      measure: rows[idx].measure,
      availableQuantity: rows[idx].availableQuantity,
      childID: rows[idx].childID,

      salePrice: rows[idx].salePrice
    }
    setRows(rowss)
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    //  setSubCategory(value)
    const rowss = [...rows]
    rowss[idx] = {
      categoryID: rows[idx].categoryID,
      subCategoryID: value,
      itemID: rows[idx].itemID,
      price: rows[idx].price,
      quantity: rows[idx].quantity,
      //  total: (unitPrice * quantity) + Number(value),
      unitID: rows[idx].unitID,
      measure: rows[idx].measure,
      availableQuantity: rows[idx].availableQuantity,
      childID: rows[idx].childID,

      salePrice: rows[idx].salePrice
    }
    setRows(rowss)
  }

  const handleChange3 = idx => e => {
    const { name, value } = e.target
    //  setItem(value)
    const rowss = [...rows]
    rowss[idx] = {
      categoryID: rows[idx].categoryID,
      subCategoryID: rows[idx].subCategoryID,
      itemID: value,
      price: rows[idx].price,
      quantity: rows[idx].quantity,
      //  total: (unitPrice * quantity) + Number(value),
      unitID: rows[idx].unitID,
      measure: rows[idx].measure,
      availableQuantity: rows[idx].availableQuantity,
      childID: rows[idx].childID,

      salePrice: rows[idx].salePrice
    }
    setRows(rowss)
  }

  const handleChange4 = idx => e => {
    const { name, value } = e.target
    unitPrice[idx] = value
    //  setUnitPrice(unitPrice)
    //  setRows(rows)
    const rowss = [...rows]
    rowss[idx] = {
      categoryID: rows[idx].categoryID,
      subCategoryID: rows[idx].subCategoryID,
      itemID: rows[idx].itemID,
      price: value,
      quantity: rows[idx].quantity,
      //  total: (unitPrice * quantity) + Number(value),
      unitID: rows[idx].unitID,
      measure: rows[idx].measure,
      availableQuantity: rows[idx].availableQuantity,
      childID: rows[idx].childID,

      salePrice: rows[idx].salePrice
    }
    setRows(rowss)
    if (idx === 0) {
      setTotalBill((Number(rows[idx].price * value) + Number(rows[idx].tax)))
    }
  }

  const handleChange5 = idx => e => {
    const { name, value } = e.target

    //  setQuantity(value)

    quantity[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      categoryID: rows[idx].categoryID,
      subCategoryID: rows[idx].subCategoryID,
      itemID: rows[idx].itemID,
      price: rows[idx].price,
      quantity: value,
      //  total: (unitPrice * quantity) + Number(value),
      unitID: rows[idx].unitID,
      measure: rows[idx].measure,
      availableQuantity: rows[idx].availableQuantity,
      childID: rows[idx].childID,

      salePrice: rows[idx].salePrice
    }
    setRows(rowss)

    if (idx === 0) {
      setTotalBill((Number(rows[idx].price * value) + Number(rows[idx].tax)))
    } else if (idx === 1) {
      setTotalBill(totalBill + Number(rows[idx].price * value))
    } else if (idx === 2) {
      setTotalBill(totalBill + Number(rows[idx].price * value))
    } else if (idx === 3) {
      setTotalBill(totalBill + (rows[idx].price * value))
    } else {
      setTotalBill(totalBill + (rows[idx].price * value))
    }

  }

  const handleRemoveRow = (childIDD) => {
    Axios.get(`${baseURL}/deleteOrderChild?orderID=${purchaseOrder}&childID=${childIDD}`)
      .then(data => {
        if (data.result === "Order child deleted sucessfully") {
          toast('Order child deleted sucessfully')
        } else {
          toast('Order child deleted Successfully!')
        }

      }).catch(err => {
        console.log(err)
      })

    setTotalBill(totalBill - totalPrice)
    const RemoveRow = rows.slice(0, -1)
    setRows(RemoveRow)
  }
  const currentPayFtn = (valPay) => {
    setCurrentPay(valPay)
    setPreviousBalance(totalBill - valPay)
  }
  useEffect(() => {
    Axios.get(`${baseURL}/getCategoriesDropdown`)
      .then(response => {
        console.log(response.data.Categories)
        setGetCategory(response.data.Categories)
      })
      .catch(err => console.log(err))
    // 
    Axios.get(`${baseURL}/getSubCatByCatID?categoryID=${Category}&&sort=ASC&&colName=id`)
      .then(response => {
        console.log('Sub Cate:::::', response.data.subCategories)
        setSubGetCategory(response.data.subCategories)
      })
      .catch(err => console.log(err))
    // 
    Axios.get(`${baseURL}/getItemsByCatSubCatID?subCategoryID=${SubCategory}&categoryID=${Category}&&sort=ASC&&colName=id`)
      .then(response => {
        console.log('Items ::::::::::', response.data.items)
        setGetItem(response.data.items)
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [Category, SubCategory])

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

            <div className="form-group col-md-4">
              <label >Supplier Name</label>
              <select class="custom-select" onChange={(e) => setSupplierID(e.target.value)} required>

                <option value={supplierID}>{SupplierName}</option>

              </select>
            </div>

            <div className="form-group col-md-4">
              <label >Purchase Order No</label>
              <input type="text" className="form-control" disabled placeholder="" value={purchaseOrder}
              />
            </div>

            <div className="form-group col-md-4">
              <label >Order Date</label>
              <input type="text" className="form-control" placeholder="" value={orderDate}
              />
            </div>

          </div>
          {/* 2nd row */}

          <div className="form-row">
            <div className="form-group col-md-4">
              <label >Total Bill (PKR)</label>
              <input type="Integer" className="form-control" disabled placeholder="" value={totalBill}
              />
            </div>

            <div className="form-group col-md-4">
              <label >Current Payment/ Paid (PKR)</label>
              <input type="text" className="form-control" placeholder="" value={currentPay}
                onChange={(e) => currentPayFtn(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label >Previous Balance/ Remaining (PKR)</label>
              <input type="text" className="form-control" placeholder="Previous Balance" value={previousBalance}
              />
            </div>

          </div>
          {/* 3rd row */}
          <div className="form-row">
            <div className="form-group col-md-4">
              <label >Payment Type</label>
              <select class="custom-select" value={payType} onChange={(e) => setPayType(e.target.value)} required>
                <option value=''>Select Payment Type</option>
                <option value='Bank'>Bank</option>
                <option value='Cash'>Cash</option>
              </select>

            </div>
            <div className="form-group col-md-4">
              <label >Description</label>
              <textarea className="form-control" placeholder="Describe here ...." value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label  >Upload File (Optional)</label>
              <input type="file" className="form-control"
                onChange={changeHandlerFile} />
            </div>
          </div>


          <div className="table-responsive">

            <table className="table table-striped">

              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Item</th>
                  {/* <th scope="col">Unit</th>
                  <th scope="col">Measure</th> */}
                  <th scope="col">Unit Price (PKR)</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Available Quantity</th>
                  <th scope="col">Total Price (PKR)</th>
                  <th scope="col"></th>
                  <th scope="col">Delete</th>

                </tr>
              </thead>
              {/* Loader */}
              {isLoading ? (
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>) : (
                <tbody>
                  {rowsIt.map((cat, idx) => (
                    <tr>

                      <td>
                        <select class="custom-select" onChange={handleChange(idx)} style={{ width: 200 }} name="category" required>

                          <option value={rows[idx].categoryID}>{CategoryName[idx]}</option>

                        </select>
                      </td>
                      <td>
                        <select class="custom-select" onChange={handleChange2(idx)} style={{ width: 200 }} name="subCategory" required>

                          <option value={rows[idx].subCategoryID}>{SubCategoryName[idx]}</option>

                        </select>
                      </td>

                      <td>


                        <select class="custom-select" onChange={handleChange3(idx)} style={{ width: 200 }} name="item" required>

                          <option value={rows[idx].itemID}>{ItemName[idx]}</option>

                        </select>

                      </td>
                      {/* <td>
                        <input
                          style={{ width: 100 }} disabled value={UnitName[idx]} className="form-control"
                        />

                      </td>

                      <td>

                        <input style={{ width: 100 }} disabled value={Measure[idx]} className="form-control"
                        />

                      </td> */}
                      <td>

                        <input type="Integer" className="form-control" style={{ width: 100 }}
                          name="unitPrice"
                          value={rows[idx].price}
                          onChange={handleChange4(idx)}
                          placeholder='Unit Price' />

                      </td>

                      <td>
                        <input type="Integer" className="form-control" style={{ width: 100 }}
                          name="quantity"
                          value={rows[idx].quantity}
                          onChange={handleChange5(idx)}
                          placeholder="Quantity" />
                      </td>

                      <td>
                        <input style={{ width: 100 }} disabled value={AvailableQuantity[idx]} className="form-control"
                        />

                      </td>


                      <td>

                        <input type="Integer" className="form-control" style={{ width: 100 }}
                          placeholder="" disabled
                          name="total"
                          value={rows[idx].price * rows[idx].quantity}

                        />

                      </td>

                      <td>

                      </td>

                      <td><Button.Ripple onClick={() => handleRemoveRow(cat.id)} color='danger'>Delete</Button.Ripple>
                      </td>

                    </tr>
                  ))}

                </tbody>)}

            </table>
          </div>

          <div className="form-group">

          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label >Tax in Percentage (%)</label>
              <input type="text" className="form-control" placeholder="Tax" value={tax}

                onChange={(e) => setTax(e.target.value)} />
            </div>
            <div className="form-group col-md-10"> </div>
            <div className="form-group col-md-2">

              <Button.Ripple color='primary' onClick={updateOrder}>
                Update
              </Button.Ripple>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default Edit
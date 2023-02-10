import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const AllotInventory = () => {

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`


  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')
  const [purchaseOrder, setPurchaseOrder] = useState(0)

  const [stylee, setfStyle] = useState('none')
  const [style2, setStyle2] = useState('none')

  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const [Item, setItem] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [date, setDate] = useState(todayDate)
  const [numberOfRow, setNumberOfRow] = useState(0)

  // table 2
  const [Product, setProduct] = useState([])
  const [ProductType, setProductType] = useState([])

  const [Stocks, setStocks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [stock, setStock] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [UniIndex1, setUniIndex1] = useState(0)
  const [UniIndex2, setUniIndex2] = useState(0)
  const [RowsForShow, setRowsForShow] = useState([])

  const [getCategory, setGetCategory] = useState([])
  const [getSubCategory, setSubGetCategory] = useState([])
  const [getItem, setGetItem] = useState([])
  const [GetVehicles, setGetVehicles] = useState([])
  const [VehicleID, setVehicleID] = useState()

  const [getCategoryNested, setGetCategoryNested] = useState([])
  const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
  const [getItemsNested, setGetItemsNested] = useState([])
  const [FirstQArray, setFirstQArray] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isButtonDisabledArray, setIsButtonDisabledArray] = useState([])

  const [getProductNested, setGetProductNested] = useState([])
  const [getProductTypeNested, setGetProductTypeNested] = useState([])
  const [getProductSizeNested, setGetProductSizeNested] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const history = useHistory()
  const [v, setV] = useState(0)
  const [rows, setRows] = useState([])
  const [Plus, setPlus] = useState(0)
  const [Plus2, setPlus2] = useState(0)

  const [rows2, setRows2] = useState([])

  useEffect(() => {
    isButtonDisabledArray.forEach((data, index) => {
      if (data === true) {
        setIsButtonDisabled(true)
      }
    })
  }, [isButtonDisabled])

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = parseFloat(clipboardData.getData('text'))

    if (pastedData < 0) {
      e.preventDefault()
    }
  }
  const preventMinus = (e) => {
    if (e.code === 'Minus') {
      e.preventDefault()
    }
  }
  const alotInventory = () => {
    setIsButtonDisabled(true)

    if (ProjectAPIID === '') {
      toast('Please Select a Project')
    } else if (date === '') {
      toast('Please Choose Date!')
      // } else if (Number(quantity) < Number(Stocks[UniIndex1].costQty)) {
      //   toast('Quantity May little greater than Cost Quantity, Not that much you entered!')
    } else if (ProjectAPIID !== '') {
      fetch(`${baseURL}/alotInventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: Number(ProjectAPIID),
          rows,
          date
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Added Successfully") {
            toast('Added Successfully')
            history.push('/BPC/apps/allot-and-inventory-section/list')

          } else {
            toast('Inventory did not Alot, Please try again ')
          }

        }).catch(err => {
          console.log(err)
          toast(`Please fill out all fields correctly, May be you are  missing quantity OR you don't have Stock of that item!`)
        })
    } else {
      toast('Fill out fields correctly!')
    }

    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000)
  }

  const Itemcategory = (sub) => {
    Axios.get(`${baseURL}/getBoqItems?projectID=${sub}`)
      .then(response => {
        setGetItemsNested(response.data.items)
        const result = response.data.items.map(({ itemID, costQty }) => ({ itemID, quantity: 0 }))
        setRows(result)

        const resultForName = response.data.items.map(({ itemID, costQty, stockQty, name }) => ({ itemID, costQty, stockQty, name }))
        setRowsForShow(resultForName)

        setLoading2(false)
      })

  }

  const allCat = (val, idx) => {
    if (val > RowsForShow[idx].stockQty) {
      toast('Quantity must be less than STOCKS Quantity!')
      setIsButtonDisabled(true)
      isButtonDisabledArray[idx] = true
      setIsButtonDisabledArray(isButtonDisabledArray)

    } else if (val > Math.ceil(RowsForShow[idx].costQty)) {
      toast('Quantity shoud not be that much greater than Cost Quantity!')
      setIsButtonDisabled(true)
      isButtonDisabledArray[idx] = true
      setIsButtonDisabledArray(isButtonDisabledArray)
    } else if (val <= RowsForShow[idx].stockQty && val <= Math.ceil(RowsForShow[idx].costQty)) {
      isButtonDisabledArray[idx] = false
      setIsButtonDisabledArray(isButtonDisabledArray)
      setIsButtonDisabled(false)
    }
  }

  const handleChange5 = idx => e => {

    setUniIndex1(idx)
    const { name, value } = e.target
    allCat(value, idx)
    if (quantity[idx] !== '' || quantity[idx] !== null) {
      quantity[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        itemID: rows[idx].itemID,
        quantity: value
      }
      setRows(rowss)
    } else {

      const q = quantity.concat(value)
      setQuantity(q)
      const rowss = [...rows]
      rowss[idx] = {
        itemID: rows[idx].itemID,
        quantity: value

      }

      setRows(rowss)
    }
  }
  useEffect(() => {
    Axios.get(`${baseURL}/getCategoriesFromStock?sort=ASC&&colName=id`)
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
        setProjectName(response.data.projects.data)
        setLoading(false)

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
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

    if (getCategory !== '') {
      setLoading(false)
    }
  }, [Product, Plus2])

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Project</label>
            <select class="custom-select" onChange={(e) => {
              setProjectAPIID(e.target.value)
              Itemcategory(e.target.value)
              setLoading2(true)
            }}
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
            <input onMouseEnter={e => {
              setStyle2('block')
            }}
              onMouseLeave={e => {
                setStyle2('none')
              }} type="date" className="form-control"
              name="quantity"

              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="" />
          </div>
        </div>

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>

        {/* Loader */}
        {isLoading2 ? (
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

                  <th scope="col">Allot Quantity</th>
                  <th scope="col">Cost Quantity</th>
                  <th scope="col">Stocks Quantity</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>
                      <input type="text" className="form-control"
                        value={RowsForShow[idx].name}
                        disabled />
                    </td>

                    <td>
                      <input type="Number" className="form-control"
                        name="quantity"
                        onFocus={(e) => e.target.select()} required
                        value={rows[idx].quantity}
                        onWheel={event => event.currentTarget.blur()}
                        onChange={handleChange5(idx)}
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        placeholder="Quantity" />
                    </td>
                    <td>
                      <input type="Number" className="form-control"
                        name="Stocks" disabled
                        value={Number(RowsForShow[idx].costQty).toFixed(2)} />
                    </td>
                    <td>
                      <input type="Number" className="form-control"
                        name="Stockss" disabled
                        value={RowsForShow[idx].stockQty} />
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
              Store
            </Button.Ripple>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AllotInventory
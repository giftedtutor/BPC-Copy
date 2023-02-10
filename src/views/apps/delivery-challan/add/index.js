import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { map } from 'jquery'
import moment from 'moment'

const deliveryChallan = () => {

  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')
  
  const [purchaseOrder, setPurchaseOrder] = useState(0)

  const [NoFilterArray, setNoFilterArray] = useState(0)
  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')

  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const [Item, setItem] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [numberOfRow, setNumberOfRow] = useState(0)

  // table 2
  const [Product, setProduct] = useState([])
  const [ProductType, setProductType] = useState([])
  const [Size, setSize] = useState([])
  const [quantity2, setQuantity2] = useState([])

  const [previousBalance, setPreviousBalance] = useState('')
  const [totalBill, setTotalBill] = useState(0)

  const [Stocks, setStocks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [stock, setStock] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [UniIndex1, setUniIndex1] = useState(0)
  const [UniIndex2, setUniIndex2] = useState(0)

  const [toProduce, setToProduce] = useState(0)

  const [toQuanitiy, setToQuanitiy] = useState(0)
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [getProductNested, setGetProductNested] = useState([])
  const [getProductTypeNested, setGetProductTypeNested] = useState([])
  const [getProductSizeNested, setGetProductSizeNested] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  
  const history = useHistory()
  const [v, setV] = useState(0)

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  
  const [rows, setRows] = useState([])
  const [Plus, setPlus] = useState(0)
  const [Plus2, setPlus2] = useState(0)
  
  const [rows2, setRows2] = useState([])

  const reset2 = (idx) => {
    getProductTypeNested[idx] = ''
    getProductSizeNested[idx] = ''
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

  const childStock = (itemId, idx) => {

    Axios.get(`${baseURL}/getQuotation2ItemDetails?quotItemID=${itemId}`)
      .then(response => {
        if (response.data.itemDetails === null) {
          Stocks[idx] = 0
        } else {
          Stocks[idx] = response.data.itemDetails
        }

        setRows(rows)

      })
      .catch(err => console.log(err))
  }


  const alotInventory = () => {
    setIsButtonDisabled(true)

    if (ProjectAPIID === '') {
      toast('Please Select a Project')
    } else if (currentDate === '') {
      toast('Please Choose Date!')
    } else if (ProjectAPIID !== '' && currentDate !== '') {
      fetch(`${baseURL}/createDC`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: Number(ProjectAPIID),
          rows,
          currentDate
        })
      }).then(res => res.json())
        .then(data => {
    
          if (data.result === "Delivery Chalan Created Successfully") {
      
            toast('Delivery Chalan Created Successfully')
            history.push('/BPC/apps/delivery-challan/list')
            // window.location.reload()
          } else {
            toast('Delivery Chalan did not Create, Please try again ')
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

  const Itemcategory = (sub) => {
    Axios.get(`${baseURL}/getProjectProductionItems?projectID=${sub}`)
      .then(response => {
        setGetItemsNested(response.data.items)
        setNoFilterArray(response.data.items)
        let ProductQ = 0
        let TotalQ = 0
        const d = response.data.items.map(({ production_item_id, quantity, windowType, producedQty, total_qty, production_date
        }) => ({ production_item_id, quantity, windowType, producedQty, total_qty, production_date }))
        setRows(d)
        response.data.items.forEach((data) => {
          ProductQ += data.producedQty
          TotalQ += Number(data.total_qty)

        })
        setToProduce(ProductQ)
        setToQuanitiy(TotalQ)
        setLoading2(false)
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

  const getNotify = (idx) => {
    if (rows[idx].quantity > NoFilterArray[idx].deviler) {
      toast('Quantity must be less than Stock!')
    }
  }

  const productT = (val, idnx) => {
    Axios.get(`${baseURL}/getProductTypesFromStock?productID=${val}&&sort=asc&&colName=id`)
      .then(response => {
       getProductTypeNested[idnx] = response.data.productT$productTypes
        getProductSizeNested[idnx] = ''

        setRows2(rows2)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const getSize = (val, idx, Prod) => {
    Axios.get(`${baseURL}/getProductSizesFromStock?productID=${Prod}&&productTypeID=${val}&&sort=ASC&&colName=id`)
      .then(response => {
         getProductSizeNested[idx] = response.data.productSizes
         setRows2(rows2)
         setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const handleChange3 = idx => e => {
    const { name, value } = e.target
    setItem(value)
    childStock(value, idx)
    setUniIndex1(idx)
    if (Item[idx] !== '' || Item[idx] !== null) {
      const i = Item.concat(value)
      setItem(i)
      Item[idx] = value
      const rowss = [...rows]
      rowss[idx] = {

        quotItemID: value,

        quantity: quantity[idx]
      }
      setRows(rowss)
    } else {

      const i = Item.concat(value)
      setItem(i)

      const rowss = [...rows]
      rowss[idx] = {

        quotItemID: value,

        quantity: quantity[idx]


      }
      setRows(rowss)
    }
  }

  const handleChange5 = idx => e => {
    getNotify(idx)
    const { name, value } = e.target
    if (quantity[idx] !== '' || quantity[idx] !== null) {
      quantity[idx] = value
      const rowss = [...rows]
      rowss[idx] = {

        quotItemID: rows[idx].id,
        quantity: value
      }

      setRows(rowss)
    } else {

      const q = quantity.concat(value)
      setQuantity(q)
      const rowss = [...rows]
      rowss[idx] = {

        quotItemID: Item[idx],

        quantity: value

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

        quotItemID: Item[idx],

        quantity: quantity[idx]
      }
      setRows(rowss)
      setV(0)
      setNumberOfRow(idx + 1)
    } else {
      const rd = returnDate.concat(value)
      setReturnDate(rd)
      const rowss = [...rows]
      rowss[idx] = {

        quotItemID: Item[idx],

        quantity: quantity[idx]
      }
      setRows(rowss)
      setV(0)
      setNumberOfRow(idx + 1)
    }
  }


  const handleAddRow = () => {
    const item = {

      quotItemID: "",
      
      quantity: ""

    }
    setRows([...rows, item])
  }


  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
  }

  const handleRemoveSpecificRow2 = (idx) => {
    const rowss2 = [...rows2]
    const RemoveRow2 = rowss2.splice(idx, 1)
    setRows2(rowss2)
  }


  const handleChange10 = idx => e => {
    const { name, value } = e.target
    reset2(idx)
    productT(value, idx)
    if (Product[idx] !== '' || Product[idx] !== null) {
      Product[idx] = value
      setPlus2(Plus2 + 1)
      const rowss = [...rows2]
      rowss[idx] = {
        productID: value,
        productTypeID: ProductType[idx],
        size: Size[idx],
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    } else {

      const p = Product.concat(value)
      setProduct(p)
      setPlus2(Plus2 + 1)
      const rowss = [...rows2]
      rowss[idx] = {
        productID: value,
        productTypeID: ProductType[idx],
        size: Size[idx],
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    }
  }

  const handleChange11 = idx => e => {
    setUniIndex2(idx)
    const { name, value } = e.target
    getSize(value, idx, Product[idx])
    if (ProductType[idx] !== '' || ProductType[idx] !== null) {
      ProductType[idx] = value

      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: value,
        size: Size[idx],
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    } else {

      const pt = ProductType.concat(value)
      setProductType(pt)
      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: value,
        size: Size[idx],
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    }
  }

  const handleChange12 = idx => e => {
    const { name, value } = e.target
    parentStock(value, idx)
    setUniIndex2(idx)
    if (Size[idx] !== '' || Size[idx] !== null) {
      Size[idx] = value

      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: ProductType[idx],
        size: value,
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    } else {

      const s = Size.concat(value)
      setSize(s)

      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: ProductType[idx],
        size: value,
        productQuantity: quantity2[idx]
      }
      setRows2(rowss)
    }
  }

  const handleChange13 = idx => e => {
    const { name, value } = e.target
    if (quantity2[idx] !== '' || quantity2[idx] !== null) {
      quantity2[idx] = value

      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: ProductType[idx],
        size: Size[idx],
        productQuantity: value
      }
      setRows2(rowss)
    } else {

      const qq = quantity2.concat(value)
      setQuantity2(qq)
      const rowss = [...rows2]
      rowss[idx] = {
        productID: Product[idx],
        productTypeID: ProductType[idx],
        size: Size[idx],
        productQuantity: value
      }
      setRows2(rowss)
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
    Axios.get(`${baseURL}/dailyProjectProductionDropdown`)
      .then(response => {
       setProjectName(response.data.data)
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
            <select onMouseEnter={e => {
              setStyle('block')
            }}
              onMouseLeave={e => {
                setStyle('none')
              }} class="custom-select" onChange={(e) => {
                setProjectAPIID(e.target.value)
                Itemcategory(e.target.value)
                setLoading2(true)
              }}

              onFocus={(e) => e.target.any}
              required>
              <option>Select Project</option>
              {ProjectName.map((cat, index) => (
                <option key={index} value={cat.projectID}>{cat.projectName}</option>
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
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
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
                  <th scope="col">Sr. No</th>

                  <th scope="col">Product</th>

                  <th scope="col">Produced Quantity</th>
                  <th scope="col">Production Date</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>
                      {idx + 1}

                    </td>

                    <td>
                      {rows[idx].windowType} </td>

                    <td>
                      {rows[idx].quantity}
                    </td>

                    <td>
                      {moment(rows[idx].production_date).format('DD/MM/YYYY')}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="table-responsive">
          <table className="table table-striped">

            <thead>
              <tr>

                <th scope="col">Total Produced Quantity</th>

                <th scope="col">Total Quantity</th>
                <th scope="col">Remaining</th>

              </tr>
              <tr>
                <th className='text-center' scope="col">{toProduce}</th>
                <th className='text-center' scope="col">{toQuanitiy}</th>
                <th className='text-center' scope="col">{toQuanitiy === undefined ? 0 : (toQuanitiy - toProduce)}</th>

              </tr>
            </thead>
          </table>
        </div>
        <div className="form-row">
          <div className="form-group col-md-10">
          </div>
        </div>


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

export default deliveryChallan
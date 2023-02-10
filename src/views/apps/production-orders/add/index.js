import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { RMIUploader } from "react-multiple-image-uploader"
import './fixedTable.css'

const addProductionOrder = () => {
  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')

  const [Item, setItem] = useState([])
  const [quantity, setQuantity] = useState([])

  const [RowsForShow, setRowsForShow] = useState([])
  const [isButtonDisabledArray, setIsButtonDisabledArray] = useState([])

  const [UniIndex1, setUniIndex1] = useState(0)
  const [UniIndex2, setUniIndex2] = useState(0)

  const [productTypeArray, setProductTypeArray] = useState([])

  const [enteredQty, setEnteredQty] = useState(0)
  const [consumedQtyT, setConsumedQtyT] = useState(0)
  const [costingTotalT, setCostingTotalT] = useState(0)
  const [projectQtyTotalT, setProjectQtyTotalT] = useState(0)

  const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
  const [getItemsNested, setGetItemsNested] = useState([])
  const [FirstQArray, setFirstQArray] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [QuantityOfProduct, setQuantityOfProduct] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [getProductNested, setGetProductNested] = useState([])
  const [getProductTypeNested, setGetProductTypeNested] = useState([])
  const [getProductSizeNested, setGetProductSizeNested] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const history = useHistory()

  //current currentDate
  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

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

  const [DCChildren, setDCChildren] = useState([])
  // 
  const [rows, setRows] = useState([])

  const [rows2, setRows2] = useState([])

  const alotInventory = () => {
    setIsButtonDisabled(true)

    let qty = 0
    let pQty = 0
    DCChildren.forEach((data, index) => {
      qty += data.qty
      pQty += data.producedQty
    })
    let Q = 0
    rows2.forEach((data, index) => {
      Q += data.quantity
    })
    
    let allow = false
    rows.forEach((data, index) => {
      if (Number(data.quantity) > data.projectQuantity) {
        console.log('Q P ::::', data.quantity, data.projectQuantity)
        // setIsButtonDisabled(true)
        allow = true
      }
    })
    if (ProjectAPIID === '') {
      toast('Please Select a Project')
    } else if (currentDate === '') {
      toast('Please Choose Date!')
    } else if ((qty - pQty) < Q) {
      toast('Quantity must be less than or equal to Project Quantity for a Product!')
    } else if (allow === true) {
      toast('Quanitty shoud not exced the project Quantity!')
    } else if (ProjectAPIID !== '') {
      fetch(`${baseURL}/addProductionOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: Number(ProjectAPIID),
          items: rows,
          products: rows2
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Production order created successfully") {
            toast('Production order created successfully')
            history.push('/BPC/apps/production-orders/list')
           
          } else {
            toast(`${data?.Error}`)
            setIsButtonDisabled(false)
          }
        }).catch(err => {
          console.log(err)
          toast(`${err}`)
          setIsButtonDisabled(false)
        })
    } else {
      toast('Fill out fields correctly!')
    }

    setTimeout(() => {
      // setIsButtonDisabled(false)
    }, 3000)
  }


  const Itemcategory = (sub) => {
    Axios.get(`${baseURL}/getProjectAlotedInv?projectID=${sub}`)
      .then(response => {
        const result = response.data.items.map(({ id, costing_Qty, consumed_quantity, item_quantity }) => ({ itemID: id, quantity: consumed_quantity === undefined ? (costing_Qty).toFixed(2) : (costing_Qty - consumed_quantity).toFixed(2), costing_Qty, projectQuantity: item_quantity }))
        console.log('rows in fethcng time:::::', result)
        setRows(result)
        const resultForName = response.data.items.map(({ id, name, item_quantity, costing_Qty, consumed_quantity }) => ({ itemID: id, name, item_quantity, quantity: item_quantity, costing_Qty: costing_Qty.toFixed(2), consumed_quantity: consumed_quantity === undefined ? 0 : consumed_quantity }))

        let inputQty = 0
        result.forEach((data) => {
          inputQty += Number(data.quantity)
        })
        setEnteredQty(inputQty)

        setRowsForShow(resultForName)
        let consumedQty = 0
        response.data.items.forEach((data) => {
          if (data?.consumed_quantity === null || data.consumed_quantity === undefined) {
            consumedQty += 0
          } else {
            consumedQty += data.consumed_quantity
          }

        })
        setConsumedQtyT(consumedQty)

        let costingTotal = 0
        response.data.items.forEach((data) => {
          costingTotal += data.costing_Qty
        })
        setCostingTotalT(costingTotal)

        let projectQtyTotal = 0
        response.data.items.forEach((data) => {
          projectQtyTotal += data.item_quantity
        })
        setProjectQtyTotalT(projectQtyTotal)

        setLoading2(false)
      })

  }

  const getInputQtyTotal = () => {
    let inputQty = 0
    rows.forEach((data) => {
      inputQty += Number(data.quantity)
    })
    setEnteredQty(inputQty)
  }

  useEffect(() => {
    if (RowsForShow[UniIndex2]?.item_quantity >= RowsForShow[UniIndex2]?.costing_Qty) {
      setIsButtonDisabled(true)
    } else if (RowsForShow[UniIndex2]?.item_quantity <= RowsForShow[UniIndex2]?.costing_Qty) {
      setIsButtonDisabled(false)
    }

  }, [UniIndex2, UniIndex1])

  useEffect(() => {
    let qty = 0
    let pQty = 0
    DCChildren.forEach((data, index) => {
      qty += data.qty
      pQty += data.producedQty
    })
    let Q = 0
    QuantityOfProduct.forEach((data, index) => {
      Q += data
    })
    if ((qty - pQty) < Q) {
      setIsButtonDisabled(true)
    } else if ((qty - pQty) > Q) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }

  }, [UniIndex1, UniIndex2])

  useEffect(() => {
    isButtonDisabledArray.forEach((data, index) => {
      if (data === true) {
        setIsButtonDisabled(true)
      }
    })
  }, [isButtonDisabled])

  const Compare = (val, idx) => {
    if (Number(val) > RowsForShow[idx].costing_Qty) {

      toast('Quantity must be less than or equal to Costing Quantity for an Item!')
      rows[idx].quantity = 0

      isButtonDisabledArray[idx] = true
      setIsButtonDisabledArray(isButtonDisabledArray)
      setIsButtonDisabled(true)
    }
  }
  const CompareMinz = (val, idx) => {
    if (Number(val) <= RowsForShow[idx].costing_Qty) {
      isButtonDisabledArray[idx] = false
      setIsButtonDisabledArray(isButtonDisabledArray)
      setIsButtonDisabled(false)

    }
  }
  const CompareDC = (val, idx) => {
    if (Number(val) > (DCChildren[idx].qty - DCChildren[idx].producedQty)) {
      toast('Quantity must be less than or equal to Remaining Quantity for a Product!')
      QuantityOfProduct[idx] = 0
      setIsButtonDisabled(true)
    }
  }
  const CompareMinzDC = (val, idx) => {
    if (Number(val) <= (DCChildren[idx].qty - DCChildren[idx].producedQty)) {
      setIsButtonDisabled(false)
    }
  }
  const handleChange5 = (e, idx) => {
    getInputQtyTotal()
    const { name, value } = e.target
    Compare(value, idx)
    CompareMinz(value, idx)

    setUniIndex2(idx)
    if (quantity[idx] !== '' || quantity[idx] !== null) {
      quantity[idx] = value
      const rowss = [...rows]
      rowss[idx] = {
        itemID: rows[idx].itemID,
        quantity: value,
        projectQuantity: rows[idx].projectQuantity,
        costing_Qty: rows[idx].costing_Qty
      }

      setRows(rowss)
    } else {

      const q = quantity.concat(value)
      setQuantity(q)
      const rowss = [...rows]
      rowss[idx] = {
        itemID: Item[idx],
        quantity: value
      }

      setRows(rowss)
    }
  }

  const handleChange7 = (e, idx) => {
    const re = /^[0-9\b]+$/
    // if value is not blank, then test the regex (Test Point Value)
    let value = ''
    if (e.target.value === '' || re.test(e.target.value)) {
      value = e.target.value
    }
    setUniIndex1(idx)
    const { name } = e.target
    CompareDC(value, idx)
    CompareMinzDC(value, idx)
    QuantityOfProduct[idx] = value === "" ? 0 : value
    const rowss = [...rows2]
    rowss[idx] = {

      quotation2id: DCChildren[idx].id === null ? 0 : DCChildren[idx].id,

      quantity: value === "" ? 0 : value
    }
    setRows2(rowss)
  }
  const getItems = (pID) => {
    Axios.get(`${baseURL}/getProducts?projectID=${pID}&&sort=asc&&pageNo=1&&records=999999999&&colName=id`)
      .then(response => {
        setDCChildren(response.data.products.data)
        setLoading(false)

        const child = response.data.products.data.map(({
          id,
          qty
        }) => ({
          quotation2id: id,
          quantity: 0 // qty === null ? 0 : qty
        }))
        setRows2(child)

      })
      .catch(err => console.log(err))

  }
  useEffect(() => {

    Axios.get(`${baseURL}/getProjects?sort=asc&&pageNo=1&&records=200&&colName=id&&table=projects`)
      .then(response => {
        setProjectName(response.data.projects.data)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Project</label>
            <select class="custom-select" onChange={(e) => {
              setProjectAPIID(e.target.value)
              getItems(e.target.value)
              Itemcategory(e.target.value)
        
              setLoading2(true)
              setLoading(true)
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
            <input type="date" className="form-control"
              name="quantity"
              value={currentDate}
              //  value={format(new Date(), 'dd/mm/yyyy')}
              onChange={(e) => setCurrentDate(e.target.value)}
              placeholder="" />
          </div>
        </div>

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
                <tr style={{ textAlign: 'center' }}>
                  <th scope="col">Sr. No</th>
                  <th scope="col">Window Type</th>
                  <th scope="col">Profile Type</th>
                  <th scope="col">Quotation Quantity</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Produced Quantity</th>
                  <th scope="col">Remaining Quantity</th>


                </tr>
              </thead>

              <tbody>
                {DCChildren.map((cat, idx) => (
                  <tr style={{ textAlign: 'center' }}>
                    <td>
                      {idx + 1}
                    </td>
                    <td>
                      {cat.windowType}
                    </td>
                    <td>
                      {cat.profileName}
                    </td>
                    <td>
                      {cat.qty}
                    </td>
                    <td>
                      <input type="Number" className="form-control" style={{ width: 200 }}
                        onWheel={event => event.currentTarget.blur()}
                        onFocus={(e) => e.target.select()} required
                        value={QuantityOfProduct[idx] > (DCChildren[idx].qty - DCChildren[idx].producedQty) ? 0 : QuantityOfProduct[idx]}
                        min="0"
                        onPaste={preventPasteNegative}
                        onKeyPress={preventMinus}
                        onChange={(e) => {
                          handleChange7(e, idx)
                        }
                        } />
                    </td>
                    <td>
                      {cat.producedQty}
                    </td>
                    <td>
                      {(cat.qty - cat.producedQty).toFixed(2)}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}
        {/* Loader */}
        {isLoading2 ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="table-responsive">
            <table className="table table-striped table-fixed">

              <thead>
                <tr className='text-center'>

                  <th scope="col" style={{
                    width: '16%'
                  }}>Item</th>

                  <th style={{
                    width: '16%',
                    textAlign: 'center'
                  }} scope="col">Quantity</th>
                  <th style={{
                    width: '18%',
                    textAlign: 'center'
                  }} scope="col">Project Quantity</th>
                  <th style={{
                    width: '14%'
                  }} scope="col">Costing Quantity</th>
                  <th style={{
                    width: '20%'
                  }} scope="col">Consumed Quantity</th>
                  <th style={{
                    width: '16%'
                  }} scope="col">Remaining Quantity</th>

                </tr>
              </thead>

              <tbody style={{
                height: 300,
                overflowY: 'scroll'
              }}>
                {RowsForShow.map((cat, idx) => (
                  <tr id={idx} key={idx}>

                    <td style={{
                      width: '16%'
                    }}>
                      <input type="Integer" className="form-control"
                        name="ItemNAme" disabled
                        value={cat.name}

                        placeholder="" />
                    </td>
                    {Number(cat.costing_Qty) === Number(cat.consumed_quantity) ? (
                      <td style={{
                        width: '16%'
                      }}>
                        <input type="Number" className="form-control"
                          name="quantity"
                          onFocus={(e) => e.target.select()} required
                          value={((rows[idx].quantity + 1) > (cat?.costing_Qty - cat?.consumed_quantity) ? 0 : rows[idx].quantity)}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => {
                            handleChange5(e, idx)
                          }}
                          
                          disabled
                          placeholder="Quantity" />
                      </td>
                    ) : (
                      <td style={{
                        width: '16%'
                      }}>
                        <input type="Number" className="form-control"
                          name="quantity"
                          onFocus={(e) => e.target.select()} required
                          value={((Number(rows[idx].quantity)) > (cat?.costing_Qty - cat?.consumed_quantity) ? 0 : rows[idx].quantity)}
                          onWheel={event => event.currentTarget.blur()}
                          // onChange={handleChange5(idx)}
                          onChange={(e) => {
                            handleChange5(e, idx)
                          }}
                          onPaste={preventPasteNegative}
                          onKeyPress={preventMinus}
                          placeholder="Quantity" />
                      </td>
                    )

                    }
                    <td style={{
                      width: '18%'
                    }}>
                      <input type="Integer" className="form-control"
                        name="Stocks" disabled
                        value={cat.item_quantity}

                        placeholder="" />
                    </td>
                    <td style={{
                      width: '14%'
                    }}>
                      <input type="Integer" className="form-control"
                        name="costingQty" disabled
                        value={Number(cat.costing_Qty).toFixed(2)}

                        placeholder="" />
                    </td>
                    <td style={{
                      width: '20%'
                    }}>
                      <input type="Integer" className="form-control"
                        name="consumed" disabled
                        value={Number(cat?.consumed_quantity === undefined ? 0 : cat?.consumed_quantity).toFixed(2)}
                        placeholder="" />
                    </td>
                    <td style={{
                      width: '16%'
                    }}>
                      <input type="Integer" className="form-control"
                        name="Remainig" disabled
                        value={(cat.item_quantity - cat.consumed_quantity).toFixed(2)}
                        placeholder="" />
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
            {/* <div className="table-responsive">
              <table className="table table-striped table-fixed">
                <thead>
                  <tr className='text-center'>

                    <th scope="col" style={{
                      width: '16%'
                    }}>"</th>

                    <th style={{
                      width: '16%',
                      textAlign: 'center'
                    }} scope="col">{enteredQty}</th>
                    <th style={{
                      width: '18%',
                      textAlign: 'center'
                    }} scope="col">{projectQtyTotalT}</th>
                    <th style={{
                      width: '14%'
                    }} scope="col">{costingTotalT.toFixed(2)}</th>
                    <th style={{
                      width: '20%'
                    }} scope="col">{consumedQtyT.toFixed(2)}</th>
                    <th style={{
                      width: '16%'
                    }} scope="col">{projectQtyTotalT - enteredQty}</th>

                  </tr>
                </thead>
              </table>
            </div> */}
            <div className="form-row">
              <div className="form-group col-md-10">
              </div>
              <div className="form-group col-md-2">

                <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={alotInventory}>
                  Store
                </Button.Ripple>
              </div>
            </div>
          </div>)}

      </form>
    </div>
  )
}

export default addProductionOrder
import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const AddPurchaseOrder = () => {

  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState([])

  const [purchaseOrder, setPurchaseOrder] = useState(1000)
  const [grandTotalWeigh, setGrandTotalWeigh] = useState(0)
  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const [Item, setItem] = useState([])
  const [unitPrice, setUnitPrice] = useState([])
  const [unitWeight, setUnitWeight] = useState([])
  const [quantity, setQuantity] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [tax, setTax] = useState(0)
  const [numberOfRow, setNumberOfRow] = useState(0)
  const [Stocks, setStocks] = useState([0, 0, 0, 0, 0, 0, 0])
  const [UnitName, setUnitName] = useState([])
  const [UnitIDD, setUnitIDD] = useState([])
  const [Measure, setMeasure] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [previousBalance, setPreviousBalance] = useState(0)
  const [totalBill, setTotalBill] = useState(0)
  const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
  const [getCategoryNested, setGetCategoryNested] = useState([])
  const [getItemsNested, setGetItemsNested] = useState([])
  const [unitNameArray, setUnitNameArray] = useState([])
  const [UnitIDArray, setUnitIDArray] = useState([])
  const [measureArray, setMeasureArray] = useState([])
  const [totalPrice2, setTotalPrice2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [totalWeight, setTotalWeight] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [one, setOne] = useState(1)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(true)
  const history = useHistory()
  const [v, setV] = useState(0)
  const [Plus, setPlus] = useState(0)
  const [rows, setRows] = useState([])

  const PlaceOrder = () => {
    setIsButtonDisabled(true)
    if (SupplierIDFromAPI.length === 0) {
      toast('Select Supplier!')
    } else if (Category.length === 0) {
      toast('Click On Add New Item And Then Enter Category for Order!')
    } else if (SubCategory.length === 0) {
      toast('Choose SubCategory! ')
    } else if (Item.length === 0) {
      toast('Select Items!')
    } else if (unitPrice.length === 0) {
      toast('Unit Price filed is required! ')
    } else if (unitWeight.length === 0) {
      toast('Unit Weight filed is required! ')
    }  else if (quantity.length === 0) {
      toast('Quantity is required! ')
    } else if (tax === '') {
      toast('Tax filed is required! ')
    } else if (

      SupplierIDFromAPI !== '' && tax !== '' && rows !== ''
    ) {
      fetch(`${baseURL}/addOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          supplierID: SupplierIDFromAPI,
          totalAmount: (totalBill + ((Number(tax) * totalBill) / 100)),
          previousBalance,
          tax,
          rows,
          total_weight: grandTotalWeigh

        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Order created successfully") {
            toast('Order created successfully')
            history.push('/BPC/apps/purchase-orders/list')
          } else {
            toast('There is error!')
            history.push('/BPC/apps/purchase-orders/add')
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
  const rest = (idx) => {
    getSubCategoryNested[idx] = ''
    getItemsNested[idx] = ''
    setRows(rows)

  }

  const getIte = (val, idnx, catID) => {
    Axios.get(`${baseURL}/getItemsByCatSubCatID?subCategoryID=${val}&categoryID=${catID}&&sort=ASC&&colName=id`)
      .then(response => {
        getItemsNested[idnx] = response.data.items
        setLoading(false)
        setRows(rows)

      }).catch(err => console.log(err))
  }

  const getCat = (val, idnx) => {
    setLoading2(true)
    Axios.get(`${baseURL}/getSubCatByCatID?categoryID=${val}&&sort=ASC&&colName=id`)
      .then(response => {

        getSubCategoryNested[idnx] = response.data.subCategories
        getItemsNested[idnx] = ''
        setRows(rows)
        setLoading2(false)

      })
      .catch(err => console.log(err))
  }

  const itemsss = (itm, idx) => {

    Axios.get(`${baseURL}/editItem?id=${itm}&&sort=ASC&&colName=id`)
      .then(response => {
        setUnitName(response.data.item[0].unit1name)
        setUnitIDD(response.data.item[0].unitID)
        setMeasure(response.data.item[0].measure)
        UnitIDArray[idx] = response.data.item[0].unitID
        unitNameArray[idx] = response.data.item[0].unit1name
        measureArray[idx] = response.data.item[0].measure
        setRows(rows)

      })
      .catch(err => console.log(err))
  }

  const childStock = (childStockValue, idx) => {
    Axios.get(`${baseURL}/getInvStockByItemID?categoryID=${Category[idx]}&&itemID=${childStockValue}&&sort=ASC&&colName=id`)
      .then(response => {
        if (response.data.stock !== null) {
          Stocks[idx] = response.data.stock.quantity
          toast(`Available Stock : ${response.data.stock.quantity}`)
          setRows(rows)
        } else {
          Stocks[idx] = 0
          toast(`Available Stock : 0`)
          setRows(rows)
        }
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
      setCategory([...Category])
      setPlus(Plus + 1)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: value,
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
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
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
    }
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    getIte(value, idx, Category[idx])
    if (SubCategory[idx] !== '' || SubCategory[idx] !== null) {
      SubCategory[idx] = value
      setSubCategory([...SubCategory])
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: value,
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]

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
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]

      }
      setRows(rowss)
    }
  }

  const handleChange3 = idx => e => {
    const { name, value } = e.target
    itemsss(value, idx)
    childStock(value, idx)
    if (Item[idx] !== '' || Item[idx] !== null) {
      Item[idx] = value
      setItem([...Item])

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        ItemID: value,
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
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
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
    }
  }
  const handleChange44 = idx => e => {
    const { name, value } = e.target
    if (unitWeight[idx] !== '' || unitWeight[idx] !== null) {
      unitWeight[idx] = value

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: value,
        quantity: quantity[idx],
        total: quantity[idx] * unitPrice[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
      totalWeight[idx] = quantity[idx] * value
      let t = 0
      totalWeight.map((data) => {
        t = t + Number(data)
        setGrandTotalWeigh(t)
      })
    } else {

      const p = unitWeight.concat(value)
      setUnitWeight(p)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: value,
        quantity: quantity[idx],
        total: quantity[idx] * unitPrice[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
      totalWeight[idx] = quantity[idx] * value
      // totalWeight.map((data) => {
      //   t = t + Number(data)
      //   setGrandTotalWeigh(t)
      // })
    }
  }

  const handleChange4 = idx => e => {
    const { name, value } = e.target
    if (unitPrice[idx] !== '' || unitPrice[idx] !== null) {
      unitPrice[idx] = value

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: value,
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        total: quantity[idx] * value,
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
      totalPrice2[idx] = quantity[idx] * value
      let t = 0
      totalPrice2.map((data) => {
        t = t + Number(data)
        setTotalBill(t)
      })
    } else {

      const p = unitPrice.concat(value)
      setUnitPrice(p)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: value,
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        total: quantity[idx] * value,
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }
      setRows(rowss)
      totalPrice2[idx] = quantity[idx] * value

    }
  }

  const handleChange5 = idx => e => {
    const { name, value } = e.target
    if (quantity[idx] !== '' || quantity[idx] !== null) {

      const rowss = [...rows]
      quantity[idx] = value
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: value,
        total: (unitPrice[idx] * value),
        unitID: UnitIDD[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx]
      }
      setRows(rowss)
      totalPrice2[idx] = value * unitPrice[idx]
      totalWeight[idx] = value * unitWeight[idx]
      let t = 0
      let tt = 0
      totalPrice2.map((data) => {
        t = t + Number(data)
        setTotalBill(t)
      })
      totalWeight.map((data) => {
        tt = tt + Number(data)
        setGrandTotalWeigh(tt)
      })

    } else {
      const q = quantity.concat(value)
      setQuantity(q)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        total: (unitPrice[idx] * value),
        unitID: UnitIDD[idx],
        measure: measureArray[idx],
        quantity: value,
        availableQuantity: Stocks[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx]
      }
      setRows(rowss)
      totalPrice2[idx] = value * unitPrice[idx]
      totalWeight[idx] = value * unitWeight[idx]

      let t = 0
      let tt = 0
      totalPrice2.map((data) => {
        t = t + Number(data)
        setTotalBill(t)
      })
      totalWeight.map((data) => {
        tt = tt + Number(data)
        setGrandTotalWeigh(tt)
      })

    }


  }


  const handleChange7 = idx => e => {
    const { name, value } = e.target
    if (tax[idx] !== '' || tax[idx] !== null) {
      tax[idx] = value

      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }

      setRows(rowss)
      setV(0)

      if (idx === 0) {
        setTotalBill(Number(unitPrice[idx] * quantity[idx]) + Number(value))
      } else if (idx === 1) {
        setTotalBill(Number(totalBill) + Number(value))
      } else if (idx === 2) {
        setTotalBill(Number(totalBill) + Number(value))
      } else if (idx === 3) {
        setTotalBill(Number(totalBill) + Number(value))
      } else {
        setTotalBill(Number(totalBill) + Number(value))
      }

    } else {

      const tx = tax.concat(value)
      setTax(tx)
      const rowss = [...rows]
      rowss[idx] = {
        categoryID: Category[idx],
        subCategoryID: SubCategory[idx],
        itemID: Item[idx],
        price: unitPrice[idx],
        weight_per_peace: unitWeight[idx],
        quantity: quantity[idx],
        unitID: UnitIDArray[idx],
        measure: measureArray[idx],
        availableQuantity: Stocks[idx]
      }

      setRows(rowss)
      setV(0)

      if (idx === 0) {
        setTotalBill(Number(unitPrice[idx] * quantity[idx]) + Number(value))
      } else if (idx === 1) {
        setTotalBill(Number(totalBill) + Number(value))
      } else if (idx === 2) {
        setTotalBill(Number(totalBill) + Number(value))
      } else if (idx === 3) {
        setTotalBill(Number(totalBill) + Number(value))
      } else {
        setTotalBill(Number(totalBill) + Number(value))
      }

    }
  }


  const handleAddRow = () => {
    const p = unitPrice.concat(0)
    setUnitPrice(p)
    const q = quantity.concat(0)
    setQuantity(q)

    const item = {
      categoryID: '',
      subCategoryID: '',
      itemID: '',
      price: 0,
      quantity: 0,
      unitID: '',
      measure: '',
      availableQuantity: ''
    }
    setRows([...rows, item])
  }

  const handleRemoveSpecificRow = (idx) => {
    const t = Number(unitPrice[idx]) * Number(quantity[idx])

    setTotalBill(totalBill - t)
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)

    const CategoryT = [...Category]
    const CategoryHere = CategoryT.splice(idx, 1)
    setCategory(CategoryT)

    const getCategoryNestedT = [...getCategoryNested]
    const getCategoryNestedHere = getCategoryNestedT.splice(idx, 1)
    setGetCategoryNested(getCategoryNestedT)

    const SubCategoryT = [...SubCategory]
    const SubCategoryHere = SubCategoryT.splice(idx, 1)
    setSubCategory(SubCategoryT)

    const getSubCategoryNestedT = [...getSubCategoryNested]
    const getSubCategoryNestedHere = getSubCategoryNestedT.splice(idx, 1)
    setSubGetCategoryNested(getSubCategoryNestedT)

    const ItemT = [...Item]
    const ItemHere = ItemT.splice(idx, 1)
    setItem(ItemT)

    const getItemsNestedT = [...getItemsNested]
    const getItemsNestedHere = getItemsNestedT.splice(idx, 1)
    setGetItemsNested(getItemsNestedT)

    const StocksT = [...Stocks]
    const StocksHere = StocksT.splice(idx, 1)
    setStocks(StocksT)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getLastOrderID?sort=ASC&&colName=id`)
      .then(response => {
        if (response.data.orderNo === 0) {
          setPurchaseOrder(1000)
        } else {
          setPurchaseOrder((response.data.orderNo.id) + 1)
        }
      })
      .catch(err => console.log(err))

    Axios.get(`${baseURL}/getSuppliersDropdown`)
      .then(response => {
        setSupplierName(response.data.Suppliers)
      })
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {

    Axios.get(`${baseURL}/getSupplier?supplierID=${SupplierIDFromAPI}&&sort=ASC&&colName=id&&records=9990000000000000`)
      .then(response => {
        setPreviousBalance(response.data.supplier.previous_balance)

      })
      .catch(err => console.log(err))
  }, [SupplierIDFromAPI])

  useEffect(() => {
    Axios.get(`${baseURL}/getCategoriesItems`)
      .then(response => {
        const arr = getCategoryNested.concat([response.data.Categories])
        setGetCategoryNested(arr)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [Plus])

  return (
    <div>
      <div className="App">
      </div>

      {/*  */}

      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Supplier
              {/* <HelpCircle size={20} */}</label>

            <select onMouseEnter={e => {
              setStyle('block')
            }}
              onMouseLeave={e => {
                setStyle('none')
              }} class="custom-select" onChange={(e) => setSupplierIDFromAPI(e.target.value)}
              onFocus={(e) => e.target.any}
              required>
              <option>Select Supplier </option>
              {SupplierName.map((cat, index) => (
                <option key={index} value={cat.supplier_id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label >Purchase Order No</label>
            <input type="text" className="form-control" disabled placeholder="" value={purchaseOrder}

            />

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
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Sub Category</th>
                    <th scope="col">Item</th>
                    <th scope="col">Unit Weight</th>
                    <th scope="col">Unit Price (PKR)</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Available Quantity</th>
                    <th scope="col">Total Weight</th>
                    <th scope="col">Total Price (PKR)</th>
                    <th scope="col">Remove</th>

                  </tr>
                </thead>

                <tbody>
                  {rows.map((cat, idx) => (
                    <tr key={idx}>
                      <td>

                        <select class="custom-select" style={{ width: 200 }}
                          name="category"
                          onChange={handleChange(idx)}
                          onFocus={(e) => e.target.any}
                          value={Category[idx]}
                          required>

                          <option >Select Category</option>
                          {getCategoryNested[idx] && getCategoryNested[idx].map((cat, index) => (
                            <option key={index} value={cat.id} >{cat.name}</option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <select class="custom-select" style={{ width: 200 }}
                          onFocus={(e) => e.target.any}
                          name="subCategory"
                          onChange={handleChange2(idx)}
                          value={SubCategory[idx]}
                          required >

                          <option >Select Sub Category</option>

                          {getSubCategoryNested[idx] && getSubCategoryNested[idx].map((cat, index) => (
                            <option key={index} value={cat.id} >{cat.name}</option>
                          ))}
                        </select>
                      </td>

                      <td>

                        <select class="custom-select" style={{ width: 200 }}
                          name="item"
                          onChange={handleChange3(idx)}
                          onFocus={(e) => e.target.any}
                          value={Item[idx]}
                          required>
                          <option >Select Item</option>
                          {getItemsNested[idx] && getItemsNested[idx].map((cat, index) => (
                            <option key={index} value={cat.id} >{cat.name}</option>
                          ))}
                        </select>
                      </td>
                      {/* <td>
                      <input 
                      style={{width:100}}  disabled value={unitNameArray[idx] && unitNameArray[idx]} className="form-control"
                    
                             />
                        
                          </td>
                      <td> 
                        
                      <input style={{width:100}} disabled  value={measureArray[idx] && measureArray[idx]} className="form-control"
                  
                             />

                        </td> */}
                      <td>

                        <input type="Number" className="form-control" style={{ width: 100 }}
                          name="unitWeight"
                          value={(rows[idx].weight_per_peace)}
                          onFocus={(e) => e.target.select()} required
                          onChange={handleChange44(idx)}
                          placeholder='Unit Weight'
                        />

                      </td>
                      <td>

                        <input type="Number" className="form-control" style={{ width: 100 }}
                          name="unitPrice"
                          value={(rows[idx].price)}
                          onFocus={(e) => e.target.select()} required
                          onChange={handleChange4(idx)}
                          placeholder='Unit Price'
                        />

                      </td>

                      <td>
                        <input type="Number" className="form-control" style={{ width: 100 }}
                          name="quantity"
                          onFocus={(e) => e.target.select()} required
                          value={(rows[idx].quantity)}
                          onChange={handleChange5(idx)}
                          placeholder="Quantity"
                        />
                      </td>
                      <td>  <input style={{ width: 100 }} disabled value={Stocks[idx]} className="form-control"

                      />

                      </td>
                      <td>
                        <input type="Integer" className="form-control" style={{ width: 100 }}
                          placeholder=""
                          name="totalWeight" disabled
                          value={(totalWeight[idx])}

                        />
                      </td>
                      <td>
                        <input type="Integer" className="form-control" style={{ width: 100 }}
                          placeholder=""
                          name="total" disabled
                          value={(rows[idx].total)}

                        />
                      </td>
                      <td> <Button.Ripple onClick={() => {
                        handleRemoveSpecificRow(idx)
                      }} color='danger'>Remove</Button.Ripple>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            </div>)}
        </div>
        {/* 2nd row */}

        <div className="form-row">

          <div className="form-group col-md-3">
            <label >Previous Balance (PKR)</label>
            <input type="text" className="form-control" placeholder="Previous Balance" value={Number(previousBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              disabled
              onChange={(e) => setPreviousBalance(e.target.value)} />
          </div>

          <div className="form-group col-md-3">
            <label >Tax in Percentage(%) (Optional) </label>
            <input onMouseEnter={e => {
              setStyle2('block')
            }}
              onMouseLeave={e => {
                setStyle2('none')
              }} type="Number" className="form-control" onFocus={(e) => e.target.select()} placeholder="Previous Balance" value={tax}

              onChange={(e) => {
                setTax(e.target.value)
              }} />
          </div>

          <div className="form-group col-md-3">
            <label >Total Bill (PKR)</label>
            <input type="Number" className="form-control" disabled placeholder="" value={Number(totalBill + ((Number(tax) * totalBill) / 100))}

            />
          </div>
          <div className="form-group col-md-3">
            <label >Total Weight</label>
            <input type="Number" className="form-control" disabled placeholder="" value={Number(grandTotalWeigh)}

            />
          </div>
        </div>

        <div className="form-group">

        </div>
        <div className="form-row">
          <div className="form-group col-md-10">

            <Button.Ripple color='primary' class="Right" onClick={handleAddRow}>
              Add New Item
            </Button.Ripple>
          </div>
          <div className="form-group col-md-2">

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={PlaceOrder}>
              Store
            </Button.Ripple>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPurchaseOrder
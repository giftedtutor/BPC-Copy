import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const UpdateItemRates = () => {

  const [ProjectName, setProjectName] = useState([])

  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')
  const [filter, setFilter] = useState('')
  const [quantity, setQuantity] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  let filterNameWithName = []

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
  const localNameArray = []

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

  const getItems = (val) => {
    Axios.get(`${baseURL}/ListingcatSubItems?catId=${CategoryID}&&subcatId=${val}`)
      .then(response => {
        const filterArray = response.data.items.map(({ id, upvcrate, categoryID, subCategoryID, name, localName }) => ({ id, upvcrate, categoryID, subCategoryID, name, localName }))

        sendNotItemArray(response.data.items)
        setRows(filterArray)
      })
      .catch(err => console.log(err))
  }

  const postData = () => {
    setIsButtonDisabled(true)
    const rowsToSend = filterNameWithName.map(({ id, upvcrate, categoryID, subCategoryID, localName }) => ({ id, upvcrate, categoryID, subCategoryID, localName }))
    if (CategoryID === '') {
      toast('Please Select a Project!')
    } else if (CategoryID !== '') {
      fetch(`${baseURL}/itemsUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Array: rowsToSend
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Update Items Rates") {

            toast('Items Rates Updated!')
            history.push('/BPC/apps/allot-and-inventory-section/multiple-items-ratelist')

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
    const rowss = [...filterNameWithName]
    rowss[idx] = {
      id: filterNameWithName[idx].id,
      categoryID: CategoryID,
      subCategoryID: SubCategoryID,
      name:   <th scope="col">Item</th>,
      upvcrate: value,
      localName: filterNameWithName[idx].localName
    }
    setRows(rowss)

  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    localNameArray[idx] = value
    const rowss = [...filterNameWithName]
    rowss[idx] = {
      id: filterNameWithName[idx].id,
      categoryID: CategoryID,
      subCategoryID: SubCategoryID,
      name: filterNameWithName[idx].name,
      upvcrate: RateArray[idx] === undefined ? filterNameWithName[idx].upvcrate : RateArray[idx],
      localName: value
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

  const filterArray = ItemNotFilterArray.map(({ id, upvcrate, categoryID, subCategoryID }) => ({ id, upvcrate, categoryID, subCategoryID }))
  filterNameWithName = rows.filter(item => {
    if (item.name === null || item.name === undefined) {
      item.name = ''
    } else {
      item.name = item.name
    }
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.upvcrate.toString().includes(filter.toString()) : item

  })
  return (
    <div>

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
            </div>
            <div className="form-group col-md-3"></div>
            <div className="form-group col-md-3">
              <label>Search</label>
              <input
                id='search-invoice'
                className='form-control'
                type='text'
                placeholder='Search & filter'
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
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
                  <th scope="col">Local Name</th>
                  <th scope="col">Rate</th>

                </tr>
              </thead>

              <tbody>
                {filterNameWithName.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>

                      <input type="text" className="form-control" placeholder="Item Name" value={cat?.name}
                        style={{ textTransform: 'capitalize' }} onFocus={(e) => e.target.select()} disabled
                      />
                    </td>
                    <td>
                      <input type="text" className="form-control" placeholder="Local Name" value={cat.localName}
                        style={{ width: 250 }} onFocus={(e) => e.target.select()}
                        onChange={handleChange2(idx)} />
                    </td>
                    <td>
                      <input type="Number" className="form-control" placeholder="Rate" value={cat.upvcrate}
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

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={postData}>
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

export default UpdateItemRates
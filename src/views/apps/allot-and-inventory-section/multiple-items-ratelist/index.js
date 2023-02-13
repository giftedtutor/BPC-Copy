import React, { useState, useEffect } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { Link } from 'react-router-dom'
import generatePDF from './tablePDF'

const MultipleItemRateList = () => {

  const [ProjectName, setProjectName] = useState([])
  const [style2, setStyle2] = useState('none')
  const [style3, setStyle3] = useState('none')
  const [date, setDate] = useState('')
  const [filter, setFilter] = useState('')

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

  const [rows2, setRows2] = useState([])

  const getItems = (val) => {
    Axios.get(`${baseURL}/ListingcatSubItems?catId=${CategoryID}&&subcatId=${val}`)
      .then(response => {
        const filterArray = response.data.items.map(({ id, upvcrate, categoryID, subCategoryID }) => ({ id, upvcrate, categoryID, subCategoryID }))

        sendNotItemArray(response.data.items)
        setRows(response.data.items)
      })
      .catch(err => console.log(err))
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

  const filterName = rows.filter(item => {
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
            <div className="form-group col-md-3">
            </div>
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
        <div className="form-row">
          <div className="form-group col-md-8">
          {/* <Button color='danger' onClick={() => {   
            generatePDF(filterName)
            }} >PDF</Button> */}
          </div>
       
          <div className="form-group col-md-3" style={{
            paddingLeft: 30
          }}><Button color='primary' onClick={() => {
            history.push('/BPC/apps/allot-and-inventory-section/update-item-rates')
          }} >  Edit </Button>
          &nbsp; &nbsp; &nbsp;
            <Button color='danger' onClick={() => {   
            generatePDF(filterName)
            }} >PDF</Button>
          </div>
          <div className="form-group col-md-1">
            <Button color='primary' onClick={() => {
              history.push('/BPC/apps/allot-and-inventory-section/add')
            }} >Add Item</Button> 
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
                  <th scope="col" style={{
                    width: '50%',
                    paddingLeft: 150
                  }}>Item</th>
                  <th style={{
                    width: '20%',
                    textAlign: 'right'
                  }} scope="col">Rate</th>
                  <th style={{
                    width: '30%'
                  }}></th>
                </tr>
              </thead>

              <tbody>
                {filterName.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td style={{
                      width: '50%',
                      paddingLeft: 80
                    }}>{cat.name}
                    </td>
                    <td style={{
                      textAlign: 'right',
                      width: '20%'
                    }}>{Number(cat.upvcrate).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td style={{
                      width: '23%'
                    }}></td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="form-row">
          <div className="form-group col-md-10">
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

export default MultipleItemRateList
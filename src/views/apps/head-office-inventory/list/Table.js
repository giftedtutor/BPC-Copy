import { Fragment, useState, useEffect } from 'react'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import baseURL from '../../../../base-url/baseURL'

import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import moment from 'moment'

const FilterData = () => {
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [sortType, setSortType] = useState('desc')
  const [isLoading, setLoading] = useState(true)
  const [GetSuppliers, setGetSuppliers] = useState([])
  const [supplierID, setSupplierID] = useState('')
  const [dateFrom, setDateFrom] = useState('')

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const todayMonth = `${yyyy}-${mm}`
  const [currentMonth, setCurrentMonth] = useState(todayMonth)

  const [column, setColumn] = useState('id')
  const history = useHistory()
  const getData = () => {
    setLoading(true)
    Axios.get(`${baseURL}/getHeadofficeInventory?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&supplier_id=${supplierID}&&fromDate=${dateFrom}&&toDate=${currentDate}`)
      .then(response => {

        setSuppliersF(response.data.inventory.data)
        if (response.data.inventory.data.length === 0) {
          toast('No Inventory Against provided Input!')
        }
        setLoading(false)
        setTotal(response.data.inventory.total)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {

    getData()
    Axios.get(`${baseURL}/getPOSuppliersDropdown`)
      .then(response => {
        setGetSuppliers(response.data.Suppliers)
        setLoading(false)

      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, column])

  const sorted = suppliersF

  const filterData = suppliersF.filter(item => {
    return filter !== "" ? item.supplierName.toLowerCase().includes(filter.toLowerCase()) || item.categoryName.toLowerCase().includes(filter.toLowerCase()) || item.subcategoryName.toLowerCase().includes(filter.toLowerCase()) || item.itemName.toLowerCase().includes(filter.toLowerCase()) || item.quantity.toString().includes(filter.toString()) || item.unitPrice.toString().includes(filter.toString()) || item.totalPrice.toString().includes(filter.toString()) || item.quantity.toString().includes(filter.toString()) || item.purchaseDate.toString().includes(filter.toString()) || item.id.toString().includes(filter.toString()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.supplierName}</td>
        <td>{data.categoryName}</td>
        <td>{data.subcategoryName}</td>

        <td>{data.itemName}</td>
        <td style={{ textAlign: 'right' }}>{moment(data.purchaseDate).format('DD/MM/YYYY')}</td>

        <td style={{
          // border: data.quantity <= data.minimumLevel ? '1px solid red' : '',
          color: data.quantity <= data.minimumLevel ? 'red' : '',
          borderRadius: data.quantity <= data.minimumLevel ? 20 : 1,
          textAlign: 'right'
        }}>{data.quantity.toLocaleString("en-US")}</td>
        <td style={{ textAlign: 'right' }}>{data.minimumLevel}</td>
        <td style={{ textAlign: 'right' }}>{data.unitPrice.toLocaleString("en-US")}</td>
        <td style={{ textAlign: 'right' }}>{(data.quantity * data.unitPrice).toLocaleString("en-US")}</td>
      </tr>
    )

  })

  useEffect(() => {
    getData()
  }, [supplierID, currentDate, dateFrom])


  return (
    <div>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>

        <Row>
          <Col
            xl='3' className='d-flex align-items-center p-0'
          >

            &nbsp; &nbsp;
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Sort
              </Label>
              &nbsp;  &nbsp;
              <select class="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>

                <option value="itemID">Item ID</option>

                <option value="purchaseDate">Purchase Date</option>
                <option value="quantity">Quantity</option>
                <option value="totalPrice">Total Price (PKR)</option>
                <option value="unitPrice">Unit Price(PKR)</option>

              </select>
              &nbsp;  &nbsp;
              <select class="custom-select" value={sortType} onChange={(e) => setSortType(e.target.value)} required>
                <option selected value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </Col>

          <Col
            xl='9'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Search:
              </Label>
              <Input
                id='search-invoice'
                className='ml-50 w-100'
                type='text'
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            </div>
          </Col>

        </Row>
        <div style={{ height: 5, width: 100 }}>
          {/* Just for Space */}
        </div>
        <Row>
          <Col xl='3' className='d-flex align-items-center p-0'>
            &nbsp;  &nbsp;
            <div className='d-flex align-items-center w-100'>
              <Label for='rows-per-page'>Show</Label>
              <CustomInput
                className='form-control mx-50'
                type='select'
                id='rows-per-page'
                value={record}
                onChange={(e) => setRecord(e.target.value)}
                style={{
                  width: '5rem',
                  padding: '0 0.8rem',
                  backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                }}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
              </CustomInput>
              <Label for='rows-per-page'>Entries</Label>
            </div>
          </Col>

          <Col
            xl='9'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >

            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(sorted)}
              color="danger"
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp; <span style={{ width: 4, height: 1 }}></span>
          </Col>
        </Row>
        <div style={{ height: 5, width: 100 }}>
          {/* Just for Space */}
        </div>
        {/*  */}
        <hr />
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Select Supplier</label>
            <select
              name="Supplier"
              class="custom-select"
              onChange={(e) => setSupplierID(e.target.value)}
              onFocus={(e) => e.target.any} required>

              <option >Select Supplier</option>
              {GetSuppliers.map((cat, index) => (
                <option key={index} value={cat.supplier_id} >{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label >Date From</label>
            <input type="date" className="form-control" placeholder="" value={dateFrom}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="form-group col-md-3">
            <label >Date To</label>
            <input type="date" className="form-control" placeholder="" value={currentDate}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setCurrentDate(e.target.value)} />
          </div>
          <div className="form-group col-md-2"></div>
          <div className="form-group col-md-1" style={{
            marginTop: 25
          }}>

          </div>
        </div>
      </div>
      {isLoading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>) : (

        <div className="table-responsive printme">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: 'center' }}>Sr. No</th>
                <th scope="col" style={{ textAlign: 'center' }}>Supplier</th>
                <th scope="col" style={{ textAlign: 'center' }}>Category </th>
                <th scope="col" style={{ textAlign: 'center' }}>Sub Category </th>

                <th scope="col" style={{ textAlign: 'center' }}>Item</th>
                <th scope="col" style={{ textAlign: 'center' }}>Purchase  Date</th>

                <th scope="col" style={{ textAlign: 'center' }}>Quantity</th>
                <th scope="col" style={{ textAlign: 'center' }}>Minimum Level</th>

                <th scope="col" style={{ textAlign: 'center' }}>Unit Price (PKR)</th>
                <th scope="col" style={{ textAlign: 'center' }}>Total Price (PKR)</th>

              </tr>
            </thead>
            <tbody>

              {mappSuppliers}

            </tbody>
          </table>
          <Row>
            <Col
              xl='12'
              className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
            >
              <Pagination
                activePage={pageNo}
                itemsCountPerPage={record}
                totalItemsCount={total}
                onChange={(e) => setPageNo(e)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
                nextPageText="Next"
                prevPageText="Prev"
              />
            </Col>
          </Row>
        </div>)}
    </div>

  )

}

const InventoyList = ({ mappSuppliers }) => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default InventoyList

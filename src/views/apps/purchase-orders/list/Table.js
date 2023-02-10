// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button, Badge } from 'reactstrap'
import { useHistory } from "react-router"
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import moment from 'moment'
const FilterData = () => {

  const role = Cookies.get('role')

  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc') //desc , asc
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')
  const [deleteRefresher, setDeleteRefresher] = useState(0)
  const [changeStatus, setChangeStatus] = useState(1)
  const history = useHistory()
  const location = useLocation()
  const [GetSuppliers, setGetSuppliers] = useState([])
  const [supplierID, setSupplierID] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }
  const handlePageChange = (pageNumber) => {

    setPageNo(pageNumber)
    setLoading(true)

  }
  const getData = () => {
    setLoading(true)
    Axios.get(`${baseURL}/getOrders?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&supplier_id=${supplierID}&&fromDate=${dateFrom}&&toDate=${currentDate}`)
      .then(response => {
        setSuppliersF(response.data.orders.data)
        if (response.data.orders.data.length === 0) {
          toast('No Purchase Order Against provided Input!')
        }
        setTotal(response.data.orders.total)
        setLoading(false)

      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    Axios.get(`${baseURL}/getPOSuppliersDropdown`)
      .then(response => {
        setGetSuppliers(response.data.Suppliers)
        setLoading(false)

      })
      .catch(err => console.log(err))

  }, [pageNo, record, sortType, column, deleteRefresher, supplierID, dateFrom, currentDate])

  const handleEdit = (id) => {
    history.push('/BPC/apps/purchase-orders/edit', { params: id })
  }

  const viewDetail = (viewID) => {
    history.push('/BPC/apps/purchase-orders/view', { params: viewID })
  }
  const statusChange = (idd) => {
    let txt
    if (confirm("Are you Really want to Transfer into Inventory?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/changePurchaseOrderStatus?id=${idd}`)
        .then(data => {
          if (data.data.result === "Order Status changed sucessfully") {

            toast('Order Status changed successfully')
            setDeleteRefresher(deleteRefresher + 1)
            getData()
          } else if (data.data.result === "Without making payment you cannot change the status") {

            toast('Sorry, Without making payment you cannot change the status')
            setDeleteRefresher(deleteRefresher + 1)
            getData()
          } else {
            toast('Something went Wrong!!')
          }
        }).catch(err => {
          console.log(err)
        })

    }

  }

  const deleteOrder = (ParentID) => {
    let txt
    if (confirm("Are you Really want to DELETE?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/deletePurchaseOrder?orderID=${ParentID}`)
        .then(data => {
          if (data.data.result === "Order deleted sucessfully") {

            toast('Order deleted successfully')
            setDeleteRefresher(deleteRefresher + 1)
            getData()
          } else if (data.data.result === "Order is received you cannot delete now") {
            toast('Order is received you cannot delete now!')
          } else {
            toast('There is some error')
          }

        }).catch(err => {
          console.log(err)
        })

    }

  }
  const Actionn = (val, id) => {
    if (val === 'edit' && id !== '') {

      handleEdit(id)
    } else if (val === 'view' && id !== '') {

      viewDetail(id)
    } else if (val === 'dispatch' && id !== '') {

      deleteOrder(id)
    } else if (val === 'received' && id !== '') {

      statusChange(id)
    }
  }

  const sorted = suppliersF
  const filterData = suppliersF.filter(item => {
    return filter !== "" ? item.status.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) || item.date.toString().includes(filter.toString()) || item.remaining.toString().includes(filter.toString()) || item.paid.toString().includes(filter.toString()) || item.totalAmount.toString().includes(filter.toString()) || item.id.toString().includes(filter.toString()) : item

  })

  const DataToBeDisplayed = filterData.map((data, index) => {
    return (
      <tr key={data.index}>

        <td>{index + 1}</td>
        <td>{`PO-${data.id}`}</td>
        <td>{data.name}</td>
        <td>{moment(data.date).format('DD/MM/YYYY')}</td>
   
        <td style={{

          textAlign: 'right'
        }} >{data.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{

          textAlign: 'right'
        }} >{data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{
          color: data.remaining === 0 ? '' : 'red',
          textAlign: 'right'
        }}>{data.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
          <td>{data.total_weight}</td>
        <td>{data.status === 'RECEIVED' ? (<CustomInput
          type='radio'
          className='custom-control-success'
          id='success'
          label='Received'
          defaultChecked
          inline
        />) : (data.status === 'CANCELLED') ? (<CustomInput
          type='radio'
          className='custom-control-danger'
          id='danger'
          label='Cancelled'
          defaultChecked
          inline
        />) : (<CustomInput
          type='radio'
          className='custom-control-warning'
          id='warning'
          label='Pending'
          defaultChecked
          inline
        />)}</td>
        <td>{data.tax} %</td>
        <td> {data.filePath === '' || data.filePath === null || data.filePath === undefined ? 'No File' : <a href={data.filePath}>View File</a>}</td>
        <td>
          <select style={{ width: 170 }} class="custom-select" onChange={(e) => Actionn(e.target.value, data.id)} required>
            <option value=''>Select Action</option>
            {data.status === 'RECEIVED' || data.status === 'Cancel' ? '' : <option value='received'>Receive</option>}
            {valB === true ? '' : <option value='edit'>Edit</option>}

            <option value="view">View</option>
            {/* {valB === true ? '' : <option value="dispatch">Delete</option>} */}

          </select>
        </td>
      </tr>
    )

  })

  useEffect(() => {
    getData()
  }, [supplierID, dateFrom, currentDate])

  return (
    <div>
      {/*  */}

      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>

        <Row>

          <Col xl='3' className='d-flex align-items-center p-0'>

            &nbsp; &nbsp;
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Sort
              </Label>
              &nbsp;  &nbsp;
              <select class="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>

                <option value="status">Status</option>
                <option value="name">Supplier</option>
                <option value="date">Date</option>
                <option value="totalAmount">Total Amount</option>
                <option value="paid">Paid</option>
                <option value="remaining">Balance</option>

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
            <Link to='/BPC/apps/purchase-orders/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              color='danger'
              onClick={() => generatePDF(sorted)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  <span style={{ width: 4, height: 1 }}></span>
          </Col>
        </Row>
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

        <br />
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
                <tr style={{
                  textAlign: 'center'
                }}>
                  <th scope="col">Sr. No</th>
                  <th scope="col">PO No</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total (PKR)</th>
                  <th scope="col">Paid (PKR)</th>
                  <th scope="col">Balance (PKR)</th>
                  <th scope="col">Total Weight</th>
                  <th scope="col" style={{
                    textAlign: 'center'
                  }}>Status</th>
                  <th scope="col">Tax (%)</th>
                  <th scope="col">Payment Receipt</th>
                  <th scope="col">ACTIONS</th>

                </tr>
              </thead>
              <tbody>

                {DataToBeDisplayed}

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
                  onChange={(e) => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                  nextPageText="Next"
                  prevPageText="Prev"

                />
              </Col>
            </Row>
          </div>

        )}

      </div>
    </div>

  )


}

const List = ({ DataToBeDisplayed }) => {
  return (
    <div>

      <FilterData />

    </div>
  )
}

export default List

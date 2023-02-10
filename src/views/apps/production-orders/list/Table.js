// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import baseURL from '../../../../base-url/baseURL'
import Cookies from 'js-cookie'

import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import moment from 'moment'

const FilterData = () => {

  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(false)
  const [deleteRefresher, setDeleteRefresher] = useState(0)
  const [column, setColumn] = useState('ID')
  const [table, setTable] = useState('production_orders')
  const [productQuantityBar, setProductQuantityBar] = useState()
  const [totalQuantityBar, setTotalQuantityBar] = useState()
  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')

  const [Action, setAction] = useState('')
  const history = useHistory()

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    setPageNo(pageNumber)
    setLoading(true)
  }
  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getProjects?sort=asc&&pageNo=1&&records=9999999999&&colName=id&&table=projects`)
      .then(response => {
        setProjectName(response.data.projects.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const getProductionOrder = (projectID) => {
    Axios.get(`${baseURL}/getProductionOrders?projectID=${projectID}&&pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&table=${table}`)
      .then(response => {
        setSuppliersF(response.data.productionOrders.data)
        setLoading(false)
        setTotal(response.data.productionOrders.total)
      })
      .catch(err => console.log(err))
  }
  const handleEdit = (id) => {
    history.push('/BPC/apps/production-orders/edit', { params: id })
  }

  const viewRecord = (id) => {
    history.push('/BPC/apps/production-orders/viewRecord', { params: id })
  }

  const viewFiles = (id) => {
    history.push('/BPC/apps/production-orders/viewFiles', { params: id })
  }
  const completeQuantity = (id) => {
    history.push('/BPC/apps/production-orders/completeQuantity', { params: id })
  }

  const viewDetail = (viewID) => {
    history.push('/BPC/apps/production-orders/view', { params: viewID })
  }
  const QCs = (viewID) => {
    history.push('/BPC/apps/production-orders/QCs', { params: viewID })
  }
  const dispatch = (viewID) => {
    Axios.get(`${baseURL}/changeProductionOrderStatus?poID=${viewID}`)
      .then(data => {
        if (data.data.result === "Production order status changed successfully") {

          toast('Production order status changed successfully')
          setDeleteRefresher(deleteRefresher + 1)
        } else {
          toast('Sorry, Without making payment you cannot change the status!')
        }

      }).catch(err => {
        console.log(err)
      })

    history.push('/BPC/apps/production-orders/dispatch', { params: viewID })
  }
  const statusChange = (idd) => {
    let txt
    if (confirm("Are you Really want to Approve?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {

      fetch(`${baseURL}/changeProductionOrderStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          poID: idd
        })
      }).then(res => res.json()).then(data => {
        if (data.result === "Production order approved successfully") {

          toast('Production order approved successfully')
          setDeleteRefresher(deleteRefresher + 1)
          getProductionOrder(ProjectAPIID)
        } else {
          toast(`${data.result}`)
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
      fetch(`${baseURL}/productionOrderDelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: ParentID
        })
      }).then(res => res.json())
        .then(data => {

          if (data.message === "Deleted successfully") {

            toast('Production Order deleted successfully')
            setDeleteRefresher(deleteRefresher + 1)

          } else if (data.message === "Order is approve you cannot delete now") {
            toast('Order is approve you cannot delete now!')
          } else {
            toast('There is some Error!')
          }

        }).catch(err => {
          console.log(err)
        })

    }

  }
  const Actionn = (val, id) => {

    if (val === 'edit' && id !== '') {

      handleEdit(id)
    } else if (val === 'completeQuantity' && id !== '') {

      completeQuantity(id)
    } else if (val === 'view' && id !== '') {

      viewDetail(id)
    } else if (val === 'dispatch' && id !== '') {

      dispatch(id)
    } else if (val === 'approve' && id !== '') {

      statusChange(id)
    } else if (val === 'QCs' && id !== '') {

      QCs(id)
    } else if (val === 'delete' && id !== '') {

      deleteOrder(id)
    } else if (val === 'ViewRecord' && id !== '') {

      viewRecord(id)
    } else if (val === 'ViewFiles' && id !== '') {

      viewFiles(id)
    }
  }

  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    return filter !== "" ? item.status.toLowerCase().includes(filter.toLowerCase()) || item.date.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={index}>
        <td> {index + 1} </td>
        <td> {moment(data.date).format('DD/MM/YYYY')} </td>
        <td> {data.status === 'Under Process' ? (<CustomInput
          type='radio'
          className='custom-control-warning'
          id='warning'
          label='PENDING'
          defaultChecked
          inline
        />) : (<CustomInput
          type='radio'
          className='custom-control-success'
          id='success'
          label={`${data.status}`}
          defaultChecked
          inline
        />)} </td>
        <td>
          <select style={{ width: 170 }} class="custom-select" onChange={(e) => Actionn(e.target.value, data.id)} required>
            <option value=''>Select Action</option>
            {data.status === 'APPROVED' || data.status === 'Cancel' ? '' : <option value='approve'>Approve</option>}

            <option value="view">View</option>

          </select>
        </td>

      </tr>
    )

  })

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Project</label>
            <select class="custom-select" onChange={(e) => {
              setProjectAPIID(e.target.value)
              getProductionOrder(e.target.value)
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
        </div>
      </form>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
        <Row>

          <Col xl='3' className='d-flex align-items-center p-0'>

            &nbsp; &nbsp;
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Sort
              </Label>
              &nbsp;  &nbsp;
              <select class="custom-select" onChange={(e) => {
                setColumn(e.target.value)
                if (e.target.value === 'productTypeName') {
                  setColumn('name')
                  setTable('product_types')
                } else if (e.target.value === 'productName') {
                  setColumn('name')
                  setTable('products')
                } else {
                  setTable('production_orders')
                }
              }} required>
                <option value="id">Sr. No</option>
                <option value="date">Date</option>
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
            <Link to='/BPC/apps/production-orders/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              color="danger"
              onClick={() => generatePDF(filterData)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" /> PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
          </Col>
        </Row>
        <div style={{ height: 10, width: 100 }}>
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

                  <th scope="col">Sr. No</th>
                  <th scope="col"> Date </th>
                  <th scope="col"> Status </th>

                  <th scope="col" >ACTIONS</th>


                </tr>
              </thead>
              <tbody>
                {mappSuppliers}

              </tbody>
            </table>

          </div>)}
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
    </div>

  )
}

const ProductOrdersList = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default ProductOrdersList
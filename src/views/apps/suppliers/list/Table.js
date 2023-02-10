// ** React Imports
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import baseURL from '../../../../base-url/baseURL'

import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const FilterData = () => {
  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('supplier_id')
  const history = useHistory()
  const location = useLocation()
  const [deleteRefresher, setDeleteRefresher] = useState(0)

  const [CTN, setCTN] = useState([])
  const [ActionValue, setActionValue] = useState('')

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    setPageNo(pageNumber)
  }

  let valB
  if (role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getSuppliers?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.suppliers.data)
        setLoading(false)
        setTotal(response.data.suppliers.total)
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, column, deleteRefresher])

  const handleEdit = (supplier_id) => {
    history.push('/BPC/apps/suppliers/edit', { params: supplier_id })
  }

  const deleteSupplier = (ParentID) => {

    let txt
    if (confirm("Are you Really want to DELETE?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/deleteSupplier?id=${ParentID}`)
        .then(data => {
          if (data.data.result === "Item cannot be deleted as it is present in purchase or production order") {

            toast('Item cannot be deleted as it is present in purchase or production order')
            setDeleteRefresher(deleteRefresher + 1)

          } else if (data.data.result === "Supplier deleted sucessfully") {
            toast('Supplier deleted successfully!')
            setActionValue('')
            setDeleteRefresher(deleteRefresher + 1)

          } else if (data.data.result === "Supplier Having Previous Balance ") {
            toast(`Can't delete - Supplier having Previous Balance!`)
            setActionValue('')
            setDeleteRefresher(deleteRefresher + 1)

          } else {
            toast('Something went Wrong!')
          }

        }).catch(err => {
          console.log(err)
        })
    }
  }
  const viewDetail = (viewID) => {

    history.push('/BPC/apps/suppliers/view', { params: viewID })
  }
  const Actionn = (val, supplier_id) => {

    if (val === 'edit' && supplier_id !== '') {

      handleEdit(supplier_id)
    } else if (val === 'view' && supplier_id !== '') {
      viewDetail(supplier_id)
    } else if (val === 'viewDetail' && supplier_id !== '') {
      history.push('/BPC/apps/suppliers/viewDetail', { params: supplier_id })
    } else if (val === 'dispatch' && supplier_id !== '') {

      deleteSupplier(supplier_id)
    } else if (val === 'received' && supplier_id !== '') {
      statusChange(supplier_id)
    }
  }
  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.previous_balance.toString().includes(filter.toString()) || item.contact_no.toString().includes(filter.toString()) || item.supplier_id.toString().includes(filter.toString()) || item.address.toLowerCase().includes(filter.toLowerCase()) || item.city.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const SupplierDataa = filterData.map((data, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.contact_no}</td>

        <td style={{
          textAlign: 'right'
        }}>{data.previous_balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td>
          <select style={{ width: 170 }} class="custom-select" onChange={(e) => {
            Actionn(e.target.value, data.supplier_id)
            setActionValue(e.target.value)
          }} required>
            <option value=''>Select Action</option>

            {valB === true ? '' : <option value='edit'>Edit</option>}

            <option value="view">View</option>
            <option value="viewDetail">View Detail</option>
            {valB === true ? '' : <option value="dispatch">Delete</option>}

          </select>
        </td>

      </tr>
    )

  })

  return (
    <div>
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
                <option value="supplier_id">ID</option>
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="city">City</option>
                <option value="contact-no">ContactNo</option>
                <option value="email">Email</option>
                <option value="natureOfWork">Nature Of Work</option>
                <option value="previous_balance">Prev. Bal.</option>
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
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='999999999'>All</option>
              </CustomInput>
              <Label for='rows-per-page'>Entries</Label>
            </div>
          </Col>
          <Col
            xl='9'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            {valB === true ? '' : (
              <Link to='/BPC/apps/supplier-ledger/list'>
                <Button.Ripple color='primary' onClick=''>Ledger </Button.Ripple>
              </Link>
            )}
            &nbsp;  &nbsp;
          <Link to='/BPC/apps/suppliers/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-danger"
              onClick={() => generatePDF(filterData)}
            >

              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  <span style={{ width: 4, height: 1 }}></span>

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
                  <th scope="col">Name</th>
                  <th scope="col">Contact No</th>
                  <th scope="col" style={{ textAlign: 'center' }}>Previous Balance (PKR)</th>

                  <th scope="col">Actions</th>


                </tr>
              </thead>
              <tbody>
                {SupplierDataa}

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
          </div>)}

      </div>
    </div>

  )
}

const Superlier = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default Superlier
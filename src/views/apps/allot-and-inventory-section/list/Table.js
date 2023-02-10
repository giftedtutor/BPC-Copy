import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import generatePDF from './tablePDF.js'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import moment from 'moment'
import Cookies from 'js-cookie'

const FilterData = () => {
  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')
  const history = useHistory()
  const location = useLocation()
  const [deleteRefresher, setDeleteRefresher] = useState(0)
  const [Increment, setIncrement] = useState(0)

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }
  let valB
  if (role === 'PRODUCTION') {
    valB = true
  } else {
    valB = false
  }
  useEffect(() => {
    Axios.get(`${baseURL}/getAlotInventoryList?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.result.data)
        setLoading(false) //stop loading when data is fetched
        setTotal(response.data.result.total)
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, deleteRefresher, Increment])


  const statusChange2 = (ParentID, PoID) => {

    let txt
    if (confirm("Are you Really want to CANCEL?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      fetch(`${baseURL}/updateInventoyItem?id=${ParentID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: Number(PoID),
          status: 'CANCEL'
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === 'Quantity is not enough in stock') {
            toast('Quantity is not enough in stock')
            setIncrement(Increment + 1)
          } else if (data.result === "Issue Slip Cancelled") {

            toast('Issue Slip Cancelled')
            setIncrement(Increment + 1)
          } else {
            toast('Something went Wrong, Please try again ')
          }

        }).catch(err => {
          console.log(err)
        })

    }
  }

  const statusChange1 = (ParentID, PoID) => {

    let txt
    if (confirm("Are you Really want to APPROVE?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      fetch(`${baseURL}/updateInventoyItem?id=${ParentID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: Number(PoID),
          status: 'APPROVED'
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === 'Quantity is not enough in stock') {
            toast('Quantity is not enough in stock')
            setIncrement(Increment + 1)
          } else if (data.result === "Issue Slip Approved Successfully") {

            toast('Approved Successfully!')
            setIncrement(Increment + 1)
          } else {
            toast(`${data?.result}`)
          }

        }).catch(err => {
          console.log(err)
          toast('Server Error!')
        })

    }
  }

  const handleEdit = (supplier_id) => {

    history.push('/BPC/apps/client/edit', { params: supplier_id })
  }
  const viewDetail = (viewID) => {

    history.push('/BPC/apps/allot-and-inventory-section/view', { params: viewID })
  }
  const Production = (viewID, projectID) => {

    history.push('/BPC/apps/productions/add', { params: viewID, projectID })
  }

  const Actionn = (val, id, PoID) => {
    if (val === 'edit' && id !== '') {
      handleEdit(id)
    } else if (val === 'view' && id !== '') {

      viewDetail(id)
    } else if (val === 'dispatch' && id !== '') {
      deleteClient(id)
    } else if (val === 'approve' && id !== '') {

      statusChange1(id, PoID)
    } else if (val === 'cancel' && id !== '') {

      statusChange2(id, PoID)
    } else if (val === 'production' && id !== '') {

      Production(id, PoID)
    }
  }
  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.date.toString().includes(filter.toString()) || item.status.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{moment(data.date).format('DD/MM/YYYY')}</td>
        <td>{data.status === 'CANCEL' ? (<CustomInput
          type='radio'
          className='custom-control-danger'
          id='danger'
          label='Cancelled'
          defaultChecked
          inline
        />) : (data.status === 'PENDING' ? <CustomInput
          type='radio'
          className='custom-control-warning'
          id='warning'
          label='PENDING'
          defaultChecked
          inline
        /> : <CustomInput
          type='radio'
          className='custom-control-success'
          id='success'
          label={`${data.status}`}
          defaultChecked
          inline
        />)}</td>

        <td>
          <select style={{ width: 170 }} class="custom-select" onChange={(e) => Actionn(e.target.value, data.id, data.projectID)} required>
            <option value=''>Select Action</option>
            <option value="view">View</option>
            <option value="cancel">Cancel</option>
            {data.status === 'APPROVED' ? '' : <option value="approve">Approve</option>}
            {/* <option value="production">Production</option> */}

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
                <option value="id">ID</option>
                <option value="name">Project</option>
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
            {valB === true ? '' : (
              <>
                <Link to='/BPC/apps/alot-to-project-listing/list'>
                  <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Allot Vehicle</Button.Ripple>
                </Link> &nbsp;  &nbsp;
                <Link to='/BPC/apps/alot-machine-to-project-listing/list'>
                  <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Allot Machine</Button.Ripple>
                </Link> &nbsp;  &nbsp;
                <Link to='/BPC/apps/allot-and-inventory-section/alot'>
                  <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Allot Inventory</Button.Ripple>
                </Link></>
            )}
            &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(sorted)}
              color="danger"
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
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
                  <th scope="col">Project</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {mappSuppliers}

              </tbody>
            </table>

          </div>
        )}
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

const List = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default List
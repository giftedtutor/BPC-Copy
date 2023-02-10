// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import baseURL from '../../../../base-url/baseURL'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
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
  const [deleteRefresher, setDeleteRefresher] = useState(0)

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    console.log(`active page is ${pageNumber}`)
    setPageNo(pageNumber)
  }

  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }

  useEffect(() => {
    console.log('pageNo', pageNo)
    Axios.get(`${baseURL}/getMachines?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.machines.data)
        setLoading(false)
        setTotal(response.data.machines.total)
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, column, deleteRefresher])

  const deleteMachine = (ParentID) => {
    let txt
    if (confirm("Are you Really want to DELETE?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/deleteMachine?machineID=${ParentID}`)
        .then(data => {
          console.log("Machine Deleted", data.data.result)
          if (data.data.result === "You cannot delete this machine.. It is in use") {
            console.log("", data.result)
            toast('You cannot delete this machine.. It is in use')

          } else if (data.data.result === "Machine Deleted Successfully") {
            toast('Machine Deleted Successfully!')
            setDeleteRefresher(deleteRefresher + 1)
          } else {
            toast('Something went Wrong!')
          }

        }).catch(err => {
          console.log(err)
        })
    }
  }
  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    const space = ' '
    const productAndType = item.productName + space + item.name
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.status.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.isAloted === 0 ? 'Not Allotted' : 'Allotted'}</td>

        {/* {valB === true ? '' :    <td><Button onClick={() => handleEdit(data.id)}>Edit</Button></td>} */}
        {valB === true ? '' : <td><Button color="danger" onClick={() => deleteMachine(data.id)}>Delete</Button></td>}
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
                <option value="id">Sr. No</option>
                <option value="name">Name</option>
                <option value="status">Status</option>

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
            <Link to='/BPC/apps/machine/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              color="danger"
              onClick={() => generatePDF(filterData)}
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
                  <th scope="col"> Sr. No</th>
                  {/* <th scope="col">Product ID</th> */}
                  <th scope="col"> Machine</th>
                  <th scope="col"> Status</th>
                  {/* {valB === true ? '' :   <th scope="col">EDIT</th> } */}
                  {valB === true ? '' : <th scope="col">Delete</th>}


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

const List = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default List
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { AlignRight, ChevronDown, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import Cookies from 'js-cookie'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'


// fitlter search
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

  const id = location.state.params

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    setPageNo(pageNumber)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/editClient?id=${id}`)
      .then(response => {
        setSuppliersF(response.data.client)
        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, deleteRefresher])

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
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="city">City</option>
                <option value="contact-no">ContactNo</option>
                <option value="email">Email</option>
                <option value="previous-balance" >Prev. Bal.</option>
              </select>
              &nbsp;  &nbsp;
              <select class="custom-select" value={sortType} onChange={(e) => setSortType(e.target.value)} required>
                <option selected value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
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
                <option value=''>All</option>
              </CustomInput>
              <Label for='rows-per-page'>Entries</Label>
            </div>
          </Col>
          <Col
            xl='9'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          ><Link to='/BPC/apps/client-ledger/list'>
              <Button.Ripple color='primary' onClick=''>Ledger </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Link to='/BPC/apps/client/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              color='danger'
              onClick={() => generatePDF(FilterData)}
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

                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Email</th>
                  <th scope="col" style={{ textAlign: 'center' }}>Previous Balance (PKR)</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{suppliersF.name}</td>
                  <td>{suppliersF.address}</td>
                  <td>{suppliersF.city}</td>
                  <td>{suppliersF.contact_no}</td>
                  <td>{suppliersF.email}</td>
                  <td style={{ textAlign: 'right' }}>{suppliersF.previous_balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                </tr>
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
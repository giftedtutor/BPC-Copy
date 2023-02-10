// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'

// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import baseURL from '../../../../base-url/baseURL'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// fitlter search
const FilterData = () => {
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
  const id = location.state.params

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/editClient?id=${id}`)
      .then(response => {
        setSuppliersF(response.data.ConcernedPersons)
        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))
  }, [pageNo, record])

  const sorted = suppliersF
  const filterName = sorted.filter(item => {
    return filter !== "" ? item.id.toString().includes(filter.toString()) || item.contact_no.toString().includes(filter.toString()) || item.designation.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const mappSuppliers = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.designation}</td>
        <td>{data.contact_no}</td>

      </tr>
    )

  })

  return (
    <div>
      {/* id::::::: {id} */}
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
        <Row>

          <Col
            xl='2'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            &nbsp;  &nbsp; &nbsp;   <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
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
          <Col
            xl='10'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            {/* <Link to='/BPC/apps/client/add'> 
        <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
         </Link> &nbsp;  &nbsp;  */}
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(sorted)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  Export
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
          </Col>

        </Row>

        <div style={{ height: 5, width: 100 }}>
          {/* Just for Space */}
        </div>

        <Row>

          {/* <Col xl='3' className='d-flex align-items-center p-0'>
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
        </Col> */}
          {/* <Col
          xl='9'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
         
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(sorted)}
            >
            <FontAwesomeIcon icon={faFilePdf} color="white" />  Export 
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp; 
        </Col> */}
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
                  <th scope="col">ID</th>
                  {/* <th scope="col">Parent ID</th> */}
                  <th scope="col">Concern Person</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Contact No</th>


                </tr>
              </thead>
              <tbody>
                {mappSuppliers}

              </tbody>
            </table>
            {/* <Row>
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
  </Row> */}
          </div>)}

      </div>
    </div>

  )
}

const ClientsList = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default ClientsList
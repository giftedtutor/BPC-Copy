// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import generatePDF from './tablePDF.js'
import Pagination from "react-js-pagination"

import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


// fitlter search
const FilterData = () => {
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(true)

  const [column, setColumn] = useState('id')
  const [GetProjects, setGetProjects] = useState([])
  const [ProjectID, setProjectID] = useState(17)
  const handlePageChange = (pageNumber) => {
   setPageNo(pageNumber)
  }
  
  useEffect(() => {
    Axios.get(`${baseURL}/getDClist?projectID=${ProjectID}&&pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.DClist.data)
        setLoading2(false) //stop loading when data is fetched

        setTotal(response.data.DClist.total)
      }).catch(err => console.log(err))


  }, [pageNo, record, column, sortType, ProjectID])

  useEffect(() => {

    Axios.get(`${baseURL}/dailyProjectProductionDropdown`)
      .then(response => {
        setGetProjects(response.data.data)
        setLoading(false) 

      })
      .catch(err => console.log(err))
  }, [])
  const viewDetail = (viewID) => {
    Axios.get(`${baseURL}/editDC?id=${viewID}`)
      .then(response => {
        generatePDF(response.data.dcParent, response.data.dcChildren)

      })
      .catch(err => console.log(err))
  }
  const filterData = suppliersF.filter(item => {
    return filter !== "" ? item.status.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.date.toString().includes(filter.toString()) : item

  })
  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{moment(data.date).format('DD/MM/YYYY')}</td>
        <td>{data.status === 'PENDING' ? (<CustomInput
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
        />)}</td>

        <td><Button
          color='danger'
          onClick={() => {
            viewDetail(data.id)
          }} >Download as PDF</Button></td>
      </tr>
    )

  })

  return (
    <div>
      <form>
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="form-row">
            <div className="form-group col-md-4">
              <label >Project</label>
              <select class="custom-select" onChange={(e) => {
                setProjectID(e.target.value)
                setLoading2(true)
              }}
                onFocus={(e) => e.target.any} required>
                <option>Select Project</option>
                {GetProjects.map((cat, index) => (
                  <option key={index} value={cat.projectID}>{cat.projectName}</option>
                ))}
              </select>
            </div>
          </div>)}
        {/*  */}
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
              <select class="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>
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
          <Col xl='10' className='d-flex align-items-center p-0'>
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
          <Col xl='2' className='d-flex align-items-center w-100'>
            <Link to='/BPC/apps/delivery-challan/add'>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link>
          </Col>
        </Row>
        <div style={{ height: 10, width: 100 }}>
          {/* Just for Space */}
        </div>

        {/* Loader */}
        {isLoading2 ? (
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
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>

                  <th scope="col">Download as PDF</th>

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

const ClientsList = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default ClientsList
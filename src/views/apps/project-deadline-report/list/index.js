import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Label, CustomInput } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import generatePDF from './tablePDF.js'
import Pagination from "react-js-pagination"
import Cookies from 'js-cookie'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

const ProjectDeadlineReport = () => {

  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
  const [status, setStatus] = useState('')
  const [DateTo, setDateTo] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const [column, setColumn] = useState('id')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [filter, setFilter] = useState('')

  const [totalDebit, setTotalDebit] = useState(0)
  const [PreviousBalance, setPreviousBalance] = useState()
  const history = useHistory()

  const getLedger = () => {
    setIsButtonDisabled(true)
    if (status === '' || status !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/getProjectDeadlineReport?pageNo=${pageNo}&&status=${status}&&records=999999999`)
        .then(response => {
          if (response.data.projects.data[0] === undefined) {
            toast('No deadline Report against provided status!')
            setLoading2(false)
            setSuppliersF([])
            setTotalDebit(0)
          } else {
            setSuppliersF(response.data.projects.data)
            setLoading2(false)
            setTotal(response.data.projects.total)

          }

        })
        .catch(err => console.log(err))

    } else {
      toast('Fill out all fields!')
    }
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000)

  }

  let val
  if (role === 'ADMIN') {
    val = true
  } else {
    val = false
  }

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
    setLoading2(true)
  }
  useEffect(() => {
    getLedger()
    Axios.get(`${baseURL}/getClients?sort=asc&&colName=id`)
      .then(response => {
        setSupplierName(response.data.clients.data)
        setLoading(false)

      })
      .catch(err => console.log(err))
  }, [pageNo, record])
  const filterName = suppliersF.filter(item => {

    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.status.toLowerCase().includes(filter.toLowerCase()) || item.endDate.toString().includes(filter.toString()) : item

  })

  const DATA = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{moment(data.endDate).format('DD/MM/YYYY')}</td>
        <td>{data.status}</td>
      </tr>
    )

  })
  useEffect(() => {
    getLedger()
  }, [status])
  return (
    <div>
      <form>
        <h1 style={{ textAlign: 'center' }}>Deadline Report</h1>
        <div className="form-row">

          <div className="form-group col-md-4">
            <label>
              Status
            </label>
            <select
              class="custom-select"
              onChange={e => setStatus(e.target.value)}
              value={status}
              onFocus={e => e.target.any}
              required
            >
              <option value=''>Select Status</option>
              <option value='onTime'>On Time</option>
              <option value='let'>Late</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label>
              Search
            </label>
            <input
              id='search-invoice'
              type='text'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="form-control"
              placeholder='Search here'
            />
          </div>
          <div className="form-group col-md-3" style={{ marginTop: 19 }} />

          <div className="form-group col-md-1" style={{ marginTop: 19 }}>
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterName)}
              color='danger'
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
          </div>
        </div>
        {/* 
        <div className="form-row">
          <div className="form-group col-md-11">
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
          </div>
          <div className="form-group col-md-1">

          </div>
        </div> */}
      </form>

      {/* 
 */}

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
                <th scope="col">Project</th>
                <th scope="col">Deadline</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {DATA}
              <div style={{ height: 10 }}></div>

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
  )
}

export default ProjectDeadlineReport
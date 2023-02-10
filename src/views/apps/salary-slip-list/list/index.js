import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../base-url/baseURL'
import { toast } from 'react-toastify'

const SalaryLists = () => {
  const [salarySlipData, setSalarySlipData] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')
  const [deleteRefresher, setDeleteRefresher] = useState(0)
  const history = useHistory()

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/ListSalarySlip?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&table=employees`)
      .then(response => {
        setSalarySlipData(response.data.result.data)
        setLoading(false)
        setTotal(response.data.result.total)
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, column, deleteRefresher])

  const approveStatus = (idd) => {
    let txt
    if (confirm("Are you Really want to Approve the Status?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/PaySalarySlip?id=${idd}`)
        .then(data => {
          if (data.data.result === "Salaryslip Paid") {
            toast('Salary Slip Paid Successfully')
            setDeleteRefresher(deleteRefresher + 1)
          } else {
            toast('Something went Wrong!!')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
  const sorted = salarySlipData
  const SalaryLists = sorted.filter(item => {
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) : item

  })

  const DataToBeDisplayed = SalaryLists.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{`${data.Month.substring(5, 7) === '1' || data.Month.substring(5, 7) === '01' ? 'January' : (data.Month.substring(5, 7) === '02' || data.Month.substring(5, 7) === '2') ? 'February' : (data.Month.substring(5, 7) === '3' || data.Month.substring(5, 7) === '03' ? 'March' : (data.Month.substring(5, 7) === '4' || data.Month.substring(5, 7) === '04') ? 'April' : (data.Month.substring(5, 7) === '5' || data.Month.substring(5, 7) === '05') ? 'May' : (data.Month.substring(5, 7) === '06' || data.Month.substring(5, 7) === '6') ? 'June' : (data.Month.substring(5, 7) === '7' || data.Month.substring(5, 7) === '07') ? 'July' : (data.Month.substring(5, 7) === '8' || data.Month.substring(5, 7) === '08') ? 'August' : (data.Month.substring(5, 7) === '9' || data.Month.substring(5, 7) === '09') ? 'September' : (data.Month.substring(5, 7) === '10' ? 'October' : (data.Month.substring(5, 7) === '11' ? 'November' : (data.Month.substring(5, 7) === '12' ? 'December' : data.Month))))
          }, ${data.Month.substring(0, 4)}`}</td>
        <td>{data.basicsalary.toLocaleString("en-US")}</td>
        <td>{data.status !== "Paid" ? (<CustomInput
          type='radio'
          className='custom-control-danger'
          id='danger'
          label='Unpaid'
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
        <td>{data.status !== "Paid" ? (<Button color="danger" onClick={() => {
          approveStatus(data.salary_id)
        }}>Not Approved</Button>) : (<Button color="success" disabled>Approved</Button>)}</td>

        <td><Button color="danger" onClick={() => generatePDF(SalaryLists[index])}>PDF </Button></td>
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
                <option value="name">Name</option>


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
            <Link to='/BPC/apps/salary-slip/add'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Generate </Button.Ripple>
            </Link> &nbsp;  &nbsp; &nbsp;
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
                  <th scope="col">Employee</th>
                  <th scope="col">Month</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Status</th>
                  <th scope="col">Approve</th>
                  <th scope="col">Salary Slip</th>

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
          </div>)}

      </div>
    </div>

  )
}

const SalaryList = () => {
  return (
    <div>
      <SalaryLists />
    </div>
  )
}

export default SalaryList
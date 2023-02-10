import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Label, CustomInput } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import generatePDF from './tablePDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination"
import Cookies from 'js-cookie'

const MonthlyExpenseReport = () => {

  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [SupplierName, setSupplierName] = useState([])

  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const [column, setColumn] = useState('id')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [filter, setFilter] = useState('')

  const [expenseTotal, setexpenseTotal] = useState(0)

  const [PreviousBalance, setPreviousBalance] = useState()

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)
  const todayMonth = `${yyyy}-${mm}`
  const [currentMonth, setCurrentMonth] = useState(todayMonth)
  const [totalCredit, setTotalCredit] = useState(0)

  const history = useHistory()

  const getLedger = () => {
    setIsButtonDisabled(true)
    if (currentMonth === '') {
      toast('Choose Month and Year!')
    } else if (currentMonth !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/monthlyIncomeReport?month=${currentMonth}&&sort=asc&&colName=id&&pageNo=${1}&&records=999999999&&table=general_ledgers`)
        .then(response => {
          if (response.data.expense.data[0] === undefined) {
            toast('No Expenses Report against provided Month!')
            setLoading2(false)
            setexpenseTotal(0)
            setSuppliersF([])
          } else {
            setSuppliersF(response.data.expense.data)
            let Total = 0
            response.data.expense.data.forEach((data) => {
              Total += data.credit
            })
            setTotalCredit(Total)
            setLoading2(false)
            setTotal(response.data.expense.total)

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
    if (item.sub_category_name === null) {
      item.sub_category_name = ""
    }
    const space = ' '
    const catAndName = item.category_name + space + item.sub_category_name
    return filter !== "" ? catAndName.toLowerCase().includes(filter.toLowerCase()) : item

  })

  let t = 0
  filterName.map(data => {
    t = t + Number(data.totalExp)
  })

  const mappSuppliers = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{data.category_name === null || (data.category_name === "" && data.managePersonName === null) ? 'SUPPLIER PAYMENT' : (data.role === 'FACTORY_FINANCE' ? 'FACTORY FINANCE' : (data.role === 'ACCOUNTANT' ? 'ACCOUNTANT' : (data.role === 'PROCUREMENT' ? 'PROCUREMENT' : data.category_name)))}</td>
        <td>{data.sub_category_name === null || (data.sub_category_name === "" && data.managePersonName === null) ? data.supplierName : (data.role === 'FACTORY_FINANCE' || data.role === 'ACCOUNTANT' ? data.managePersonName : ((data.sub_category_name === "" && data.managePersonName !== null) ? data.managePersonName : data.sub_category_name))}</td>
        <td>{data.credit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td>{data.description}</td>
      </tr>
    )

  })

  useEffect(() => {
    getLedger()
  }, [currentMonth])
  return (
    <div>
      <form>
        <h1 style={{ textAlign: 'center' }}>Monthly Expenses Report</h1>
        <div className="form-row">

          <div className="form-group col-md-4">
            <label >Month</label>
            <input type="month" className="form-control" placeholder="" value={currentMonth}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setCurrentMonth(e.target.value)} />
          </div>


          <div className="form-group col-md-4">
            <label>
              Search
            </label>
            <input
              id=''

              type='text'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="form-control"
              placeholder='Search here'
            />
          </div>
          <div className="form-group col-md-3" style={{ marginTop: 26 }}>

          </div>

          <div className="form-group col-md-1" style={{ marginTop: 26 }}>
            <Button.Ripple
              className="btn btn-primary"
              color='danger'
              onClick={() => generatePDF(filterName)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" /> PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
          </div>
        </div>

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
        </div>
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
                <th scope="col">Category</th>
                <th scope="col">Sub Category</th>
                <th scope="col">Amount (PKR)</th>
                <th scope="col">Description</th>

              </tr>
            </thead>
            <tbody>
              {mappSuppliers}
              <tr>
          
                <th scope="col"></th>
                <th scope="col">Total (PKR)</th>
                <th scope="col">{totalCredit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</th>
                <th scope="col"></th>

              </tr>
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

export default MonthlyExpenseReport
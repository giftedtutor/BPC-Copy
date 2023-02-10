import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import generatePDF from './tablePDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination"

const dailyExpense = () => {

  const [suppliersF, setSuppliersF] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
  const [DateTo, setDateTo] = useState('')
  const [credit, setCredit] = useState(0)
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const [column, setColumn] = useState('category_name')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [filter, setFilter] = useState('')
  const [totalCredit, setTotalCredit] = useState(0)

  const [PreviousBalance, setPreviousBalance] = useState()

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const history = useHistory()
  const getLedger = () => {
    setIsButtonDisabled(true)
    if (currentDate === '') {
      toast('Chose Date!')
    } else if (currentDate !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/dailyExpenseReport?date=${currentDate}&&pageNo=${1}&&records=99999999&&sort=asc&&colName=id&&table=expence_categories`)
        .then(response => {
          if (response.data.expense.data[0] === undefined) {
            toast('No Admin Daily Expense Report against provided Date!')
            setLoading2(false)
            setSuppliersF([])
            setTotalCredit(0)
          } else {
            setSuppliersF(response.data.expense.data)
            let Total = 0
            response.data.expense.data.forEach((data) => {
              Total += data.credit
            })
            setTotalCredit(Total)
            setLoading2(false) //stop loading when data is fetched
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
  const handlePageChange = (pageNumber) => {
   setPageNo(pageNumber)
    setLoading2(true)
    Axios.get(`${baseURL}/dailyExpenseReport?date=${currentDate}&&pageNo=${pageNumber}&&records=${record}&&sort=${sortType}&&colName=${column}&&table=suppliers`)
      .then(response => {
        if (response.data.expense.data[0] === undefined) {
          toast('No Expense Report against provided Date!')
          setLoading2(false)

          setCredit(0)
        } else {
          setSuppliersF(response.data.expense.data)
          setLoading2(false) //stop loading when data is fetched
          setTotal(response.data.expense.total)
          let total = 0
          response.data.expense.data.map((data, index) => {
            return (
              total = total + data.credit
            )
          })
          setCredit(total)
        }
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {

    Axios.get(`${baseURL}/getClients?sort=asc&&colName=id`)
      .then(response => {
        setSupplierName(response.data.clients.data)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))
  }, [])
  const filterName = suppliersF.filter(item => {
    if (item.sub_category_name === null) {
      item.sub_category_name = ""
    }
    const space = ' '
    const catAndName = item.category_name + space + item.sub_category_name
    return filter !== "" ? catAndName.toLowerCase().includes(filter.toLowerCase()) : item

  })
   
  useEffect(() => {
     getLedger()
  }, [currentDate])

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

  return (
    <div>
      <form>
        <h1 style={{ textAlign: 'center' }}>Daily Expense Report</h1>
        <div className="form-row">

          <div className="form-group col-md-4">
            <label >Date</label>
            <input type="date" className="form-control" placeholder="" value={currentDate}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setCurrentDate(e.target.value)} />
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
          <div className="form-group col-md-3" style={{ marginTop: 19 }}>

          </div>
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

        <div className="form-row">
          <div className="form-group col-md-11">

          </div>
          <div className="form-group col-md-1">

          </div>
        </div>
      </form>
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

export default dailyExpense
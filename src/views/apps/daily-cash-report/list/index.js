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
import Cookies from 'js-cookie'

const getSupplierLedger = () => {

  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [suppliersF2, setSuppliersF2] = useState([])
  const [suppliersF3, setSuppliersF3] = useState([])
  const [suppliersPayment, setSuppliersPayment] = useState([])
  const [employeePayment, setEmployeePayment] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
  const [DateTo, setDateTo] = useState('')
  const [result, setResult] = useState()
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [pageNoSupp, setPageNoSupp] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [pageNo2, setPageNo2] = useState(1)
  const [totalExp, setTotalExp] = useState()
  const [totalSupplier, setTotalSupplier] = useState()
  const [record2, setRecord2] = useState(10)
  const [recordSupp, setRecordSupp] = useState(10)
  const [debit, setDebit] = useState(0)
  const [expenseCredit, setExpenseCredit] = useState(0)
  const [supplierCredit, setSupplierCredit] = useState(0)
  const [employeeCredit, setEmployeeCredit] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const [isLoading3, setLoading3] = useState(true)
  const [isLoading4, setLoading4] = useState(false)
  const [isLoading5, setLoading5] = useState(false)

  const [column, setColumn] = useState('id')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [filter, setFilter] = useState('')
  const [filter2, setFilter2] = useState('')

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
      toast('Choose Date!')
    } else if (currentDate !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/dailyCashReport?date=${currentDate}&&sort=asc&&colName=id&&pageNo=${1}&&records=99999999`)
        .then(response => {
          
          if (response.data.receivedCash.data[0] === undefined) {
            toast('No Income Report against provided Date!')
            setLoading2(false)
            setSuppliersF([])
            setDebit(0)
          } else {
            setSuppliersF(response.data.receivedCash.data)
            setLoading2(false) //stop loading when data is fetched
            setTotal(response.data.receivedCash.total)

            let total = 0
            response.data.receivedCash.data.map((data, index) => {
              return (
                total = total + data.debit
              )
            })
            setDebit(total)
          }

          if (response.data.expenses.length === 0) {
            toast('No Expense Report against provided Date!')
            setLoading4(false)
            setSuppliersF2([])
            setExpenseCredit(0)

          } else {
            setSuppliersF2(response.data.expenses)
            setLoading4(false) //stop loading when data is fetched
          }

          let totalExp = 0
          response.data.expenses.map((data, index) => {
            return (
              totalExp = totalExp + data.amount
            )
          })
          setExpenseCredit(totalExp)

        }
        )
        .catch(err => console.log(err))
      setLoading4(true)
      setLoading5(true)
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
  }
  const handlePageChange2 = (pageNumber) => {
    setPageNo2(pageNumber)
    setLoading4(true)
  }
  const handlePageChangeSupplier = (pageNumberSupp) => {
    setPageNoSupp(pageNumberSupp)
    setLoading5(true)
  }

  useEffect(() => {
    getLedger()

    Axios.get(`${baseURL}/getClients?sort=asc&&colName=id`)
      .then(response => {
        setSupplierName(response.data.clients.data)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))
  }, [pageNo])
  const filterName = suppliersF.filter(item => {
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.debit.toString().includes(filter.toString()) : item

  })

  const mappSuppliers = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
         <td>{data.clientName}</td>

        <td style={{textAlign: 'right'}}>{data.debit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td>{data.description}</td>

      </tr>
    )

  })
  const filterName2 = suppliersF3.filter(item => {
    return filter !== "" ? item.invoice_no.toString().includes(filter.toString()) || item.paid.toString().includes(filter.toString()) : item

  })
  const InvoicesData = filterName2.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{`INV No: ${data.invoice_no}`}</td>

        <td>{data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

      </tr>
    )

  })
  const filterName1 = suppliersF2.filter(item => {
    if (item.category_name === null) {
      item.category_name = ''
    } else if (item.sub_category_name === null) {
      item.sub_category_name = ''
    } else if (item.expenseCredit === null) {
      item.expenseCredit = ''
    }
    if (item.paid === null || item.paid === undefined) {
      item.paid = 0
    } else {
      item.paid = item.paid
    }

    if (item.sub_category_name === null) {
      item.sub_category_name = 0
    } else {
      item.sub_category_name = item.sub_category_name
    }

    if (item.supplierName === null) {
      item.supplierName = ''
    } else {
      item.supplierName = item.supplierName
    }

    if (item.sub_category_name === null || item.sub_category_name === 0) {
      item.sub_category_name = ''
    } else {
      item.sub_category_name = item.sub_category_name
    }
    return filter !== "" ? item.paid.toString().includes(filter.toString()) || item.supplierName.toLowerCase().includes(filter.toLowerCase()) || item.category_name.toLowerCase().includes(filter.toLowerCase()) || item.expenseCredit.toString().includes(filter.toString()) || item.sub_category_name.toLowerCase().includes(filter.toLowerCase()) : item

  })
   
  useEffect(() => {
     getLedger()
  }, [currentDate])
  

  const mappSuppliers2 = filterName1.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{data.details}</td>
        <td style={{textAlign: 'right'}}>{data.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td>{data.description}</td>

      </tr>
    )

  })

  return (
  <div>
    <div>
      <h1 style={{ textAlign: 'center' }}>Daily Cash Report</h1>
      <div className="form-row">

        <div className="form-group col-md-4">
          <label >Date</label>
          <input type="date" className="form-control" placeholder="" value={currentDate}
            onFocus={(e) => e.target.select()} required
            onChange={(e) => setCurrentDate(e.target.value)} 
            />
        </div>
        <div className="form-group col-md-4">
          
        </div>
        <div className="form-group col-md-3"></div>

        <div className="form-group col-md-1" style={{ marginTop: 26 }}>
     <div className="form-group col-md-1">

          </div>
            </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-11" style={{ marginTop: 26 }}></div>
        <div className="form-group col-md-1" style={{ marginTop: 26 }}>
          <Button.Ripple
            className="btn btn-primary"
            color='danger'
            onClick={() => generatePDF(filterName, filterName1)}
          >
            <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
          </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6" style={{ marginBottom: 50 }}>
          <div>
            <h3 style={{ marginBottom: 16 }}>Daily Income</h3>
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
                      <th scope="col">Client</th>
                      <th scope="col">Debit (PKR)</th>
                      <th scope="col">Description</th>

                    </tr>
                  </thead>
                  <tbody>
                    {mappSuppliers}
                    <div style={{ height: 10 }}></div>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{debit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</th>

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
        <div className="form-group col-md-6 " style={{ marginBottom: 50 }}>
          <div>

            <h3 style={{ marginBottom: 16 }}>Daily Expenses</h3>

            {/* Loader */}
            {isLoading4 ? (
              <div class="text-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Detail</th>
                      <th scope="col">Credit (PKR)</th>
                      <th scope="col">Description</th>

                    </tr>
                  </thead>
                  <tbody>
                    {mappSuppliers2}
                    <div style={{ height: 10 }}></div>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{expenseCredit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</th>
                      <th scope="col"></th>

                    </tr>
                  </tbody>
                </table>
                <Row>
                  <Col
                    xl='12'
                    className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                  >
                    <Pagination
                      activePage={pageNo2}
                      itemsCountPerPage={record2}
                      totalItemsCount={totalExp}
                      onChange={(e) => handlePageChange2(e)}
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

      </div>
      
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Total (PKR): {(debit - (expenseCredit + supplierCredit)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h1>
    </div>
    
    )
}

export default getSupplierLedger

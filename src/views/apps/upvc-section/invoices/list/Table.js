// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"

// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useHistory } from "react-router"

import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../../base-url/baseURL'
import { toast } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const InvoiceData = () => {
  const [InvocieAllData, setInvocieAllData] = useState([])
  const [invoiceID, setInvoiceID] = useState('')
  const [qoutData, setQoutData] = useState([])
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [PDFData, setPDFData] = useState([])
  const [paymentsDetail, setPaymentsDetail] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(false)
  const [column, setColumn] = useState('id')
  const history = useHistory()
  const [GetProjects, setGetProjects] = useState([])
  const [projectID, setProjectID] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [name, setName] = useState('')
  const [Remaining, setRemaining] = useState('')
  const [description, setDescription] = useState('')
  const [payType, setPayType] = useState('')
  const [previousBalance, setPreviousBalance] = useState(0)
  const [paid, setPaid] = useState(0)
  const [pay, setPay] = useState(0)
  const [uploadFile, setUploadFile] = useState()
  const [flag, setFlag] = useState(0)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [Q1_Total, setQ1_Total] = useState(0)

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()


  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }
  const getData = () => {
    setLoading(true)
    Axios.get(`${baseURL}/getInvoices?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&projectID=${projectID}&&fromDate=${dateFrom}&&toDate=${currentDate}`)
      .then(response => {
        setInvocieAllData(response.data.invoices)
        setQoutData(response.data.qtyData)
        setPaymentsDetail(response.data.payments)
        setPDFData(response.data)

        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getData()
    Axios.get(`${baseURL}/getProjects?sort=asc&&pageNo=1&&records=200&&colName=id&&table=projects`)
      .then(response => {
        setGetProjects(response.data.projects.data)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

  }, [pageNo, record, sortType, column, projectID, refresh])

  const generateInvoice = (id) => {
    Axios.get(`${baseURL}/getInvoices?pageNo=1&&records=999999&&sort=asc&&colName=id&&projectID=${id}&&fromDate=&&toDate=`)
      .then(response => {
        generatePDF(response.data.qtyData, response.data.invoices, response.data.payments, response.data)

      })
      .catch(err => console.log(err))
  }
  InvocieAllData.filter(item => {
    return filter !== "" ? item.clientName.toLowerCase().includes(filter.toLowerCase()) || item.total_amount.toString().includes(filter.toString()) || item.paid.toString().includes(filter.toString()) || item.remaining.toString().includes(filter.toString()) : item

  })
  const AllData = InvocieAllData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td style={{ width: '15%' }}>{index + 1}</td>
        <td style={{ width: '15%' }}>{data.clientName}</td>
        <td style={{ textAlign: 'right', width: '15%' }}>{data.total_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{ textAlign: 'right', width: '15%' }}>{data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{ textAlign: 'right', width: '15%' }}>{data.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{ width: '10%' }}>  <Button.Ripple color='danger' onClick={() => generateInvoice(data.projectID)}> PDF </Button.Ripple> </td>
        <td style={{ width: '15%' }}><Button color="primary" onClick={() => {
          handleOpen()
          setInvoiceID(data.id)
          setQ1_Total(data.total_amount)
          setPaid(data.paid)
          setPay(0)
          setRemaining(data.remaining)
        }}>Pay</Button></td>
      </tr>
    )
  })

  const editClient = () => {
    Axios.get(`${baseURL}/editClient?id=${1}`)
      .then(response => {
        setName(response.data.client.name)
        setLoading(false) //stop loading when data is fetched
        setPreviousBalance(response.data.client.previous_balance)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    editClient()
  }, [])
  const changeHandlerFile = (event) => {
    event.preventDefault()
    setUploadFile(event.target.files[0])
    setFlag(1)
  }

  const AddPayToInvocie = () => {

    setIsButtonDisabled(true)
    if (name === '') {
      toast('Enter Name')
    } else if (
      name !== ''
    ) {
      const formData = new FormData()
      formData.append("file", uploadFile)
      const data = JSON.stringify(
        {
          invoiceID,
          paid: Number(pay),
          paymentType: payType,
          description,
          flag

        })
      formData.append("data", data)
      Axios.post(`${baseURL}/addInvoicePayment`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      ).then(data => {
        if (data.data.result !== "") {
          toast(`${data.data.result}`)
          setRefresh(refresh + 1)
          setOpen(false)
          setInvoiceID('')
          setQ1_Total(0)
          setPaid(0)
          setPay(0)
        } else {
          toast('Something went WRONG!')
        }

      }).catch(err => {
        toast(`${err}`)
      })
    } else {
      toast('Fill out fields correctly!')
    }
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000)

  }

  useEffect(() => {
    getData()
  }, [projectID, dateFrom, currentDate])

  return (
    <div>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            overflowY: 'scroll'
          }}
        >
          <Box sx={style}>
            <div>
              {/* Loader */}
              {isLoading ? (
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>) : (
                <form>

                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label >Client</label>
                      <input type="text" className="form-control" placeholder="" value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Total (PKR)</label>
                      <input type="text" className="form-control" value={Q1_Total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Pay (PKR)</label>
                      <input type="Number" className="form-control" placeholder={`${Number(Remaining).toLocaleString(undefined, { maximumFractionDigits: 2 })}`} value={pay > (Remaining) ? 0 : pay}
                        onChange={(e) => setPay(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">

                    <div className="form-group col-md-12">
                      <label>Remaining (PKR)</label>
                      <input type="text" className="form-control" placeholder="" disabled value={(Remaining - pay).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        onChange={(e) => setRemaining(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-12">

                      <label >Payment Type</label>
                      <select class="custom-select" value={payType} onChange={(e) => setPayType(e.target.value)} required>
                        <option value=''>Select Payment Type</option>
                        <option value='Bank'>Bank</option>
                        <option value='Cash'>Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label >Description</label>
                      <textarea className="form-control" placeholder="Describe here ...." value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label >Previous Balance (PKR)</label>
                      <input type="text" className="form-control" placeholder="Previous Balance" value={previousBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        disabled
                        onChange={(e) => setPreviousBalance(e.target.value)} />
                    </div>
                    {payType === 'Bank' ? (<div className="form-group col-md-12">
                      <label  >Upload File (Optional)</label>
                      <input type="file" className="form-control"
                        onChange={changeHandlerFile} />
                    </div>) : ''}
                  </div>
                  <div className="form-group">

                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-8" />
                    <div className="form-group col-md-4">
                      <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={AddPayToInvocie}>
                        PAY
                      </Button.Ripple>
                    </div>
                  </div>
                </form>)}
            </div>
          </Box>
        </Modal>
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

            <Col
              xl='12'
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
          </Col>
        </Row>
        <div style={{ height: 10, width: 100 }}>
          {/* Just for Space */}
        </div>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Projects</label>
            <select
              name="Projects"
              class="custom-select"
              onChange={(e) => setProjectID(e.target.value)}
              onFocus={(e) => e.target.any} required>

              <option >Select Project</option>
              {GetProjects.map((cat, index) => (
                <option key={index} value={cat.id} >{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label >Date From</label>
            <input type="date" className="form-control" placeholder="" value={dateFrom}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="form-group col-md-3">
            <label >Date To</label>
            <input type="date" className="form-control" placeholder="" value={currentDate}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setCurrentDate(e.target.value)} />
          </div>
          <div className="form-group col-md-2"></div>
          <div className="form-group col-md-1" style={{
            marginTop: 25
          }}>

          </div>
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
                  <th scope="col">Sr No</th>
                  <th scope="col">Client</th>
                  <th className='text-right' scope="col" style={{ textAlign: 'center' }}>Total (PKR)</th>
                  <th className='text-right' scope="col" style={{ textAlign: 'center' }}>Paid (PKR)</th>
                  <th className='text-right' scope="col" style={{ textAlign: 'center' }}>Remaining (PKR)</th>
                  <th scope="col">View</th>
                  <th scope="col">Pay</th>
                </tr>
              </thead>

              <tbody>
                {AllData}

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

const InvoiceList = () => {
  return (
    <div>
      <InvoiceData />
    </div>
  )
}

export default InvoiceList
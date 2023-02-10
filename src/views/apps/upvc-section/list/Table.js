// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react'

import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import AddNewModal from './CreateProject'
import { toast } from 'react-toastify'
import upvcContext from '../context/upvcContext'
// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useHistory } from "react-router"
import baseURL from '../../../../base-url/baseURL'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import { Chip } from '@mui/material'
import moment from 'moment'
import generatePDF from './tablePDF'
import Cookies from 'js-cookie'


// fitlter search
const FilterData = () => {
  const ucs = useContext(upvcContext)

  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')
  const [masterID, setMasterID] = useState('')
  const history = useHistory()
  const [Inc, setInc] = useState(0)
  const [modal, setModal] = useState(false)
  const role = Cookies.get('role')

  const handleModal = () => setModal(!modal)
  let valB
  let valC
  if (role === 'ACCOUNTANT' || role === 'ADMIN') {
    valB = true
  } else {
    valB = false
  }

  if (role === 'ACCOUNTANT') {
    valC = true
  }

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    setPageNo(pageNumber)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getQuotationsMaster?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.list.data)
        setLoading(false) //stop loading when data is fetched
        setTotal(response.data.list.total)
      })
      .catch(err => console.log(err))

  }, [pageNo, record, sortType, column, Inc])

  const PDF1 = (pdfID, type) => {
    console.log('type:::::::', type)
    Axios.get(`${baseURL}/getQuotation2?masterID=${pdfID}`)
      .then(response => {
        const sorted11 = response.data.childData
        const sorted22 = response.data.masterData

        Axios.get(`${baseURL}/getQuotation1?masterID=${pdfID}`)
          .then(response => {
            const sorted1122 = response.data.childData
            generatePDF(type, sorted11, sorted22, sorted1122)

            // history.push('/BPC/apps/getPDFForQ1', {
            //   params: {
            //     childData: sorted11,
            //     MasterData: sorted22,
            //     childDataPDF1: sorted1122
            //   }
            // })
          })
          .catch(err => console.log(err))
        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))

  }
  const StatusChange = (status, masterID) => {
    fetch(`${baseURL}/getPaymentStatus`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: masterID.id
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status === null && status === "APPROVED") {
          toast('Please Pay atleast 60% of Quotation Amount!')
        } else if (status === "APPROVED" && data.status.paid < (data.status.total_amount / 1.66)) {
          toast('Please Pay atleast 60% of Quotation Amount!')
        } else {
          Axios.post(`${baseURL}/changeQuotationStatus`, {
            status,
            masterID: masterID.id

          }).then(response => {
            toast('Quotation Status Changed Successfully!')
            setInc(Inc + 1)
          }).catch(err => {
            toast('Something went Wrong, Please try again!')
          })
        }

      }).catch(err => {
        console.log(err)
      })
  }

  const createcuttingsheet = (client_ID, Q1_id) => {
    history.push('/BPC/apps/cuttingsheet/list', {
      params: {
        client_ID,
        Q1_id
      }
    })
  }

  const EditQuotation = (QoID) => {
    ucs.setStateVsection(true)
    history.push('/BPC/apps/upvcCalculaions/qutation', { params: QoID })
  }
  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    return filter !== "" ? item.Quotation_date.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.Quotation1_Total.toString().includes(filter.toString()) || item.Quotation2_total_amount.toString().includes(filter.toString()) : item

  })

  const ActionButton = (id) => {
    return (
      <UncontrolledButtonDropdown direction='right'>
        <DropdownToggle color='primary' caret>
          Action
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => StatusChange('APPROVED', id)}>
            Approve
          </DropdownItem>
          <DropdownItem onClick={() => StatusChange('CANCELLED', id)}>
            Cancel
          </DropdownItem>

        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )

  }
  const ViewPDForDownlaod = ({ id }) => {
    return (
      <UncontrolledButtonDropdown direction='right'>
        <DropdownToggle color='primary' caret>
          View
        </DropdownToggle>
        <DropdownMenu right>

          <DropdownItem onClick={() => PDF1(id, 1)}>
            Export PDF
          </DropdownItem>
          <DropdownItem onClick={() => PDF1(id, 2)}>
            View PDF
          </DropdownItem>

        </DropdownMenu>
      </UncontrolledButtonDropdown>
    )

  }
  const InvoiceGenrate = (masterID) => {
    setModal(!modal)
    setMasterID(masterID)
  }
  const handlePay = (client_ID, Q1_Total, Q1_id) => {
    history.push('/BPC/apps/quotation/payment', {
      params: {
        client_ID,
        Q1_Total,
        Q1_id
      }
    })
  }

  const QuotationsData = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{`QT-0${data.id}`}</td>
        <td>{moment(data.Quotation_date).format('DD/MM/YYYY')}</td>
        <td>{data.clientName}</td>
        <td style={{ textAlign: 'right', paddingRight: 15 }}>{data.Quotation1_Total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        {valB === true ? <td>{data.paid > 0 ? (<Button disabled color='success'>Pay</Button>) : (<Button color='danger' onClick={() => handlePay(data.client_ID, data.Quotation1_Total, data.id)}>Pay</Button>)}</td> : ''}
        {/* <td>{(data.paid >= (data.total_of_costing / 1.66))  ? (<Button disabled color='success'>Pay</Button>) : (<Button color='danger' onClick={() => handlePay(data.client_ID, data.Quotation1_Total, data.id)}>Pay</Button>)}</td> */}

        {/* <td><Button onClick={() => createcuttingsheet(data.client_ID, data.id)}>Cutting Sheet</Button></td> */}
        <td>
          {/* <UncontrolledButtonDropdown direction='right'>
            <DropdownToggle color='primary' onClick={() => PDF1(data.id)}>
              View
            </DropdownToggle>
          </UncontrolledButtonDropdown> */}
          <ViewPDForDownlaod id={data.id} />
        </td>
        <td>{data.status}</td>
        <td>{(data.paid <= 0 && (data.status === "PENDING" || data.status === "COMPLETED" || data.status === "APPROVED")) ? <Button.Ripple color='primary' onClick={() => EditQuotation(data.id)}> Edit</Button.Ripple> : <Button.Ripple color='primary' disabled> Edit</Button.Ripple>}</td>
        <td> {data.status === 'APPROVED' ? <Button.Ripple color='primary' onClick={() => InvoiceGenrate(data.id)}>  Create Project </Button.Ripple> : (data.status === 'PENDING' ? (<ActionButton id={data.id} />) : '')}</td>
      </tr>
    )
  })
  return (
    <div>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
        <Row>
          <AddNewModal open={modal} handleModal={handleModal} id={masterID} />
          <Col xl='3' className='d-flex align-items-center p-0'>

            &nbsp; &nbsp;
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Sort
              </Label>
              &nbsp;  &nbsp;
              <select class="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>
                <option value="id">ID</option>
                <option value="clientName">Name</option>
                <option value="Quotation_date">Date</option>
                <option value="Quotation1_Total">Quotation 1 Total</option>
                <option value="Quotation2_total_amount">Quotation 2 Total</option>
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
            {
              valC ? '' : (<Link to='/BPC/apps/upvcCalculaions/qutation'>
                <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
              </Link>)
            }
            &nbsp;  &nbsp;

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
                  <th scope="col">Sr No</th>
                  <th scope="col">Quotation No</th>
                  <th scope="col">Date</th>
                  <th scope="col">Client Name</th>
                  <th scope="col" style={{ textAlign: 'center' }}>Quotation Total</th>
                  {valB === true ? <th scope="col">Pay</th> : ''}
                  {/* <th scope="col">Cutting Sheet</th> */}
                  <th scope="col">View</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>

              <tbody>
                {QuotationsData}

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

const ViewQuotation = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default ViewQuotation
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { CircleProgress } from 'react-gradient-progress'

// ** Third Party Components
import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Badge } from 'reactstrap'
import { useHistory } from "react-router"


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../../base-url/baseURL'
import moment from 'moment'
import { toast } from 'react-toastify'

const ProjectData = () => {
  const [suppliersF, setSuppliersF] = useState([])
  const [qutation1Child, setQutation1Child] = useState([])
  const [qutation2Child, setQutation2Child] = useState([])
  const [qutation1Master, setqutation1Master] = useState([])
  const [qutation2Master, setqutation2Master] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')
  const history = useHistory()

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }

  useEffect(() => {
    setLoading(true)
    Axios.get(`${baseURL}/getProjects?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&table=projects`)
      .then(response => {
        setSuppliersF(response.data.projects.data)
        setLoading(false)
        setTotal(response.data.projects.total)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getQuotation1?masterID=1`)
      .then(response => {
        setQutation1Child(response.data.childData)
        setqutation1Master(response.data.masterData)
        setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getQuotation2?masterID=1`)
      .then(response => {
        setQutation2Child(response.data.childData)
        setqutation2Master(response.data.masterData)
        setLoading(false)
      })
      .catch(err => console.log(err))
    
  }, [pageNo, record, sortType, column])

  const generateInvoice = (projectID, QoID) => {

    Axios.get(`${baseURL}/generateInvoice?projectID=${projectID}&&masterID=${QoID}`)
      .then(response => {
        if (response.data.result === "Project is not completed yet you cannot make invoice") {
          toast('Project is not completed yet you cannot make invoice')
        } else {
          history.push('/BPC/apps/invoice/listing')
          toast(`${response.data.result}`)
        }
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const current = new Date()
  const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`
  const date2 = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`

  const sorted = suppliersF
  const sorted1 = qutation1Child
  const sorted2 = qutation1Master
  const Master = qutation2Master
  const child = qutation2Child
  const ProjectData = sorted.filter(item => {
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.startDate.toString().includes(filter.toString()) || item.endDate.toString().includes(filter.toString()) || item.location.toLowerCase().includes(filter.toLowerCase()) || item.clientName.toLowerCase().includes(filter.toLowerCase()) || item.status.toLowerCase().includes(filter.toLowerCase()) : item
  })

  const ProjectArray = ProjectData.map((data, index) => {
    if (data.paid === null) {
      data.paid = 0
    } else if (data.total_amount === null) {
      data.total_amount = 1
    }
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{moment(data.startDate).format('DD/MM/YYYY')}</td>
        <td style={{ color: data.endDate === (date || date2) ? 'red' : '', border: data.endDate === (date || date2) ? '1px solid red' : '' }}>{moment(data.endDate).format('DD/MM/YYYY')} </td>
        <td><CircleProgress percentage={Number((data.producedQty * 100) / data.qty).toFixed(0)} strokeWidth={3} width="60" secondaryColor="#f0f0f0" /></td>
        <td style={{
          width: '16%'
        }}>{(((data.producedQty * 100) / data.qty) >= 100 && data.status !== 'INVOICE GENERATED') ? (<Button color="primary" onClick={() => generateInvoice(data.id, data.quotID)}>Generate</Button>) : (data.status === 'INVOICE GENERATED') ? (<CustomInput
          type='radio'
          className='custom-control-success'
          id='success'
          label='Generated'
          defaultChecked
          inline
        />) : (
          <CustomInput
            type='radio'
            className='custom-control-danger'
            id='danger'
            label='Not Yet Completed'
            defaultChecked
            inline
          />

        )}</td>

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

                <option value="name">Name</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
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
          >
            <Button.Ripple
              className="btn btn-danger"
              onClick={() => generatePDF(ProjectData)}
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
                  <th scope="col">Sr No</th>
                  <th scope="col">Project Name </th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>

                  <th scope="col">Progress</th>
                  <th scope="col" style={{
                    width: '16%'
                  }}>Invoice</th>
                </tr>
              </thead>

              <tbody>
                {ProjectArray}

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

const ProjectTable = () => {
  return (
    <div>
      <ProjectData />
    </div>
  )
}

export default ProjectTable
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

// ** Third Party Components
import Axios from 'axios'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { AlignRight, ChevronDown, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody,  Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../base-url/baseURL'


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

    const [DateFrom, setDateFrom] = useState('')
    const [DateTo, setDateTo] = useState('')

    const history = useHistory()

    const handlePageChange = (pageNumber) => {
      setPageNo(pageNumber)
    }

    const getVD = () => {
    Axios.get(`${baseURL}/getMaintenanceDetails?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&fromDate=${DateFrom}&&toDate=${DateTo}`)
    .then(response => {
      setSuppliersF(response.data.maintenanceDetails.data)
      setLoading(false) //stop loading when data is fetched
      setTotal(response.data.clients.total)
    })
    .catch(err => console.log(err))
  }
       const sorted = suppliersF
     const filterData = sorted.filter(item => {
      return filter !== "" ? item.parts_to_raplace.toLowerCase().includes(filter.toLowerCase()) ||  item.vehicleName.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.expenses.toString().includes(filter.toString()) || item.vehicle_periodic.toString().includes(filter.toString()) || item.date.toLowerCase().includes(filter.toLowerCase()) || item.description.toLowerCase().includes(filter.toLowerCase())  || item.employeeName.toLowerCase().includes(filter.toLowerCase()) : item 
     
     })

     const mappSuppliers = filterData.map((data, index) => {
       return (
      <tr key={data.index}>
        <td>{data.id}</td>
        <td>{data.vehicleName}</td>
        <td>{data.parts_to_raplace}</td>
        <td>{data.expenses}</td>
        <td>{data.employeeName}</td>
        <td>{data.vehicle_periodic}</td>
        <td>{data.description}</td>
        <td>{moment(data.date).format('DD/MM/YYYY')}</td>
      </tr>
       )

   })

   useEffect(() => {
    getVD()
   }, [pageNo, record, sortType, column, DateTo, DateFrom])
 
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
        <option  value="id">ID</option>
        <option value="vehicleName">Vehicle Name</option>
        <option value="parts_to_raplace">Parts to Replace</option>
        <option value="expenses">Expenses</option>
        <option value="date">Date</option>
        <option value="employeeName">Driver</option>
        <option value="vehicle_periodic">Vehicle Periodic</option>
        <option value="description">Description</option>
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
      
      <div style={{height:5, width: 100}}>
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
           <Link to='/BPC/apps/vehicle-maintenance/add'> 
        <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
         </Link> &nbsp;  &nbsp; 
            <Button.Ripple
              className="btn btn-primary"
              color="danger"
              onClick={() => generatePDF(sorted)}
            >
            <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp; 
        </Col>
      </Row>

      <div style={{height:10, width: 100}}>
  {/* Just for Space */}
      </div>
      <form>
        <div className="form-row">
      
        <div className="form-group col-md-4">
            <label >Date From</label>
            <input type="date" className="form-control" placeholder="" value={DateFrom}
            onFocus={(e) => e.target.select()} required
            onChange={(e) => setDateFrom(e.target.value)} />
        </div>
    
       
        <div className="form-group col-md-4">
        <label>Date To</label>
        <input type="date" className="form-control" placeholder=""  value={DateTo}
          onFocus={(e) => e.target.select()} required
            onChange={(e) => setDateTo(e.target.value)}/>
        </div>
        </div>
        
        </form>
      
      {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
      <div className="table-responsive">
    <table className="table table-striped">
   <thead>
     <tr>
       <th scope="col">ID</th>
       <th scope="col">Vehicle</th>
       <th scope="col">Parts to Replace</th>
       <th scope="col">Expenses</th>
       <th scope="col">Driver</th>
       <th scope="col">Vehicle Periodic</th>
       <th scope="col">Description</th>
       <th scope="col">Date</th>
       
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

const Table = () => {
  return (
    <div>
       <FilterData /> 
    </div>
   )
   }
   
   export default Table
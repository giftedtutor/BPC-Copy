// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import generatePDF from './tablePDF.js'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import { Card, CardHeader, CardTitle, CardBody,  Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

  // fitlter search
  const FilterData = () => {


    const [suppliersF, setSuppliersF] = useState([])
    const [filter, setFilter] = useState('')
    const [sortType, setSortType] = useState('desc') //desc , asc
    const [pageNo, setPageNo] = useState(1)
    const [total, setTotal] = useState()
    const [record, setRecord] = useState(10)
    const [isLoading, setLoading] = useState(true)
    const [column, setColumn] = useState('id')
    const [deleteRefresher, setDeleteRefresher] = useState(0)
    const [changeStatus, setChangeStatus] = useState(1)
    const history = useHistory()
    const location = useLocation()

    const handlePageChange = (pageNumber) => {
      setPageNo(pageNumber)
      setLoading(true)
   
    }

    useEffect(() => {
     
    Axios.get(`${baseURL}/getAllAlotedVehicles?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}&&table=alot_vehicles`)
    .then(response => {
      setSuppliersF(response.data.vehicles.data)
      setTotal(response.data.vehicles.total)
        setLoading(false)

    })
    .catch(err => console.log(err))

  }, [pageNo, record, sortType, column, deleteRefresher])

  const handleEdit = (id) => {
    history.push('/BPC/apps/purchase-orders/edit', {params:id})
  }

  const viewDetail = (viewID) => {
    history.push('/BPC/apps/alot-to-employeeListing/view', {params:viewID})
  }
  const statusChange = (idd) => {
    let txt
    if (confirm("Are you Really want to Transfer into Inventory?")) {
        txt = "OK"
    } else {
        txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/changePurchaseOrderStatus?id=${idd}`)
      .then(data => {
        if (data.data.result === "Order Status changed sucessfully") {
            toast('Order Status changed successfully')
            setDeleteRefresher(deleteRefresher + 1)
           
        }  else if (data.data.result === "Without making payment you cannot change the status") {
         toast('Sorry, Without making payment you cannot change the status')
          setDeleteRefresher(deleteRefresher + 1)
        
      } else  {
           toast('Something went Wrong!!')
        } 
    }).catch(err => {
        console.log(err)
      })

    }
    
  }

  const deleteOrder = (ParentID) => {

    let txt
  if (confirm("Are you Really want to DELETE?")) {
      txt = "OK"
  } else {
      txt = "Cancel"
  }
  if (txt === 'OK') {
    Axios.get(`${baseURL}/deletePurchaseOrder?orderID=${ParentID}`)
    .then(data => {
      if (data.data.result === "Order deleted sucessfully") {
         toast('Order deleted successfully')
          setDeleteRefresher(deleteRefresher + 1)
     } else if (data.data.result === "Order is received you cannot delete now") {
        toast('Order is received you cannot delete now!')
      } else {
         toast('There is some error')
      }
   
  }).catch(err => {
      console.log(err)
    })

  }

  }

    const Actionn = (val, id) => {
   
    if (val ===  'edit' && id !== '') {
      
      handleEdit(id)
    } else if (val ===  'view' && id !== '') {
      
      viewDetail(id)
    } else if (val ===  'dispatch' && id !== '') {
      
       deleteOrder(id)
    } else if (val ===  'received' && id !== '') {
      
      statusChange(id)
    } 
  }

    const sorted = suppliersF
  
     const filterData = suppliersF.filter(item => {
        return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) ||  item.id.toString().includes(filter.toString())   : item 
     
     })
  
     const mappSuppliers = filterData.map((data, index) => {
       return (
        <tr key={data.index}>
     
        <td>{data.id}</td>
        <td>{data.name} - {data.vehicleNO}</td>
        <td>{data.projectName}</td>
    
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
  <option  value="id">Sr. No</option>
 
  <option value="Name">Vehicle</option>
 <option value="projectName">Project</option>

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
     <Link to='/BPC/apps/vehicle/list'> 
  <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Vehicle </Button.Ripple>
   </Link> &nbsp;  &nbsp; 
     <Link to='/BPC/apps/allot-and-inventory-section/alot-vehcile-to-project'> 
  <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Alot </Button.Ripple>
   </Link> &nbsp;  &nbsp; 
     <Link to='/BPC/apps/alloted-vehicles-record/list'> 
  <Button.Ripple color='primary' onClick=''>History </Button.Ripple>
   </Link> &nbsp;  &nbsp; 
      <Button.Ripple
        className="btn btn-primary"
        onClick={() => generatePDF(filterData)}
        color="danger"
      >
      <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
      </Button.Ripple> &nbsp;  &nbsp;  <span style={{width:4, height:1}}></span>
  </Col>
</Row>
<div style={{height:10, width: 100}}>
{/* Just for Space */}
</div>
      <br/>
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
         <th scope="col">Sr. No</th>
         <th scope="col">Vehicle</th>
         <th scope="col">Project</th>
       
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
     </div>
   
     )}

   </div>
   </div>
  
   )

  
   }

const OrdersList = ({ mappSuppliers }) => {
  return (
    <div>
 
       <FilterData />
   
    </div>
   )
   }
   
   export default OrdersList

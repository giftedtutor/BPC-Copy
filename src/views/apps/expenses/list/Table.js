// ** React Imports
import { useState, useEffect } from 'react'
import { Link, Redirect} from 'react-router-dom'
import generatePDF from './tablePDF.js'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import {  Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import baseURL from '../../../../base-url/baseURL'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import moment from 'moment'

  // fitlter search
  const FilterName = () => {
    const [suppliersF, setSuppliersF] = useState([])
    const [filter, setFilter] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [sortType, setSortType] = useState('desc')
    const [pageNo, setPageNo] = useState(1)
    const [total, setTotal] = useState()
    const [record, setRecord] = useState(10)
    const [isLoading, setLoading] = useState(true)
    const [column, setColumn] = useState('id')
    const history = useHistory()
    const [In, setIn] = useState(0)
    const [deleteRefresher, setDeleteRefresher] = useState(0)
    const [File, setFile] = useState('')
    const handlePageChange = (pageNumber) => {
      setPageNo(pageNumber)
    }

    useEffect(() => {
    Axios.get(`${baseURL}/ListingExpense?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
    .then(response => {
      
      setSuppliersF(response.data.Expense.data)
      setLoading(false) //stop loading when data is fetched
      setTotal(response.data.Expense.total)
    })
    .catch(err => console.log(err))
  }, [pageNo, record, sortType, In, column, deleteRefresher])

  const handleEdit = (id) => {
    // /apps/product/editCategory/
    history.push('/BPC/apps/productType/edit', {params:id})
  }
  const uploadFile = (iddd) => {
   
    setIsButtonDisabled(true)
    if (File === '') {
      toast('Upload File!')
    }  else if (File !== '') {
      const formData = new FormData()
      formData.append("file", File)
      const data = JSON.stringify({
         id:iddd
      })
      formData.append("data", data)
      // ${baseURL}/uploadQC?poID=${PoID}`
      Axios.post(`${baseURL}/uploadExpenseImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(data => {
         
            if (data.data.result === "Image uploaded successfully") {
            
                toast('Image uploaded successfully!')
                setIn(In + 1)
                // history.push('/BPC/apps/expenses/list')
            } else {
                toast('Image did not upload, Please try again ')
                // history.push('/BPC/apps/productType/add/add.js') 
            }
         
        }).catch(err => {
            console.log(err)
        })
    } else {
        toast('Fill out all fields correctly!')
    }

  setTimeout(() => { 
    setIsButtonDisabled(false)
  }, 3000)

  }

  const deleteProductType = (ParentID) => {
 
    // alert("I am an alert box!")
    let txt
    if (confirm("Are you Really want to DELETE?")) {
        txt = "OK"
    } else {
        txt = "Cancel"
    }
    console.log('PRESSED:::', txt)
    if (txt === 'OK') {
      Axios.get(`${baseURL}/deleteProductType?id=${ParentID}`)
      .then(data => {
       
        if (data.data.result === "This product type is used in other tables so you cannot delete it") {
         
            toast('This product type is used in other tables so you cannot delete it')
   
        } else if (data.data.result === "Product Type Deleted successfully") {
          toast('Product Type Deleted Successfully!')
          setDeleteRefresher(deleteRefresher + 1)
        } else {
            toast('Something went Wrong!')
        }
     
    }).catch(err => {
        console.log(err)
      })
    }
    }
       const sorted = suppliersF
      //  sort(sorted, sortType, column)
     const filterName = sorted.filter(item => {

      const space = ' '
      const catDec = item.catName + space + item.subcatName + space + item.description 
      return filter !== "" ? item.id.toString().includes(filter.toString()) || catDec.toLowerCase().includes(filter.toLowerCase()) || item.date.toLowerCase().includes(filter.toLowerCase()) || item.amount.toString().includes(filter.toString()) : item 
     
     })

     const mappSuppliers = filterName.map((data, index) => {
       return (
        <tr key={data.index} style={{border: data.role === 'FACTORY_FINANCE'  ? '2px solid #1b9e3e' : (data.role === 'ACCOUNTANT'  ? '2px solid #2134ff' : (data.role === 'ADMIN'  ? '2px solid #ad0773' : '')), color: data.role === 'FACTORY_FINANCE' ? '' : ''}}>
        <td>{data.id}</td>
        <td>{data.catName}</td>
        <td>{data.subcatName}</td>
        <td>{moment(data.date).format('DD/MM/YYYY')}</td>
        <td>{data.description}</td>
        
        <td style={{textAlign: 'right'}}>{data.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
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
        <option value="catName">Category</option>
        <option value="subcatName">Sub Category</option>
        <option value="amount">Amount</option>
        <option value="description">Description</option>
        <option value="date">Date</option>
       
       
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
           <Link to='/BPC/apps/expense-account/add'> 
        <Button.Ripple color='primary' onClick=''> Create Account </Button.Ripple>
         </Link> &nbsp;  &nbsp; 
           <Link to='/BPC/apps/expenses/add'> 
        <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
         </Link> &nbsp;  &nbsp; 
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterName)}
              color='danger'
            >
            <FontAwesomeIcon icon={faFilePdf} color="white" />  Pdf
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp; 
        </Col>
      </Row>
      <div style={{height:10, width: 100}}>
  {/* Just for Space */}
      </div>
     
       <div style={{height:10, width: 100}}></div>
      
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
       <th scope="col"> Sr. No</th>
       <th scope="col"> Category</th>
       <th scope="col"> Sub Category</th>
       <th scope="col">Date</th>
       <th scope="col">Description</th>
       <th scope="col" style={{textAlign: 'center', width: 150}}>Amount</th>

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

const ClientsList = () => {
  return (
    <div>
       <FilterName /> 
    </div>
   )
   }
   
   export default ClientsList
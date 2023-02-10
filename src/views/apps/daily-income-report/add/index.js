import React, {useState, useEffect} from 'react'
import {Button, Row, Col} from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import generatePDF from './tablePDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination"

const DailyIncomeReport = () => {
     
    // const role = Cookies.get('role')
    const [suppliersF, setSuppliersF] = useState([])
    const [SupplierName, setSupplierName] = useState([])
    const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
    const [DateTo, setDateTo] = useState('')

    const [sortType, setSortType] = useState('desc')
    const [pageNo, setPageNo] = useState(1)
    const [total, setTotal] = useState()
    const [record, setRecord] = useState(10)
    const [isLoading, setLoading] = useState(true)
    const [isLoading2, setLoading2] = useState(false)
    const [column, setColumn] = useState('id')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [filter, setFilter] = useState('')
    
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
          }  else if (currentDate !== '') {
            setLoading2(true)
            Axios.get(`${baseURL}/dailyIncomeReport?date=${currentDate}&&sort=asc&&colName=id&&pageNo=${1}&&records=999999999&&table=general_ledgers`)
            .then(response => {
              if (response.data.income.data.length === 0) {
                toast('No Income Report against provided Date!')
                setLoading2(false)
              } else {
                setSuppliersF(response.data.income.data)
                setLoading2(false) //stop loading when data is fetched
                setTotal(response.data.income.total)
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

      const filterName = suppliersF?.filter(item => {
        return filter !== "" ? item.clientName.toLowerCase().includes(filter.toLowerCase()) || item.debit.toString().includes(filter.toString())  || item.description.toLowerCase().includes(filter.toLowerCase())  : item 
       
       })

      const mappSuppliers = filterName?.map((data, index) => {
        return (
       <tr key={data.index}>
         <td>{data.clientName}</td>
         <td style={{textAlign: 'right', width: 100}}>{data.debit}</td>
         <td style={{textAlign: 'center'}}>{data.description}</td>
      
       </tr>
        )
    }) 
    const addPayToSuppplier = (idd) => {
      history.push('/BPC/apps/income/payment', {params:idd})
    }
    useEffect(() => {
      getLedger()
    }, [currentDate])
    
    return (
        <div>
             <form>
               <h1 style={{textAlign: 'center'}}>Daily Income Report</h1>
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
              id=''
              type='text'
               value={filter}
              onChange={e => setFilter(e.target.value)}
              className="form-control"
              placeholder='Search here'
            />
        </div>
        <div className="form-group col-md-3" style={{marginTop:26}}>
        </div>
        <div className="form-group col-md-1" style={{marginTop:26}}>
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterName)}
              color="danger"
            >
            <FontAwesomeIcon icon={faFilePdf} color="white" /> PDF 
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
     {  isLoading2 ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
      <div className="table-responsive">
    <table className="table table-striped">
   <thead>
     <tr>
       <th scope="col">Client</th>
       <th scope="col" style={{textAlign: 'center'}}>Debt(PKR)</th>
       <th scope="col" style={{textAlign: 'center'}}>Description (PKR)</th>
   
     </tr>
   </thead>
   <tbody>
    {mappSuppliers}
    <div style={{height: 10}}></div>
    
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

export default DailyIncomeReport
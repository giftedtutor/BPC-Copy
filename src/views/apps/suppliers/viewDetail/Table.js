// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'

// ** Third Party Components
import Axios from 'axios'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { AlignRight, ChevronDown, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../base-url/baseURL'

const FilterData = () => {
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [column, setColumn] = useState('id')

  const history = useHistory()
  const location = useLocation()
  const id = location.state.params

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getSupplier?supplierID=${id}`)
      .then(response => {
        setSuppliersF(response.data.supplier)
        setLoading(false) 
      })
      .catch(err => console.log(err))
  }, [pageNo, record])
  return (
    <div>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
        <Row>
          
        <h3>Details of {suppliersF.name}</h3>
        </Row>

        <div style={{ height: 5, width: 100 }}>
          {/* Just for Space */}
        </div>

        <Row>

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
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nature of Work</th>
                   <th scope="col" style={{textAlign: 'center'}}>Previous Balance (PKR)</th>
                </tr>
                
              </thead>
              <tbody>
                <tr >
                  <td>{suppliersF.name}</td>
                  <td>{suppliersF.address}</td>
                  <td>{suppliersF.city}</td>
                  <td>{suppliersF.contact_no}</td>
                  <td>{suppliersF.email}</td>
                  <td>{suppliersF.natureOfWork}</td>
                  <td style={{textAlign: 'right'}}>{suppliersF.previous_balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                </tr>

              </tbody>
            </table>

          </div>)}

      </div>
    </div>

  )
}

const ViewSupllierDetail = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default ViewSupllierDetail
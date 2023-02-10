// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'

import baseURL from '../../../../base-url/baseURL'
// ** Third Party Components
import Axios from 'axios'

import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import Cookies from 'js-cookie'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// fitlter search
const FilterData = () => {

  const role = Cookies.get('role')
  const [suppliersF, setSuppliersF] = useState([])
  const [filter, setFilter] = useState('')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(9999999)
  const [sortType, setSortType] = useState('desc')
  const [isLoading, setLoading] = useState(true)

  const [column, setColumn] = useState('id')
  const history = useHistory()

  useEffect(() => {
    Axios.get(`${baseURL}/getItems?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.items.data)
        setLoading(false) //stop loading when data is fetched
        setTotal(response.data.items.total)
      })
      .catch(err => console.log(err))

  }, [pageNo, record, sortType, column])

  const handleEdit = (id) => {
    history.push('/BPC/apps/allot-and-inventory-section/edit', { params: id })
  }
  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PRODUCTION' || role === 'FINANCE') {
    valB = true
  } else {
    valB = false
  }

  const sorted = suppliersF
  const filterData = suppliersF.filter(item => {
    if (item.localName === null || item.localName === undefined) {
      item.localName = ''
    } else {
      item.localName = item.localName
    }
    return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.itemID.toString().includes(filter.toString()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{data.itemID}</td>
        <td>{data.categoryName} </td>
        <td>{data.subCategoryName} </td>
        <td>{data.name} </td>
        {valB === true ? '' : <td><Button onClick={() => handleEdit(data.itemID)}>Edit</Button></td>}
      </tr>
    )

  })

  return (
    <div>
      <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>

        <Row>
          <Col
            xl='3' className='d-flex align-items-center p-0'>

            &nbsp; &nbsp;
            <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
              <Label className='mb-0' for='search-invoice'>
                Sort
              </Label>
              &nbsp;  &nbsp;
              <select class="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>
                <option value="id">ID</option>
                <option value="unit1quantity">Unit</option>
                <option value="categoryName">Category Name</option>
                <option value="subCategoryName">Sub Category Name</option>
                <option value="name">Name</option>
                <option value="length">Length</option>
                <option value="width">Width</option>
                <option value="measure">Measure</option>
                <option value="Boq_Costing_Type">Boq/Costing Type</option>
                <option value="upvcrate">Upvc Rate</option>
                <option value="minimumLevel">Minimum Level</option>

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
                <option value='9999999'>All</option>
              </CustomInput>
              <Label for='rows-per-page'>Entries</Label>
            </div>
          </Col>

          <Col
            xl='9'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            <Link to='/Koncept_Koncept_BPC/apps/stock/add' style={{ display: 'none' }}>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterData)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  Export
            </Button.Ripple> &nbsp;  &nbsp; <span style={{ width: 4, height: 1 }}></span>
          </Col>
        </Row>
        <div style={{ height: 5, width: 100 }}>
          {/* Just for Space */}
        </div>

      </div >
      {isLoading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>) : (

        <div className="table-responsive printme">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Item ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Sub Category Name</th>
                <th scope="col">Item Name</th>
                {valB === true ? '' : <th scope="col">Update Record</th>}

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
                onChange={(e) => {
                  setPageNo(e)
                  setLoading(true)
                }}
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

// ** Table Header

const ItemsList = ({ mappSuppliers }) => {
  return (
    <div>

      <FilterData />
    </div>
  )
}

export default ItemsList

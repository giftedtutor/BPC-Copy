// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import generatePDF from './tablePDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { CircleProgress } from 'react-gradient-progress'
import baseURL from '../../../../base-url/baseURL'

// ** Third Party Components
import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


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

  const [OrdersDetails, setOrdersDetails] = useState([])

  const history = useHistory()
  const location = useLocation()

  const [BothArray, setBothArray] = useState([])
  const id = location.state.params

  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
  }
  useEffect(() => {
    Axios.get(`${baseURL}/getProductionOrderDetails?poID=${id}&&records=99999&&pageNo=1`)
      .then(response => {
        setOrdersDetails(response.data.products.data)
        setSuppliersF(response.data.items.data)
        setBothArray(response.data)

        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))
  }, [pageNo, record])

  const sorted = suppliersF
  const filterData = sorted.filter(item => {
    return filter !== "" ? item.itemName.toLowerCase().includes(filter.toLowerCase()) || item.itemQuantity.toString().includes(filter.toString()) : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.itemName}</td>
        <td>{Number(data.itemQuantity).toFixed(2)}</td>
      </tr>
    )
  })

  const mappSuppliers2 = OrdersDetails.map((data, index) => {
    return (
      <tr key={data.index}>

        <td> {index + 1} </td>
        <td> {data.windowType} </td>
        <td> {data.qty} </td>
        <td> {data.producedQty} </td>

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
                <option value="id">Sr. No</option>
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
          <Col
            xl='12'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
          >
            <Button.Ripple
              color='danger'
              className="btn btn-primary"
              onClick={() => generatePDF(BothArray)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
          </Col>
        </Row>
        <div style={{ height: 10, width: 100 }}>
          {/* Just for Space */}
        </div>
        <h1>Production Order Items</h1>
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
                  <th scope="col">Sr. No</th>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {mappSuppliers}

              </tbody>
            </table>
            {/* <Row>
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
  </Row> */}
          </div>)}
        <h1>Production Order Products</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>

                <th scope="col"> Sr. No </th>
                <th scope="col"> Window Type </th>
                <th scope="col">Total Quantity </th>
                <th scope="col">Produced Quantity </th>

              </tr>
            </thead>
            <tbody>
              {mappSuppliers2}

            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

const List = () => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default List
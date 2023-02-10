// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
// ** Third Party Components
import Axios from 'axios'
import { Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
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

  useEffect(() => {
    Axios.get(`${baseURL}/getUnits?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
      .then(response => {
        setSuppliersF(response.data.units.data)
        setTotal(response.data.units.total)
        setLoading(false)
      })
      .catch(err => console.log(err))


  }, [pageNo, record, suppliersF, sortType, column])
  const handleEdit = (id) => {
    history.push('/BPC/apps/product/edit', { params: id })
  }

  const deleteUnit = (ParentID) => {
    let txt
    if (confirm("Are you Really want to Unit?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
    if (txt === 'OK') {
      Axios.get(`${baseURL}/deleteUnit?id=${ParentID}`)
        .then(data => {
          if (data.data.result === "Unit deleted successfully") {

            toast('Unit deleted successfully')
          } else if (data.data.result === "This unit cannot be deleted as it is in use") {
            toast('This unit cannot be deleted as it is in use')
          } else {
            toast('Something went Wrong!')
          }

        }).catch(err => {
          console.log(err)
        })
    }

  }
  const sorted = suppliersF
  const filterData = suppliersF.filter(item => {
    return filter !== "" ? item.unit1quantity.toString().includes(filter.toString()) || item.unit2quantity.toString().includes(filter.toString()) || item.unit1name.toLowerCase().includes(filter.toLowerCase()) || item.unit2name.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.unit2code.toLowerCase().includes(filter.toLowerCase()) || item.unit1code.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const TableDataa = filterData.map((data, index) => {
    return (
      <tr key={index}>
        <td>{data.id}</td>
        <td>{data.unit1name} - {data.unit1code} </td>
        <td>{data.unit2name} - {data.unit2code}  </td>
        <td>{data.unit1quantity} {data.unit1code} = {data.unit2quantity} {data.unit2code} </td>

        <td><Button onClick={() => handleEdit(data.id)}>Edit</Button></td>
        <td> <Button color="danger" onClick={() => deleteUnit(data.id)}>Delete</Button>  </td>

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
                <option value="id">ID</option>
              </select>
              &nbsp;  &nbsp;
              <select class="custom-select" value={sortType} onChange={(e) => setSortType(e.target.value)} required>

                <option value="asc">Asc</option>
                <option selected value="desc">Desc</option>
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
            <Link to='/BPC/apps/product/addUnit'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(sorted)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  Export
            </Button.Ripple> &nbsp;  &nbsp;  <span style={{ width: 4, height: 1 }}></span>
          </Col>
        </Row>

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
                  <th scope="col">Unit ID</th>
                  <th scope="col">Unit 1 Name - Code</th>
                  <th scope="col">Unit 2 Name - Code</th>
                  <th scope="col"> Conversion</th>
                  <th scope="col"> EDIT</th>
                  <th scope="col"> DELETE</th>

                </tr>
              </thead>
              <tbody>
                {TableDataa}
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
                  onChange={(e) => setPageNo(e)}
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

const List = ({ TableDataa }) => {
  return (
    <div>
      <FilterData />
    </div>
  )
}

export default List

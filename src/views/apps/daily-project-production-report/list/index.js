import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'reactstrap'
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
  const [dailyProgressReportData, setdailyProgressReportData] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
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
    if (currentDate === '' || currentDate !== '') {
      setLoading2(true)
      fetch(`${baseURL}/getDailyProjectProductionByDate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: currentDate
        })
      }).then(res => res.json()).then(response => {

        if (response.record.length === 0) {
          toast('No Progress Report against provided Date!')
          setLoading2(false)
        } else {
          setdailyProgressReportData(response.record)
          setLoading2(false) //stop loading when data is fetched
          setTotal(response.record)
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
  const filterName = dailyProgressReportData.filter(item => {

    return filter !== "" ? item.projectName.toLowerCase().includes(filter.toLowerCase()) || item.windowType.toLowerCase().includes(filter.toLowerCase()) || item.location.toLowerCase().includes(filter.toLowerCase()) || item.totalWindows.toString().includes(filter.toString()) || item.completedWindows.toString().includes(filter.toString()) : item

  })
  useEffect(() => {
    getLedger()
  }, [currentDate])


  const dailyProjectProgressData = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.projectName}</td>
        <td>{data.windowType === 'drawWindow' ? 'Draw Window' : (data.windowType === 'DDOOR' ? 'Double Door' : data.windowType)}</td>
        <td>{data.location}</td>
        <td style={{ textAlign: 'right' }}>{data.totalWindows}</td>

        <td style={{ textAlign: 'right' }}>{data.completedWindows}</td>

        <td>{data.QCStatus === 'COMPLETE' ? 'COMPLETED' : data.QCStatus}</td>

        <td>{data.QCStatus === 'COMPLETE' ? (<Button onClick={() => {
          history.push('/BPC/apps/qc-for-project/addQC', {
            params: data.project_id
          })
        }}>QC</Button>) : (<Button disabled>QC</Button>)}

        </td>
      </tr>
    )

  })

  return (
    <div>
      <form>
        <h1 style={{ textAlign: 'center' }}>Daily Project Progress Report</h1>
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
          <div className="form-group col-md-3" style={{ marginTop: 26 }}>

          </div>
          <div className="form-group col-md-1" style={{ marginTop: 26 }}>
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterName, currentDate)}
              color="danger"
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
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

      {/* 
 */}

      {/* Loader */}
      {isLoading2 ? (
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
                <th scope="col">Project</th>
                <th scope="col">Windows Type</th>
                <th scope="col">Location</th>
                <th scope="col" style={{ textAlign: 'center' }}>Total Windows</th>
                <th scope="col" style={{ textAlign: 'center' }}>Completed Windows</th>

                <th scope="col">Status</th>
                <th scope="col">QC</th>

              </tr>
            </thead>
            <tbody>
              {dailyProjectProgressData}
              <div style={{ height: 10 }}></div>

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
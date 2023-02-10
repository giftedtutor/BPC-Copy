import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import generatePDF from './tablePDF.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination"
import { Link } from 'react-router-dom'

const list = () => {

  const [suppliersF, setSuppliersF] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
  const [ProjectID, setProjectID] = useState('')
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
  const [ProjectName, setProjectName] = useState([])
  const [PreviousBalance, setPreviousBalance] = useState()
  const [deleteRefresher, setDeleteRefresher] = useState(0)


  const history = useHistory()
  const getLedger = () => {
    setIsButtonDisabled(true)
    if (ProjectID === '') {
      toast('Chose Date!')
    } else if (ProjectID !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/getAlotedMachiens?projectID=${ProjectID}&&pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
        .then(response => {
         if (response.data.machines.data[0] === undefined) {
            toast('No Machine Allotted to this Project!')
            setLoading2(false)
            setSuppliersF([])
          } else {
            setSuppliersF(response.data.machines.data)
            setLoading2(false) //stop loading when data is fetched
            setTotal(response.data.machines.total)
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


  useEffect(() => {

    Axios.get(`${baseURL}/getprojectsDropdown`)
      .then(response => {
       
        setProjectName(response.data.projects)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

  }, [])
  const filterName = suppliersF.filter(item => {

    return filter !== "" ? item.id.toString().includes(filter.toString()) || item.projectName.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) : item

  })

  const returnMachine = (ParentID, ProjectID) => {
 let txt
    if (confirm("Are you Really want to Return?")) {
      txt = "OK"
    } else {
      txt = "Cancel"
    }
   
    if (txt === 'OK') {
      // Axios.get(`${baseURL}/returnMachineAfterRepair?machineID=${}`)
      fetch(`${baseURL}/returnMachine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          machineID: ParentID,
          projectID: ProjectID
        })
      }).then(data => data.json())
        .then(data => {
       
          if (data.result === "Machine Returned Successfully") {
         
            toast('Machine Returned Successfully!')
            setDeleteRefresher(deleteRefresher + 1)
            getLedger()
           } else if (data.result === "Order is received you cannot delete now") {
            toast('Order is received you cannot delete now!')
          } else {
           
            toast('There is some error')
          }

        }).catch(err => {
          console.log(err)
        })
    }
  }

  const mappSuppliers = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{data.id}</td>
        <td>{data.projectName}</td>
        <td>{data.name}</td>
     
      <td><Button onClick={() => returnMachine(data.id, data.projectID)}>Return</Button></td>
      </tr>
    )

  })

  const addPayToSuppplier = (idd) => {
   history.push('/BPC/apps/expense/payment', { params: idd })
  }

  useEffect(() => {
     getLedger()
  }, [ProjectID])
  

  return (
    <div>
      <form>
        <h1 style={{ textAlign: 'center' }}></h1>
        <div className="form-row">
        
          <div className="form-group col-md-4">
            <label >Projects</label>
            <select class="custom-select" onChange={(e) => setProjectID(e.target.value)}
              onFocus={(e) => e.target.any}
              required>
              <option>Select Project</option>
              {ProjectName.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>

          </div>


          <div className="form-group col-md-4">
            <label>
              Search
            </label>
            <input
              id='search-invoice'

              type='text'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="form-control"
              placeholder='Search here'
            />
          </div>
          <div className="form-group col-md-4" style={{ marginTop: 19 }}>
          <Link to='/BPC/apps/machine/list'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Machine </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Link to='/BPC/apps/allot-and-inventory-section/alot-machine-to-project'>
              <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Alot </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Link to='/BPC/apps/alloted-machines-record/list'>
              <Button.Ripple color='primary' onClick=''>History </Button.Ripple>
            </Link> &nbsp;  &nbsp;
            <Button.Ripple
              className="btn btn-primary"
              onClick={() => generatePDF(filterName)}
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

            {/* <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={getLedger}>
              GET
            </Button.Ripple> */}
          </div>
        </div>
      </form >

      {/* 
 */}

      {/* Loader */}
      {
        isLoading2 ? (
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
                  <th scope="col">Machine</th>

                  <th scope="col">Return</th>

                </tr>
              </thead>
              <tbody>
                {mappSuppliers}
                <div style={{ height: 10 }}></div>
                {/* {SupplierIDFromAPI === '' ? <Button disabled>Receive Payment from Client</Button> : <Button onClick={() => addPayToSuppplier(SupplierIDFromAPI)}>Receive Payment from Client</Button> } */}

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

          </div>)
      }

    </div >
  )
}

export default list
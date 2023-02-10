/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-js-pagination"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AdvanceandReimburstSalary = () => {

  const [suppliersF, setSuppliersF] = useState([])
  const [Employees, setEmployees] = useState([])
  const [EmployeeIDFromAPI, setEmployeeIDFromAPI] = useState('')
  const [DateFrom, setDateFrom] = useState('')
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

  const [reimID, setReimID] = useState()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reimbursment, setReimbursment] = useState(0)

  const history = useHistory()
  const getData = () => {
    setIsButtonDisabled(true)
    if (EmployeeIDFromAPI === '') {
      toast('Please Select Employee!')
    } else if (EmployeeIDFromAPI !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/getEmployeesAdvanceSalary?id=${EmployeeIDFromAPI}&&pageNo=1&&records=999999&&sort=asc&&colName=id`)
        .then(response => {

          if (response.data.employee.data.length === 0) {
            toast('No Advance Salary for this Employee!')
            setSuppliersF([])
            setLoading2(false)
          } else {
            setSuppliersF(response.data.employee.data)
            setLoading2(false) //stop loading when data is fetched
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
  const Addreimbursment = () => {
    if (reimbursment === "") {
      toast("Enter advance Salary!");
    } else if (
      reimbursment !== ""

    ) {
      fetch(`${baseURL}/addReimbursement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: reimID,
          reimbursement: reimbursment,
        }),
      })
        .then(res => res.json())
        .then(data => {
       
          if (data.result === "Reimbursement saved successfully") {
            toast("Reimbursement saved successfully!");
            getData()
            handleClose()
          } else {
            toast("Reimbursement did not save, Please try again ");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast("Fill out fields correctly!");
    }
  };


  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber)
    setLoading2(true)
  }
  useEffect(() => {
    getData()
    Axios.get(`${baseURL}/getEmployeesList`)
      .then(response => {
        setEmployees(response.data.employee)
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [pageNo])
  const filterData = suppliersF.filter(item => {
    return filter !== "" ? item.advance.toString().includes(filter.toString()) || item.reimbursement.toString().includes(filter.toString()) || item.date.toString().includes(filter.toString())  : item

  })

  const mappSuppliers = filterData.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.advance}</td>
        <td>{data.reimbursement}</td>
        <td>{data.date}</td>

        <td><Button onClick={() => {
          handleOpen()
          setReimID(data.id)
        }}>Add Reimbursement </Button></td>
      </tr>
    )

  })

  const addPayToSuppplier = (idd) => {
    history.push('/BPC/apps/income/payment', { params: idd })
  }

  useEffect(() => {
    getData()
  }, [EmployeeIDFromAPI])
  
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div>
         
            <form>
              <div className="form-row">
                
                <div className="form-group col-md-12">
                  <label>Reimbursment</label>
                  <input
                    type="Number"
                    className="form-control"
                    placeholder="2000"
                    value={reimbursment}
                    style={{ textTransform: "capitalize" }}
                    onFocus={e => e.target.select()}
                    required
                    onChange={e => {
                      setReimbursment(e.target.value);
                    }}
                  />
                </div>
              </div>

              <Button.Ripple color="primary" onClick={() => {
                Addreimbursment()
              }}>
                Store
              </Button.Ripple>
            </form>
          </div>
        </Box>
      </Modal>
      <form>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label >Employee</label>

            <select class="custom-select" onFocus={(e) => e.target.any} required onChange={(e) => setEmployeeIDFromAPI(e.target.value)}>
              <option>Select Employee</option>
              {Employees.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
         <div className="form-group col-md-3" style={{ marginTop: 26 }}>
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
                <th scope="col">Advance Salary</th>
                <th scope="col">Reimbursement</th>
                <th scope="col">Date</th>
                <th scope="col">Reimbursement</th>

              </tr>
            </thead>
            <tbody>
              {mappSuppliers}
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

export default AdvanceandReimburstSalary
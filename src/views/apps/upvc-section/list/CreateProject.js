// ** React Imports
import { useState, Fragment, useEffect } from 'react'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'

import { useDispatch } from "react-redux"
import baseURL from '../../../../base-url/baseURL'
import { useHistory } from "react-router"
import Avatar from '@components/avatar'
import { Loader, Info, User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import { toast } from 'react-toastify'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Card, CardHeader, CardBody, CardTitle,
  Label,
  Alert
} from 'reactstrap'
import axios from "axios"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { handleFormSubmit } from "@store/actions/forms/upvcCalculations"

const AddNewModal = ({ open, handleModal, id }) => {
  const AutoCloseToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='primary' icon={<Loader size={12} />} />
          <h6 className='text-primary ml-50 mb-0'>Input Added</h6>
        </div>
        <small className='text-muted'>Just Now</small>
      </div>
      <div className='toastify-body'>
        <span>Input has been successfully added</span>
      </div>
    </Fragment>
  )
  const notifyAutoClose = () => toast.success(<AutoCloseToast />, { autoClose: 3000, hideProgressBar: true })

  // ** State
  const [totalSqft, setTotalSqft] = useState(23)
  const [totalMm, setTotalMm] = useState(0)
  const [Picker, setPicker] = useState(new Date())
  const [addFormData, setAddFormData] = useState({

    name: "",
    location: "",
    startDate: "",
    endDate: ""
  })
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  const dispatch = useDispatch()
  const onFormSubmit = event => {
    event.preventDefault()
    fetch(`${baseURL}/addProject`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        masterID: id,
        name: addFormData.name,
        location: addFormData.location,
        startDate: addFormData.startDate,
        endDate: addFormData.endDate
      })
    }).then(res => res.json())
      .then(data => {
        if (data.result === "Project created successfully") {

          toast('Project created successfully!')
          history.push('/BPC/apps/project/listing')
        } else {
          toast('Project did not place, Please try again ')
        }

      }).catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    axios.get(`${baseURL}/checkSqftCapacity?upvc_master_id=${id}`)
      .then(response => {
        setData(response.data)
        setLoading(false) //stop loading when data is fetched
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-md"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-3"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Create Project</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (<form
            onSubmit={(e) => {
              onFormSubmit(e)
            }}
          >
            <Alert color={`${data?.totalSqtf > 25000 ? 'danger' : 'success'}`}>
              <div className='alert-body font-small-2'>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Total Sqft Limit for this month: 25000.00</span>
                    <br />
                    <span className='fw-bold'>Current Quotation Sqft: {Number(data?.currentQuotationSqtf).toFixed(2)}</span>
                    <br />
                    <span className='fw-bold'>Total Sqft for this month: {Number(data?.totalSqtf).toFixed(2)}</span>
                  </small>
                </p>
              </div>
            </Alert>
            <div className="form-column">

              <div className="form-group col-md-12">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="form-control"
                  placeholder="Location"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Start Date</label>
                <input
                  name="startDate"
                  id="startDate"
                  type="date"
                  className="form-control"
                  placeholder=""
                  onChange={handleAddFormChange}
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-group col-md-12">
                <label>End Date</label>
                <input
                  name="endDate"
                  id="endDate"
                  type="date"
                  className="form-control"
                  placeholder=""

                  onChange={handleAddFormChange}
                />
              </div>

              <div className="form-group col-md-12">
                <Button type="submit" className="mr-2" color="primary" outline >
                  Submit
                </Button>
                <Button className="mr-2" color="secondary" onClick={handleModal} outline>
                  Cancel
                </Button>
              </div>
            </div>
          </form>)}
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal

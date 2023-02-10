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

const AddNewModal = ({ open, handleModal, employeeID }) => {
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

  const [addFormData, setAddFormData] = useState({
    hours: "",
    description: ""
  })
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
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
  const onFormSubmit = event => {
    event.preventDefault()
    fetch(`${baseURL}/storeEmployeeOvertime`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employee_id: employeeID,
        hours: addFormData.hours,
        description:  addFormData.description
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status === "OK") {

          toast.success(data.message)
          handleModal()
        } else {
          toast('Something Went wrong!')
        }

      }).catch(err => {
        toast.error(err)
      })
  }
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
        <h5 className="modal-title">Add Daily Overtime</h5>
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
            <div className="form-column">

              <div className="form-group col-md-12">
                <label>Hours</label>
                <input
                  type="text"
                  name="hours"
                  id="hours"
                  className="form-control"
                  placeholder="hours"
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="form-group col-md-12">
                <label>Description</label>
                <input
                  name="description"
                  id="description"
                  type="text"
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

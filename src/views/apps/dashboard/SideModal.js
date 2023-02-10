// ** React Imports
import { useState, Fragment, useEffect } from 'react'
// ** Third Party Components

import { useHistory } from "react-router"
import Avatar from '@components/avatar'
import { Loader, Info, User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import { toast } from 'react-toastify'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal, notInStockData }) => {

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const TableData = notInStockData?.map((data, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
      </tr>
    )

  })
 
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
        <h5 className="modal-title">Not in Stock Items</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
      <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sr. No</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                {TableData}

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
          </div>


      </ModalBody>
    </Modal>
  )
}

export default AddNewModal

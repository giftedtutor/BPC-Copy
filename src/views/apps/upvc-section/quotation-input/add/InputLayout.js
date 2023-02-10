// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react'
import upvcContext from '../../context/upvcContext'
import axios from 'axios'

import Flatpickr from 'react-flatpickr'
import {
    Card,
    CardBody,
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import AddNewModal from "../../design-section/designs/WindowDesignAndInput"

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import ViewProject from '../../design-section/designs/ViewAndEditInput'
import baseURL from '../../../../../base-url/baseURL'


const AddCard = () => {

    const ucs = useContext(upvcContext)
    let todayDate = new Date()
    const dd = String(todayDate.getDate()).padStart(2, '0')
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = todayDate.getFullYear()

    todayDate = `${dd}-${mm}-${yyyy}`

    const [picker, setPicker] = useState(todayDate)
    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)
    const [NextQID, setNextQID] = useState('')
    const location = useLocation()
    const QoID = ((location.state === null || location.state === undefined) ? '' : location.state.params)

    useEffect(() => {

        axios.get(`${baseURL}/getQuotationsMasterId`)
            .then(response => {
                if ((location.state === null || location.state === undefined)) {
                    setNextQID(`QT-0${response.data.QuotationId}`)
                } else {
                    setNextQID(`QT-0${Number(QoID)}`)
                }

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Fragment>
            <Card className="invoice-preview-card mb-0">
                <CardBody className="invoice-padding pb-0">
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                        <div>
                            <div className="logo-wrapper">
                                <h1 style={{
                                    fontWeight: 'bold'
                                }} className="text-primary fw-bold">BPC Company</h1>
                            </div>
                        </div>

                        <div className="invoice-number-date mt-md-0 mt-2">
                            <div className="d-flex align-items-center justify-content-md-end mb-1">
                                <h4 className="invoice-title">Quotation No.</h4>
                                <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>

                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        className='text-center'
                                        style={{
                                            marginLeft: -20
                                        }}
                                        type="text"
                                        value={NextQID}
                                        disabled
                                    />
                                </InputGroup>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <h4 className="invoice-title">&nbsp;   &nbsp; Date:   &nbsp;  &nbsp; &nbsp;    &nbsp; &nbsp;  &nbsp;</h4>
                                <input style={{
                                    marginLeft: 20
                                }}
                                    value={picker}
                                    onChange={(e) => setPicker(e.target.value)}
                                    className="form-control invoice-edit-input date-picker text-center"
                                />
                            </div>
                        </div>
                    </div>
                    <Row className="invoice-add">
                        <Col xl={10} md={10} sm={12}>
                            <Button
                                color="danger" onClick={() => {
                                    localStorage.removeItem('InputAllDataBPC')
                                    const QoIDID = null
                                    localStorage.setItem("EditQuotationID", QoIDID)
                                    window.location.reload(true)
                                }}
                            >
                                Clear Data

                            </Button>
                        </Col>
                        <Col xl={2} md={2} sm={12}>
                            <Button
                                color="primary"
                                onClick={handleModal}
                            >
                                Add Item Details

                            </Button>
                        </Col>

                    </Row>
                </CardBody>

                <hr className="invoice-spacing" />

                <CardBody className="invoice-padding pt-0">


                    <ViewProject />
                </CardBody>


                <hr className="invoice-spacing mt-0" />
            </Card>
            <AddNewModal open={modal} handleModal={handleModal} />

        </Fragment>
    )
}


export default AddCard
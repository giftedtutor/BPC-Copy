
import AddCard from './InputLayout'
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import TopProgressBar from '../coasting-and-quotation-section/TopProgressBar'
const InvoiceAdd = () => {

  return (
    <div className="invoice-add-wrapper">
      <Row className="invoice-add">
        <Col xl={12} md={8} sm={12}>
          <AddCard />
        </Col>
      </Row>
      <TopProgressBar />
    </div>
  )
}

export default InvoiceAdd
import React, { useState, useEffect } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import generatePDF from './tablePDF'
import { faPlus, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { process } from '@progress/kendo-data-query'
import moment from 'moment'

const ClientLedger = () => {

  const [suppliersF, setSuppliersF] = useState([])
  const [ClientOB, setClientOB] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
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
  const [ExcelData, setExcelData] = useState([])

  const [PreviousBalance, setPreviousBalance] = useState()

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const aggregates = [
    {
      field: 'totalBill',
      aggregate: 'sum'
    }
  ]
  const group = [
    {
      field: 'Discontinued',
      aggregates
    }
  ]
  const data = process(ExcelData, {
    group
  }).data

  const CustomGroupFooter = props => {
    return `Sum: ${props.aggregates.totalBill.sum.toFixed(2)}`
  }
  // for excel
  const _exporter = React.createRef()

  const excelExport = () => {
    if (_exporter.current) {
      _exporter.current.save()
    }
  }
  const generateExcel = (data) => {
    setExcelData(data)
    excelExport()
  }
  const history = useHistory()
  const getLedger = () => {
    setIsButtonDisabled(true)
    if (SupplierIDFromAPI === '') {
      toast('Select Client!')
    } else if (SupplierIDFromAPI !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/getClientLedger?clientID=${SupplierIDFromAPI}&&fromDate=${DateFrom}&&toDate=${currentDate}&&sort=asc&&colName=id&&pageNo=1&&records=200`)
        .then(response => {
           if (response.data.clientLedger.data[0] === undefined && response.data.ClientOpeningBal.length === 0) {
            toast('Client has no Data against provided Dates!')
            setSuppliersF([])
            setClientOB([])
            setLoading2(false)
          } else {
            setClientOB(response.data.ClientOpeningBal)
            setSuppliersF(response.data.clientLedger.data)
            setLoading2(false) //stop loading when data is fetched
            setTotal(response.data.clientLedger.total)
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

    Axios.get(`${baseURL}/getClientsDropdown`)
      .then(response => {
        setSupplierName(response.data.clients)
        setLoading(false) //stop loading when data is fetched

      })
      .catch(err => console.log(err))

  }, [ExcelData])

  useEffect(() => {
    getLedger()
}, [SupplierIDFromAPI, DateFrom, currentDate])

  const mappSuppliers = suppliersF.map((data, index) => {
    return (
      <tr key={data.index}>
        <td style={{textAlign: 'center', width: 10}}>{index + 1}</td>
        <td>{data.ledg_no}</td>
        <td>{moment(data.paymentDate).format('DD/MM/YYYY')}</td>
        <td>{data.description}</td>
        <td style={{textAlign: 'center'}}>{data.paymentType}</td>
        <td style={{textAlign: 'right'}}>{data.previousBalance.toLocaleString("en-US")}</td>
        <td style={{textAlign: 'right'}}>{data.totalBill.toLocaleString("en-US")}</td>
        <td style={{textAlign: 'right'}}>{data.paid.toLocaleString("en-US")}</td>
        <td style={{textAlign: 'right'}}>{data.remaining.toLocaleString("en-US")}</td>

      </tr>
    )

  })
  const addPayToSuppplier = (idd) => {

    history.push('/BPC/apps/client-ledger/payment', { params: idd })
  }
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label >Client</label>
            <select class="custom-select" onChange={(e) => setSupplierIDFromAPI(e.target.value)}
              onFocus={(e) => e.target.any} required>
              <option>Select Client</option>
              {SupplierName.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label >Date From</label>
            <input type="date" className="form-control" placeholder="" value={DateFrom}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="form-group col-md-3">
            <label>Date To</label>
            <input type="date" className="form-control" placeholder="" value={currentDate}
              onFocus={(e) => e.target.select()} required
              onChange={(e) => setCurrentDate(e.target.value)} />
          </div>
          <div className="form-group col-md-3" style={{
            marginTop: 21
          }}>
            <Button.Ripple
              className="btn btn-danger"
              onClick={() => generatePDF(suppliersF, DateFrom, currentDate)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" />  PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp;

            <Button.Ripple
              className="btn btn-success"
              onClick={() => {
                generateExcel(suppliersF)

              }}
            >
              <FontAwesomeIcon icon={faFileExcel} color="white" />  Excel
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

      {isLoading2 ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr  style={{
                  textAlign: 'center'
                }}>
                <th style={{
                  width:10
                }}>Sr. No</th>
                <th scope="col">RV No.</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Previous Balance (PKR)</th>
                <th scope="col">Total Bill (PKR)</th>
                <th scope="col">Received (PKR)</th>
                <th scope="col">Balance (PKR)</th>


              </tr>
            </thead>
            <tbody>
              {mappSuppliers}
              
            </tbody>
           
          </table>
          {SupplierIDFromAPI === '' ? <Button color='primary' disabled>Receive Payment from Client</Button> : <Button onClick={() => addPayToSuppplier(SupplierIDFromAPI)} color='primary'>Receive Payment from Client</Button>}

        </div>)}
      <div>
        <ExcelExport data={data} group={group} collapsible={true} fileName="SupplierLedger.xlsx" ref={_exporter}>
          <ExcelExportColumn field='id' title="Sr. No" width={50} />
          <ExcelExportColumn field="ledg_no" title="PV No" />
          <ExcelExportColumn field="paymentDate" title="Payment Date" cellOptions={{
          format: "{0:dd/MMMM/yyyy H:mm}"
          }} />
          <ExcelExportColumn field='description' title="Description" />
          <ExcelExportColumn field="paymentType" title="Payment Type" />
          <ExcelExportColumn field="name" title="Name" />

          <ExcelExportColumn field="previousBalance" title="Previous Balance" />
          <ExcelExportColumn field="totalBill" title="Total Bill" groupFooter={CustomGroupFooter} cellOptions={{
            format: '#,##0.00'
          }} groupFooterCellOptions={{
            textAlign: 'right'
          }} footerCellOptions={{
            wrap: true,
            textAlign: 'center'
          }} />
          <ExcelExportColumn field='paid' title="Paid" />
          <ExcelExportColumn field="remaining" title="Balance" />
        </ExcelExport>
      </div>
    </div>
  )
}

export default ClientLedger
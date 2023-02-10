import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import generatePDF from './tablePDF'
import { faPlus, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { process } from '@progress/kendo-data-query'
import ExcelGenerator from './ExcelMutiTables'
import moment from 'moment'

const getSupplierLedger = () => {

  const [suppliersF, setSuppliersF] = useState([])
  const [SuppliersOB, setSuppliersOB] = useState([])
  const [SupplierName, setSupplierName] = useState([])
  const [SupplierIDFromAPI, setSupplierIDFromAPI] = useState('')
  const [DateFrom, setDateFrom] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [sortType, setSortType] = useState('desc')
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState()
  const [record, setRecord] = useState(10)
  const [isLoading, setLoading] = useState(true)
  const [isLoading2, setLoading2] = useState(false)
  const [column, setColumn] = useState('id')
  const [ExcelData, setExcelData] = useState([])

  const [PreviousBalance, setPreviousBalance] = useState()

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const todayMonth = `${yyyy}-${mm}`
  const [currentMonth, setCurrentMonth] = useState(todayMonth)


  // for excel
  const aggregates = [
    {
      field: 'totalBill',
      aggregate: 'sum'
    }
  ]
  const group = [
    {
      field: '',
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
      toast('Select Supplier!')
    } else if (SupplierIDFromAPI !== '') {
      setLoading2(true)
      Axios.get(`${baseURL}/getSupplierLedger?supplierID=${SupplierIDFromAPI}&&fromDate=${DateFrom}&&toDate=${currentDate}&&sort=asc&&colName=supplier_id&&pageNo=1&&records=200`)
        .then(response => {
          if (response.data.supplierLedger.data[0] === undefined && response.data.supplierOpeningBal.length === 0) {
            toast('Supplier has no Data against provided Dates!')
            setSuppliersF([])
            setSuppliersOB([])
            setLoading2(false)
          } else {
            setSuppliersF(response.data.supplierLedger.data)
            setSuppliersOB(response.data.supplierOpeningBal)
            setLoading2(false)
            setTotal(response.data.supplierLedger.total)
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

    Axios.get(`${baseURL}/getSuppliers?pageNo=1&&records=200&&sort=asc&&colName=id`)
      .then(response => {
        setSupplierName(response.data.suppliers.data)
        setLoading(false)

      })
      .catch(err => console.log(err))
  }, [ExcelData])

  const mappSuppliers = suppliersF.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.ledg_no === null ? (data.poID === null ? '' : `PO-${data.poID}`) : data.ledg_no}</td>
        <td>{moment(data.paymentDate).format('DD/MM/YYYY')}</td>
        <td>{data.description}</td>
        <td style={{ textAlign: 'center' }}>{data.paymentType === "Bank" ? (<a href={`${data.image}`}> {data.paymentType} | View Receipt</a>) : data.paymentType} </td>
        <td style={{
          textAlign: 'right'
        }}>{data.previousBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{
          textAlign: 'right'
        }}>{data.totalBill.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{
          textAlign: 'right'
        }}>{data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
        <td style={{
          textAlign: 'right'
        }}>{data.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

      </tr>
    )

  })

  useEffect(() => {
    getLedger()
  }, [SupplierIDFromAPI, currentDate, DateFrom])

  const handleEdit = (supplier_id) => {
    history.push('/BPC/apps/supplier-ledger/payment', { params: supplier_id })
  }
  return (
    <div>
      <form>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label >Supplier</label>
            <select class="custom-select" onChange={(e) => setSupplierIDFromAPI(e.target.value)}
              onFocus={(e) => e.target.any} required>
              <option>Select Supplier</option>
              {SupplierName.map((cat, index) => (
                <option key={index} value={cat.supplier_id}>{cat.name}</option>
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
                <th style={{
                  textAlign: 'center'
                }} scope="col">Sr. No</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">PV No.</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Date</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Description</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Payment Type</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Previous Balance (PKR)</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Total Bill (PKR)</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Paid (PKR)</th>
                <th style={{
                  textAlign: 'center'
                }} scope="col">Remaining (PKR)</th>


              </tr>
            </thead>
            <tbody>
              {mappSuppliers}
              <div style={{ height: 10 }}></div>


            </tbody>
          </table>
          {SupplierIDFromAPI === '' ? <Button color='primary' disabled>Add Payment To Supplier</Button> : <Button color='primary' onClick={() => handleEdit(SupplierIDFromAPI)}>Add Payment To Supplier</Button>}

        </div>)}
      <div>
        <ExcelExport data={data} group={group} collapsible={true} fileName="SupplierLedger.xlsx" ref={_exporter}>
          <ExcelExportColumn field='id' title="Sr. No" width={50} />
          <ExcelExportColumn field="ledg_no" title="PV No" />
          <ExcelExportColumn field="paymentDate" title="Payment Date" />
          <ExcelExportColumn field='description' title="Description" />
          <ExcelExportColumn field="paymentType" title="Payment Type" />
          {/* <ExcelExportColumn field="name" title="Name" /> */}

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

export default getSupplierLedger
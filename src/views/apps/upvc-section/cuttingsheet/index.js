import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import jsPDF from 'jspdf'
import ReactDOMServer from "react-dom/server"
import generatePDF from './tablePDF'
import Pagination from "react-js-pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'

import Axios from 'axios'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { AlignRight, ChevronDown, Filter } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody,  Form, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'
import { useHistory } from "react-router"
import moment from 'moment'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import baseURL from '../../../../base-url/baseURL'
import { diffDayAndTime } from '@fullcalendar/react'

  const FilterData = () => {
    const [suppliersF, setSuppliersF] = useState([])
    const [filter, setFilter] = useState('')
    const [sortType, setSortType] = useState('desc')
    const [pageNo, setPageNo] = useState(1)
    const [total, setTotal] = useState()
    const [record, setRecord] = useState(10)
    const [isLoading, setLoading] = useState(true)
    const [column, setColumn] = useState('id')
    const [TotalQtyyyy, setTotalQty] = useState(0)
    const [TotalfSepec, setTotalfSepec] = useState(0)
    const [TotalCostOfProfile, setTotalCostOfProfile] = useState(0)
    const [rows, setRows] = useState([])
    const [ParentData, setParentData] = useState([])
    const history = useHistory()
    const location = useLocation()

    const [TW, setTW] = useState(0)
    const [TH, setTH] = useState(0)
    const [Sash_W, setSash_W] = useState(0)
    const [Sash_W2, setSash_W2] = useState(0)
    const [Sash_H, setSash_H] = useState(0)
    const [Screen_W, setScreen_W] = useState(0)
    const [Screen_W2, setScreen_W2] = useState(0)
    const [Screen_H, setScreen_H] = useState(0)
    const [Frame_W, setFrame_W] = useState(0)
    const [Frame_H, setFrame_H] = useState(0)

    let TotalQty = 0
    let TotalWidth = 0
    let TotalHeight = 0
    let SashW = 0
    let SashH = 0
    let ScreenW = 0
    let ScreenH = 0
    let FrameW = 0
    let FrameH = 0
    let SashW2 = 0
    let ScreenW2 = 0
    
    const id = location.state.params.Q1_id
    const handlePageChange = (pageNumber) => {
      setPageNo(pageNumber)
    }

    const Quotation2Details = (QoID) => {
        Axios.get(`${baseURL}/getQuotation2?masterID=${QoID}`)
      .then(response => {
        const Qchild = response.data.childData 
        const Qparent = response.data.masterData

    
        setParentData(Qparent)
        const childQ = response.data.childData.map(({
          id, 
          Quotation_Sale_Rep,
          client_ID,
          Quotation_date,
          qty,
          Width,
          Height,
          Installation,
          InwardOutward,
          windowType,
          ProfileTypee,
          DoorBase,
          PanelLeaf,
          SlidingPanel,
          OpenableLeafCut,
          TopHungCut,
          Beading,
          MultiLockingSystem,
          ProfileTypeID
          }) => ({
            salesRep : Quotation_Sale_Rep,
            qutationDate : Quotation_date,
            clientId: client_ID,
            qty: Number(qty),
            width: Width,
            height: Height,
            totalMm: ((Width) * (Height)).toFixed(0),
            totalSft: ((Width) * (Height) / (92903 * Number(qty))).toFixed(0),
            installation: Installation,
            windowType,
            profileTypee: ProfileTypee,  
            doorBase: DoorBase,
            inwardOutward: InwardOutward,
            panelLeaf: PanelLeaf,
            slidingPanel: SlidingPanel,
            openableLeafCut: OpenableLeafCut,
            topHungCut: TopHungCut,
            beading: Beading,
            multiLockingSystem: MultiLockingSystem,
            profileType: ProfileTypeID
          })) 
          setRows(childQ)
          let TP = 0
          const totalOfProfile = response.data.childData.map((data, index) => {
           TP = (TP + ((((data.Width) + 5) + ((data.Height) + 5)) * 2 * Number(data.qty)))
           setTotalCostOfProfile(TP)
          })
          let Spec = 0
          const specG14 = response.data.childData.map((data, index) => {
           Spec = (Spec + (((data.Height) + 5) * Number(data.qty)))
           setTotalfSepec(Spec)
          })
          let Quantity = 0
          const Q = response.data.childData.map((data, index) => {
           Quantity = (Quantity +  Number(data.qty))
           setTotalQty(Quantity)
          })

          childQ.forEach((data, index) => {
           
            TotalQty = TotalQty + Number(data.qty)
            TotalWidth = TotalWidth + data.width
            setTW(TotalWidth)
            TotalHeight = TotalHeight + data.height
            setTH(TotalHeight)
            SashW = Number(SashW) + (data.windowType === '4PSL' || data.windowType === '3PSL' ? Number(((((data.width) / 2) / 2) - 4)) : Number((((data.width) / 2) - 4)))
            setSash_W(SashW)
            SashH = Number(SashH) + ((data.height) - 80)
            setSash_H(SashH)
            ScreenW = ScreenW + (data.windowType === '4PSL' || data.windowType === '3PSL' ? ((((((data.width) / 2) / 2) - 4) - 25)) : (((((data.width) / 2) - 4) - 25)))
            setScreen_W(ScreenW)
            ScreenH = ScreenH + ((data.height) - 80)
            setScreen_H(ScreenH)
            FrameW = FrameW + ((data.width) + 6)
            setFrame_W(FrameW)
            FrameH = FrameH + ((data.height) + 6)
            setFrame_H(FrameH)

            SashW2 = Number(SashW2) + (data.windowType === '3PSL' ? Number(((data.width) / 2) - 4) : 0)
            setSash_W2(SashW2)
            ScreenW2 = Number(ScreenW2) + (data.windowType === '3PSL' ? (((((data.width) / 2) - 4) - 25)) : 0)
            setScreen_W2(ScreenW2)
      
          })
      })
      .catch(err => console.log(err))
        
      }
  
    useEffect(() => {

        Quotation2Details(id)
    Axios.get(`${baseURL}/editProjects?id=${id}&&pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
    .then(response => {
      setSuppliersF(response.data.members.data)
      setLoading(false) 
      
      setTotal(response.data.members.total)
    })
    .catch(err => console.log(err))
  }, [pageNo, record, column, sortType])
     const filterData = rows.filter(item => {
      return filter !== "" ? item.mobile.toString().includes(filter.toString())  || item.department.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString()) || item.name.toLowerCase().includes(filter.toLowerCase()) || item.date.toLowerCase().includes(filter.toLowerCase()) : item 
     
     })
     const CuttingSHeet = rows.map((data, index) => {
       return (
      <tr key={data.index}>
        {/* <th scope="row">1</th> */}
        <td>{index + 1}</td>
        {/* <td>{data.parentID}</td> */}
        <td style={{textAlign: 'right'}}>{Number(data.qty)}</td>
        <td style={{textAlign: 'right'}}>{data.width.toFixed(0)}</td>
        <td style={{textAlign: 'right'}}>{data.height.toFixed(0)}</td>
        {/* <td>{(((data.width + 5) + (data.height + 5)) * 2 * Number(data.qty))}</td> */}
        {/* <td>{(data.height + 5) * Number(data.qty)}</td> */}
        <td>{data.windowType}</td>
        {/* <td>{index + 1}</td> */}
        <td style={{textAlign: 'right'}}>{data.width + 6}</td>
        <td style={{textAlign: 'right'}}>{data.height + 6}</td>
        <td style={{textAlign: 'right'}}>{data.windowType === '4PSL' || data.windowType === '3PSL' ? (((((data.width) / 2) / 2) - 4).toFixed(0)) : ((((data.width) / 2) - 4).toFixed(2))}</td>
        {data.windowType === '3PSL' ? <td>{((((data.width) / 2) - 4).toFixed(0))}</td> : ''}
        {/* <td>{(((data.width + 5) / 2) + 35)}</td> */}
        <td style={{textAlign: 'right'}}>{((data.height) - 80).toFixed(0)}</td>
        <td style={{textAlign: 'right'}}>{data.windowType === '4PSL' || data.windowType === '3PSL' ? ((((((data.width) / 2) / 2) - 4) - 25)) : (((((data.width) / 2) - 4) - 25))}</td>
        {data.windowType === '3PSL' ? <td>{(((((data.width) / 2) - 4) - 25))}</td> : ''}
        <td style={{textAlign: 'right'}}>{((data.height) - 80).toFixed(0)}</td>
     
        {/* <td><Button onClick={() => handleEdit(data.id)}>Edit</Button></td> */}
      </tr>
       )

   })
 
   return (
     <div>
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
    
      <div style={{height:5, width: 100}}>
  {/* Just for Space */}
      </div>

      <Row>
   
        <Col
          xl='12'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
        
            <Button.Ripple
              className="btn btn-primary"
              color="danger"
              onClick={() => generatePDF(ParentData, rows)}
            >
            <FontAwesomeIcon icon={faFilePdf} color="white" /> PDF
            </Button.Ripple> &nbsp;  &nbsp;  &nbsp; 
        </Col>
      </Row>
      <div style={{height:10, width: 100}}>
  {/* Just for Space */}
      </div>
      
      {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
      <div className="table-responsive">
    <table className="table table-striped">
   <thead>
   <tr>
       <th scope="col" colspan="2" style={{textAlign:'center'}}>Date: {moment(ParentData[0]?.Quotation_date).format('DD/MM/YYYY')}</th>
  
       <th scope="col" colspan="2" style={{textAlign:'center'}}>Client: {ParentData[0]?.name}</th>
  
       {/* <th  colspan="1" rowSpan={2} style={{textAlign:'center', paddingTop:20}}>Specification</th> */}
       <th  colspan="1" rowSpan={2} style={{textAlign:'center', paddingTop:20}}>Window Type</th>
       {/* <th  colspan="1" rowSpan={2} style={{textAlign:'center', paddingTop:20}}>Window No</th> */}
       <th scope="col"  colspan="2" style={{textAlign:'center'}}>Frame</th>
       <th scope="col"  colspan={rows[0]?.windowType === '3PSL' ? 3 : 2} style={{textAlign:'center'}}>Sash</th>
       <th scope="col"  colspan={rows[0]?.windowType === '3PSL' ? 3 : 2} style={{textAlign:'center'}}>Screen</th>
       {/* <th scope="col"  colspan="3" style={{textAlign:'center'}}>Material</th> */}

     </tr>
     <tr>
       <th scope="col">Window No.</th>
       {/* <th scope="col">Parent ID</th> */}
       <th scope="col">Qty</th>
       <th scope="col">Width</th>
       <th scope="col">Height</th>
       {/* <th scope="col">Profile</th> */}
 
       <th scope="col">W</th>
       <th scope="col">H</th>
       {/* <th scope="col">W</th>  */}
       {/* <th scope="col">W2</th> */}
       {rows[0]?.windowType === '3PSL' ? <th scope="col">W 1</th> : <th scope="col">W</th>}
       {rows[0]?.windowType === '3PSL' ? <th scope="col">W 2</th> : ''}
       <th scope="col">H</th>
       {rows[0]?.windowType === '3PSL' ? <th scope="col">W 1</th> : <th scope="col">W</th>}
       {rows[0]?.windowType === '3PSL' ? <th scope="col">W 2</th> : ''}
       <th scope="col">H</th>
       {/* <th colspan="2"  style={{textAlign:'center'}}>FRAME 98</th> */}
       {/* <th scope="col" >Factory</th> */}
       
     </tr>
   </thead>
   <tbody>
    {CuttingSHeet}
   </tbody>
   <thead>
    <tr>
       <th scope="col">Totals:</th>
       <th scope="col">{TotalQtyyyy.toFixed(0)}</th>
       <th scope="col">{TW.toFixed(0)}</th>
       <th scope="col">{TH.toFixed(0)}</th>
       <th scope="col"></th>
       <th scope="col">{Frame_W.toFixed(0)}</th>
       <th scope="col">{Frame_H.toFixed(0)}</th>
       <th scope="col">{Sash_W}</th>
      {rows[0]?.windowType === '3PSL' ?  (<th scope="col">{Sash_W2}</th>) : ''}
    
       <th scope="col">{Sash_H.toFixed(0)}</th>
       <th scope="col">{Screen_W.toFixed(0)}</th>
       {rows[0]?.windowType === '3PSL' ?  (<th scope="col">{Screen_W2}</th>) : ''}
       <th scope="col">{Screen_H.toFixed(0)}</th>
    
       
     </tr>
    </thead>
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
     </div>)}
   

   {/* Table 2 */}

   {/* <div className="table-responsive">
    <table className="table table-striped">
   <thead>
   <tr>
 
       <th scope="col"  colspan="3" style={{textAlign:'center'}}>Material</th>

     </tr>
     <tr>
     
       <th colspan="2"  style={{textAlign:'center'}}>FRAME 98</th>
       <th scope="col" >Factory</th>
       
     </tr>
   </thead>
   <tbody>
   
     <tr>
        <td>{TotalCostOfProfile}</td>
        <td>{TotalCostOfProfile / 5800}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>SASH</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalCostOfProfile * 1.7}</td>
        <td>{((TotalCostOfProfile / 5800) * 1.7)}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>SCREEN</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{((TotalCostOfProfile * 1.7) / 2)}</td>
        <td>{((TotalCostOfProfile * 1.7) / 2) / 5800}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>TRACK</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{((TotalCostOfProfile - 90) / 4900)}</td>
        <td>{((TotalCostOfProfile - 90) / 4900) / 4900}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>SASH STEEL</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{(TotalCostOfProfile * 1.7) * 3}</td>
        <td>{((TotalCostOfProfile / 5800) * 1.7) * 3}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}> SCREN SASH STEEL</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{(TotalCostOfProfile * 1.7) * 3}</td>
        <td>{((TotalCostOfProfile / 5800) * 1.7) * 3}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>SCREEN SASH</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{((TotalCostOfProfile * 1.7) / 2) / 2}</td>
        <td>{(((TotalCostOfProfile * 1.7) / 2) / 5800) / 2}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}> INTER LOCK</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalfSepec * 4}</td>
        <td>{(TotalfSepec * 4) / 5800}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}> SLIDING WHEEL/DUMY</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalQty * 2}</td>
        <td>{TotalQty * 2}</td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}> JALI WHEEL</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalQty * 2}</td>
        <td></td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>  GEAR LOCK COMPLET</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalQty * 2}</td>
        <td></td>
        <td></td>
     </tr>
     <tr>
        <td colspan="2"  style={{textAlign:'center'}}>  Beading</td>
        
        <td></td>
     </tr>
     <tr>
        <td>{TotalCostOfProfile * 1.7}</td>
        <td>{(TotalCostOfProfile * 1.7) / 5800}</td>
        <td></td>
     </tr>


   </tbody>
   </table>
  
     </div> */}

   
     {/* End of Table */}
     </div>
   </div>
  
   )
   }

const CuttingSheetList = () => {
  return (
    <div>
       <FilterData /> 
    </div>
   )
   }
   
   export default CuttingSheetList
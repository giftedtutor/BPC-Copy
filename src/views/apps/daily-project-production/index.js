import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../base-url/baseURL'

const addInventory = () => {
    
  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')


  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    today = `${yyyy}-${mm}-${dd}`
    const [date, setDate] = useState(today)

    const [Category, setCategory] = useState([])
 
    const [quantity, setQuantity] = useState([])

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
 

    // table 2
    const [Product, setProduct] = useState([])
    const [ProductType, setProductType] = useState([])
  
     const [Stocks, setStocks] = useState([])
    
    const [RateArray, setRateArray] = useState([])

    const [CategoryID, setCategoryID] = useState('')


    const [getCategoryNested, setGetCategoryNested] = useState([])
    const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
    const [getItemsNested, setGetItemsNested] = useState([])
  
    const [getProductTypeNested, setGetProductTypeNested] = useState([])
    const [getProductSizeNested, setGetProductSizeNested] = useState([])

    const [isLoading, setLoading] = useState(true)
    const history = useHistory()
    const [rows, setRows] = useState([])
    const [Plus2, setPlus2] = useState(0)

    const [rows2, setRows2] = useState([])
    const [TOTAL_WINDOWS, setTOTAL_WINDOWS] = useState(0)
    const [TOTAL_WINDOWS_COMPLETED, setTOTAL_WINDOWS_COMPLETED] = useState(0)
    
      const rest = (idx) => {
        getSubCategoryNested[idx] = ''
        getItemsNested[idx] = ''
        quantity[idx] = ''
        Stocks[idx] = ''
      
        setRows(rows)
  
      }

      const reset2 = (idx) => {
        getProductTypeNested[idx] = ''
        getProductSizeNested[idx] = ''
        quantity[idx] = ''
        Stocks[idx] = ''
        setRows2(rows2)
  
      }

      const getForDailyPogressReport = (val) => {
        Axios.get(`${baseURL}/getDailyProjects?projectID=${val}`)
        .then(response => {
          let filterArray = []
        if (response.data.dailyProjectProg.length === 0) {
          filterArray =  response.data.childData.map(({id, qty, windowType, location
           }) => (
            {
                id,
                windowType,
                totalWindows: qty,
                location,
                completedWindows: 0,
                cuttingFrameProfleAndSteel: 0,
                screwing: 0,
                welding: 0,
                cleaning: 0,
                hardwareAssembles: 0,
                beading: 0,
                fitting: 0,
                QCStatus: 'PENDING'
            }
            ))

        } else {
          filterArray =  response.data.dailyProjectProg.map(({id, totalWindows, windowType, location,
            completedWindows,
            cuttingFrameProfleAndSteel,
            screwing,
            welding,
            cleaning,
            hardwareAssembles,
            beading,
            fitting,
            QCStatus
           }) => (
            {
                id,
                windowType,
                totalWindows,
                location,
                completedWindows,
                cuttingFrameProfleAndSteel,
                screwing,
                welding,
                cleaning,
                hardwareAssembles,
                beading,
                fitting,
                QCStatus
            }
            ))
        }
         let T_Windows = 0
         filterArray.forEach(element => {
          T_Windows += Number(element.totalWindows)
         })
         setTOTAL_WINDOWS(T_Windows)

         
         let T_WindowsComplete = 0
         filterArray.forEach(element => {
          T_WindowsComplete += Number(element.completedWindows)
         })
         setTOTAL_WINDOWS_COMPLETED(T_WindowsComplete)
          setRows(filterArray)
        
        })
        .catch(err => console.log(err)) 
      }
  
    const postData = () => {
      setIsButtonDisabled(true)

      if (ProjectAPIID === '') {
        toast('Please Select a Project!')
      }  else if (ProjectAPIID  !== '') {   
        fetch(`${baseURL}/dailyProjectProduction`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              projectID:ProjectAPIID,
              date, 
              projectProgressArray:rows
            })
        }).then(res => res.json())
        .then(data => {
         
            if (data.result === "Daily Project Production Added Successfully") {
              
                toast('Daily Project Production Added Successfully!')
                history.push('/BPC/apps/daily-project-production-report/list')
              
            } else {
                toast('Items Rates did not Update, Please try again ')
        }
         
        }).catch(err => {
            console.log(err)
        })
    } else {
        toast('Fill out fields correctly!')
    }
    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 3000)

    }

    const handleChange = idx => e => {
      const { name, value } = e.target
      RateArray[idx] = value
        const rowss = [...rows]
        rowss[idx] = {
          id: rows[idx].id,
              windowType: rows[idx].windowType,
              totalWindows: rows[idx].totalWindows,
              location: rows[idx].location,
              completedWindows: rows[idx].completedWindows,
              cuttingFrameProfleAndSteel: value,
              screwing: rows[idx].screwing,
              welding: rows[idx].welding,
              cleaning: rows[idx].cleaning,
              hardwareAssembles: rows[idx].hardwareAssembles,
              beading: rows[idx].beading,
              fitting:rows[idx].fitting,
              QCStatus:rows[idx].QCStatus
        }
        setRows(rowss)
     
      }

      const handleChange2 = idx => e => {
        const { name, value } = e.target
        RateArray[idx] = value
          const rowss = [...rows]
          rowss[idx] = {
            id: rows[idx].id,
                windowType: rows[idx].windowType,
                totalWindows: rows[idx].totalWindows,
                location: rows[idx].location,
                completedWindows: rows[idx].completedWindows,
                cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                screwing: value,
                welding: rows[idx].welding,
                cleaning: rows[idx].cleaning,
                hardwareAssembles: rows[idx].hardwareAssembles,
                beading: rows[idx].beading,
                fitting:rows[idx].fitting,
                QCStatus:rows[idx].QCStatus
          }
          setRows(rowss)
       
        }
        const handleChange3 = idx => e => {
          const { name, value } = e.target
          RateArray[idx] = value
            const rowss = [...rows]
            rowss[idx] = {
              id: rows[idx].id,
                  windowType: rows[idx].windowType,
                  totalWindows: rows[idx].totalWindows,
                  location: rows[idx].location,
                  completedWindows: rows[idx].completedWindows,
                  cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                  screwing: rows[idx].screwing,
                  welding: value,
                  cleaning: rows[idx].cleaning,
                  hardwareAssembles: rows[idx].hardwareAssembles,
                  beading: rows[idx].beading,
                  fitting:rows[idx].fitting,
                  QCStatus:rows[idx].QCStatus
            }
            setRows(rowss)
         
          }

          const handleChange4 = idx => e => {
            const { name, value } = e.target
            RateArray[idx] = value
              const rowss = [...rows]
              rowss[idx] = {
                id: rows[idx].id,
                    windowType: rows[idx].windowType,
                    totalWindows: rows[idx].totalWindows,
                    location: rows[idx].location,
                    completedWindows: rows[idx].completedWindows,
                    cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                    screwing: rows[idx].screwing,
                    welding: rows[idx].welding,
                    cleaning: value,
                    hardwareAssembles: rows[idx].hardwareAssembles,
                    beading: rows[idx].beading,
                    fitting:rows[idx].fitting,
                    QCStatus:rows[idx].QCStatus
              }
              setRows(rowss)
           
            }

            const handleChange5 = idx => e => {
              const { name, value } = e.target
              RateArray[idx] = value
                const rowss = [...rows]
                rowss[idx] = {
                  id: rows[idx].id,
                      windowType: rows[idx].windowType,
                      totalWindows: rows[idx].totalWindows,
                      location: rows[idx].location,
                      completedWindows: rows[idx].completedWindows,
                      cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                      screwing: rows[idx].screwing,
                      welding: rows[idx].welding,
                      cleaning: rows[idx].cleaning,
                      hardwareAssembles: value,
                      beading: rows[idx].beading,
                      fitting:rows[idx].fitting,
                      QCStatus:rows[idx].QCStatus
                }
                setRows(rowss)
             
              }

              const handleChange6 = idx => e => {
                const { name, value } = e.target
                RateArray[idx] = value
                  const rowss = [...rows]
                  rowss[idx] = {
                    id: rows[idx].id,
                        windowType: rows[idx].windowType,
                        totalWindows: rows[idx].totalWindows,
                        location: rows[idx].location,
                        completedWindows: rows[idx].completedWindows,
                        cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                        screwing: rows[idx].screwing,
                        welding: rows[idx].welding,
                        cleaning: rows[idx].cleaning,
                        hardwareAssembles: rows[idx].hardwareAssembles,
                        beading: value,
                        fitting:rows[idx].fitting,
                        QCStatus:rows[idx].QCStatus
                  }
                  setRows(rowss)
               
                }

                const handleChange7 = idx => e => {
                  const { name, value } = e.target
                  RateArray[idx] = value
                    const rowss = [...rows]
                    rowss[idx] = {
                      id: rows[idx].id,
                          windowType: rows[idx].windowType,
                          totalWindows: rows[idx].totalWindows,
                          location: rows[idx].location,
                          completedWindows: rows[idx].completedWindows,
                          cuttingFrameProfleAndSteel: rows[idx].cuttingFrameProfleAndSteel,
                          screwing: rows[idx].screwing,
                          welding: rows[idx].welding,
                          cleaning: rows[idx].cleaning,
                          hardwareAssembles: rows[idx].hardwareAssembles,
                          beading: rows[idx].beading,
                          fitting: value,
                          QCStatus:rows[idx].QCStatus
                    }
                    setRows(rowss)
                 
                  }

      useEffect(() => {
        toast('Please Select a Project!')
      Axios.get(`${baseURL}/getprojectsDropdown`)
      .then(response => {
       
        setProjectName(response.data.projects)
        setLoading(false) //stop loading when data is fetched
       
      })
      .catch(err => console.log(err))

    }, [Product, Plus2])
    

    return (
        <div>
             <form>
                  {/* Loader */}
     {  isLoading ? ( 
     <div class="text-center">
     <div class="spinner-border" role="status">
       <span class="sr-only">Loading...</span>
     </div>
   </div>)  : (
    <div className="form-row">
        <div className="form-group col-md-4"> 
            <label >Project</label>
            <select  class="custom-select" onChange={(e) => {
              setProjectAPIID(e.target.value)
              getForDailyPogressReport(e.target.value)
             
            }}
         onFocus={(e) => e.target.any} 
            required>
            <option>Select Project</option>
            {ProjectName.map((cat, index) => (
              <option key={index} value={cat.id}>{cat.name}</option>
               ))} 
               </select>
               <p style={{border: '1px solid gray', borderRadius:20, display: stylee, width: 150, padding: 10, margin: 10, backgroundColor:'grey', color:'white'}}>Select a Project!</p>
              
        </div>
        <div className="form-group col-md-4"> 
            <label >Date</label>
      <input  type="date" className="form-control"  
                          name="quantity"
                        
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                           placeholder="" />
            </div>
        </div>
   )}

<div style={{height:1, width: 700}}>
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
         <th scope="col">Sr. No</th>
         <th scope="col">Windows Type</th>
         <th scope="col">Location</th>
         <th scope="col">Total Windows</th>
         <th scope="col">Completed Windows</th>
       
          <th scope="col">Cutting Frame (Profile & Steel)</th>
          <th scope="col">Screwing</th>
          <th scope="col">Welding</th>
          <th scope="col">Cleaning</th>
          <th scope="col">Hardware Assembles</th>
          <th scope="col">Beading Cutting</th>
          <th scope="col">Fitting</th>
          <th scope="col">Status</th>
        
         
       </tr>
     </thead>
  
     <tbody> 
               {rows.map((data, idx) => (
                        <tr id={idx} key={idx}>
                        <td>
                       {idx + 1}
                        </td>
                        <td>
                          {data.windowType}
                        </td> 
                        <td>
                          {data.location}
                        </td> 
                        <td>
                         {data.totalWindows}
                        </td> 
                        <td>
                         {data.completedWindows}
                        </td> 
                       
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.cuttingFrameProfleAndSteel}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.screwing}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange2(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.welding}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange3(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.cleaning}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange4(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.hardwareAssembles}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange5(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.beading}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange6(idx)} />
                        </td> 
                        <td>
                          <input type="Number" className="form-control" placeholder="1" value={data.fitting}
                         style={{textTransform: 'capitalize', width:80}}  onFocus={(e) => e.target.select()}
                         onChange={handleChange7(idx)} />
                        </td> 

                        <td>{data.QCStatus === 'COMPLETE' ? 'COMPLETED' : data.QCStatus}</td>
                       
                       
                       </tr>
                ))}
               
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>{TOTAL_WINDOWS}</th>
                <th>{TOTAL_WINDOWS_COMPLETED}</th>
              </tr>
     </tbody>
   
     </table>
        </div>)}

        <div className="form-row">
        <div className="form-group col-md-10">
      
              </div>
              <div className="form-group col-md-2">

                <Button.Ripple color='primary'  disabled={isButtonDisabled} onClick={postData}>
                Store
                </Button.Ripple>
                </div>
              </div>

              {/*  */}

              <div style={{height:1, width: 700}}>
       
              </div>
        </form>
        </div>
    )
} 

export default addInventory
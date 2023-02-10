import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import baseURL from '../../../../base-url/baseURL'

const AllotMachineToProject = () => {

  const [ProjectName, setProjectName] = useState([])
  const [ProjectAPIID, setProjectAPIID] = useState('')

  const [stylee, setStyle] = useState('none')
  const [style2, setStyle2] = useState('none')

  const [date, setDate] = useState('')

  const [Category, setCategory] = useState([])

  const [quantity, setQuantity] = useState([])

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [Product, setProduct] = useState([])
  const [ProductType, setProductType] = useState([])
  const [Size, setSize] = useState([])
  const [quantity2, setQuantity2] = useState([])

  const [previousBalance, setPreviousBalance] = useState('')
  const [totalBill, setTotalBill] = useState(0)

  const [Stocks, setStocks] = useState([])
  const [stock, setStock] = useState(0)

  const [toProduce, setToProduce] = useState([])
  const [productTypeArray, setProductTypeArray] = useState([])

  const [getCategory, setGetCategory] = useState([])
  const [getSubCategory, setSubGetCategory] = useState([])
  const [getItem, setGetItem] = useState([])
  const [GetNonAlotMachines, setGetNonAlotMachines] = useState([])
  const [machineID, setmachineID] = useState()
  const [MachineArray, setMachineArray] = useState([])

  const [getCategoryNested, setGetCategoryNested] = useState([])
  const [getSubCategoryNested, setSubGetCategoryNested] = useState([])
  const [getItemsNested, setGetItemsNested] = useState([])
  const [FirstQArray, setFirstQArray] = useState([])

  const [getProductNested, setGetProductNested] = useState([])
  const [getProductTypeNested, setGetProductTypeNested] = useState([])
  const [getProductSizeNested, setGetProductSizeNested] = useState([])

  const [isLoading, setLoading] = useState(true)
  const history = useHistory()
  const [v, setV] = useState(0)

  const [rows, setRows] = useState([])
  const [Plus, setPlus] = useState(0)
  const [Plus2, setPlus2] = useState(0)

  const [rows2, setRows2] = useState([])

  const alotInventory = () => {
    setIsButtonDisabled(true)

    if (ProjectAPIID === '') {
      toast('Please Select a Project!')
    } else if (date === '') {
      toast('Please Choose Date!')
    } else if (ProjectAPIID !== '' && date !== '') {
      fetch(`${baseURL}/allotMachines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: ProjectAPIID,
          rows
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Machines Aloted Successfully") {

            toast('Machine Allotted Successfully!')
            history.push('/BPC/apps/alot-machine-to-project-listing/list')

          } else {
            toast('Machine did not Allot, Please try again ')
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
    MachineArray[idx] = value
    const rowss = [...rows]
    rowss[idx] = {
      machineID: value
    }
    setRows(rowss)

  }
  const handleAddRow = () => {
    const item = {
      machineID: ""

    }
    setRows([...rows, item])
  }

  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
  }

  useEffect(() => {

    Axios.get(`${baseURL}/getprojectsDropdown`)
      .then(response => {
        setProjectName(response.data.projects)
        setLoading(false)

      })
      .catch(err => console.log(err))


    Axios.get(`${baseURL}/getNonAlotedMachines`)
      .then(response => {
        setGetNonAlotMachines(response.data.machines)
        setLoading(false)

      })
      .catch(err => console.log(err))

    if (getCategory !== '') {
      setLoading(false)
    }
  }, [Product, Plus2])

  return (
    <div>

      {/*  */}

      <form>
        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="form-row">
            <div className="form-group col-md-4">
              <label >Projects</label>
              <select onMouseEnter={e => {
                setStyle('block')
              }}
                onMouseLeave={e => {
                  setStyle('none')
                }} class="custom-select" onChange={(e) => setProjectAPIID(e.target.value)}
                onFocus={(e) => e.target.any}
                required>
                <option>Select Project</option>
                {ProjectName.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>

            </div>
            <div className="form-group col-md-4">
              <label >Date</label>
              <input onMouseEnter={e => {
                setStyle2('block')
              }}
                onMouseLeave={e => {
                  setStyle2('none')
                }} type="date" className="form-control"
                name="Date"
                value={date}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>)}
        {/*  */}

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>

        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (
          <div className="table-responsive">
            <table className="table table-striped">

              <thead>
                <tr>
                  <th scope="col">Machines</th>
                  <th scope="col">Remove</th>

                </tr>
              </thead>

              <tbody>
                {rows.map((cat, idx) => (
                  <tr id={idx} key={idx}>
                    <td>

                      <select class="custom-select"
                        name="machine"
                        onChange={handleChange(idx)}
                        onFocus={(e) => e.target.any} required>

                        <option >Select Machine</option>
                        {GetNonAlotMachines.map((cat, index) => (
                          <option key={index} value={cat.id} >{cat.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <Button.Ripple onClick={() => {
                        handleRemoveSpecificRow(idx)
                      }} color='danger'>Remove</Button.Ripple>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="form-row">
          <div className="form-group col-md-10">
            <Button.Ripple color='primary' class="Right" onClick={() => {
              handleAddRow()
            }}>
              Add New Machine
            </Button.Ripple>
          </div>
          <div className="form-group col-md-2">

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={alotInventory}>
              Store
            </Button.Ripple>
          </div>
        </div>

        {/*  */}

        <div style={{ height: 1, width: 700 }}>
          {/* Just for Space */}
        </div>
      </form>
    </div>
  )
}

export default AllotMachineToProject
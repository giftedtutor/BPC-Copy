import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import Axios from 'axios'
import { useLocation } from "react-router-dom"
import baseURL from '../../../../base-url/baseURL'

const StoreProduction = () => {

  const [clientID, setClientID] = useState('')

  const [Product, setProduct] = useState([])
  const [getProductNested, setGetProductNested] = useState([])
  const [getProductTypeNested, setGetProductTypeNested] = useState([])
  const [getProductSizeNested, setGetProductSizeNested] = useState([])

  const [ClientName, setClientName] = useState([])

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [idnx, setIndex] = useState()
  const [inn, setIn] = useState(0)

  const [isLoading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [rows2, setRows2] = useState([])
  const [Plus, setPlus] = useState(0)
  const [Plus2, setPlus2] = useState(0)
  const [Num, setNum] = useState(0)

  const history = useHistory()
  const location = useLocation()
  const id = location.state.params
  const projectIDD = location.state.projectID
  const [DCToInvoice, setDCToInvoice] = useState([])
  const [DCParent, setDCParent] = useState([
    {
      contactNo: ''
    }
  ])
  const [DCChildren, setDCChildren] = useState([])
  const current = new Date()
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`

  const addData = () => {
    setIsButtonDisabled(true)

    if (clientID === '') {
      fetch(`${baseURL}/ProductionOrderStore`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectID: projectIDD,
          status: DCParent[0].status,
          rows

        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Production order created successfully") {

            history.push('/BPC/apps/allot-and-inventory-section/list')

          } else {
            toast('Production order did not create, Please try again ')

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

  useEffect(() => {
    fetch(`${baseURL}/getAlotInventory`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    }).then(res => res.json()).then(response => {
      setDCToInvoice(response.data)
      if (response.data === 'Project is not completed yet you cannot make invoice') {
        toast('Project is not completed yet you cannot make invoice')
      } else if (response.data === 'Invoice Generated Successfully') {
        toast('Invoice Generated Successfully')
      }
      setNum(Num + 1)
      setDCParent(response.getAlotparent)
      setDCChildren(response.Alotchild)

      const child = response.Alotchild.map(({
        id,
        quantity,
        status
      }) => ({
        itemID: id,
        quantity,
        status
      }))
      setRows(child)


    })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getClients?pageNo=1&&records=200&&sort=asc&&colName=id`)
      .then(response => {
        setClientName(response.data.clients.data)
        setLoading(false)
      })
      .catch(err => console.log(err))


    Axios.get(`${baseURL}/getProductsFromStock?sort=asc&&colName=id`)
      .then(response => {
        console.log(response.data)
        const arr = getProductNested.concat([response.data.products])
        setGetProductNested(arr)
        setLoading(false)
      })
      .catch(err => console.log(err))

  }, [Product, Plus2])

  return (
    <div>
      <form>
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>) : (<div className="form-row">
            <div className="form-group col-md-3">
              <label>Name</label>

              <input type="text" className="form-control"
                name="text" disabled
                value={DCParent[0].name}
                placeholder="" />
            </div>

            <div className="form-group col-md-3">
              <label>Date</label>
              <input type="text" className="form-control"
                name="Date" disabled
                value={DCParent[0].date}
                onFocus={(e) => e.target.any}
                placeholder="" />

            </div>

          </div>)}

        {/*  */}

        <div className="form-row">


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
                  <th scope="col">Product</th>

                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>

                </tr>
              </thead>

              <tbody>
                {DCChildren.map((cat, idx) => (
                  <tr>
                    <td>
                      {cat.name}

                    </td>

                    <td>
                      {cat.quantity}
                    </td>

                    <td>
                      {cat.status}

                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>)}

        <div className="form-row">
          <div className="form-group col-md-10" style={{ marginTop: '20px' }}>

          </div>
          <div className="form-group col-md-2" style={{ marginTop: '20px' }}>

            <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={addData}>
              Store Production
            </Button.Ripple>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StoreProduction 
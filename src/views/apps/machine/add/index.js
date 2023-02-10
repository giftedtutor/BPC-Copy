import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'

const AddMachine = () => {
  const [stylee, setStyle] = useState('none')
  const [name, setName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  const addProductType = () => {
    setIsButtonDisabled(true)
    if (name === '') {
      toast('Enter Machine Name!')
    } else if (name !== '') {

      fetch(`${baseURL}/addMachine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name
        })
      }).then(res => res.json())
        .then(data => {
          if (data.result === "Machine Saved Successfully") {
            toast('Machine Saved Successfully!')
            history.push('/BPC/apps/machine/list')
          } else {
            toast('Machine did not add, Please try again ')
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
    setLoading(false)
  }, [])

  return (
    <div>
      {/* Loader */}
      {isLoading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>) : (
        <form>
          <div className="form-row">

            <div className="form-group col-md-6">
              <label >Machine Name</label>
              <input onMouseEnter={e => {
                setStyle('block')
              }}
                onMouseLeave={e => {
                  setStyle('none')
                }} type="text" className="form-control" placeholder="Name" value={name}
                onFocus={(e) => e.target.select()} required
                onChange={(e) => setName(e.target.value)} />
            </div>

          </div>
          <Button.Ripple color='primary' disabled={isButtonDisabled} onClick={addProductType}>
            Add
          </Button.Ripple>
        </form>)}
    </div>
  )
}

export default AddMachine
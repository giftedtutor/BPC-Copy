import React, {useState, useEffect} from 'react'
import {Button } from 'reactstrap'
import { useHistory } from "react-router"
import { toast } from 'react-toastify'
import baseURL from '../../../../base-url/baseURL'

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' }
]

const addAdmin = () => {
    
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Role, setRole] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
   
    const [stylee, setStyle] = useState('none')
    const [style2, setStyle2] = useState('none')
    const [style3, setStyle3] = useState('none')
    const [style4, setStyle4] = useState('none')
    const [style5, setStyle5] = useState('none')

    const history = useHistory()

    const addAdmin = () => {
      setIsButtonDisabled(true)
         if (email === '') {
            toast('Please enter email!')
          }  else if (Password === '') {
            toast('Please Provide Secure Password!')
          } else if (Password.length < 5) {
            toast('Password must be 5 characters long!')
          } else if (ConfirmPassword === '') {
            toast('Confirm your Password!')
          } else if (Password !== ConfirmPassword) {
            toast('Passwords not Matched!')
          } else if (Role === '') {
            toast('Select a Role for Admin!')
          } else if (
                    Password !== '' &&
                    Password === ConfirmPassword &&
                    Role !== '' 
          ) {

        fetch(`${baseURL}/register`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                   
              name,
              email,
              password: Password,
              role : Role
                  
            })
        }).then(res => res.json())
        .then(data => {
            if (data.result === "User Created successfully") {
               
                toast('User Created successfully!')
                history.push('/BPC/apps/admin/list')
            }  else if (data.result === "User already exists") {
               
              toast('User already exists with this email!')
          } else {
                toast('Admin did not add, Please try again ')
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
    
    return (
        <div>
             <form>
        <div className="form-row">
      
        <div className="form-group col-md-4">
        <label>Name<span style={{color: 'red', fontSize: 15}}>*</span></label>
        <input onMouseEnter={e => {
                            setStyle('block')
                        }}
                        onMouseLeave={e => {
                            setStyle('none')
                        }}  type="email" className="form-control" placeholder="Name" value={name}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setName(e.target.value)}/>
         </div>
        <div className="form-group col-md-4">
        <label>Username<span style={{color: 'red', fontSize: 15}}>*</span> (Email address)</label>
        <input  onMouseEnter={e => {
                            setStyle2('block')
                        }}
                        onMouseLeave={e => {
                            setStyle2('none')
                        }} 
                  type="email" className="form-control" placeholder="example@gmail.com" value={email}
              onFocus={(e) => e.target.select()}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group col-md-4">
            <label >Password<span style={{color: 'red', fontSize: 15}}>*</span></label>
            <input  onMouseEnter={e => {
                            setStyle3('block')
                        }}
                        onMouseLeave={e => {
                            setStyle3('none')
                        }} type="Integer" className="form-control" placeholder="Password" value={Password}
              onFocus={(e) => e.target.select()}
            onChange={(e) => setPassword(e.target.value)} />
         </div>
     
        </div>
        <div className="form-row">
        <div className="form-group col-md-4">
            <label >Confirm Password<span style={{color: 'red', fontSize: 15}}>*</span></label>
            <input onMouseEnter={e => {
                            setStyle4('block')
                        }}
                        onMouseLeave={e => {
                            setStyle4('none')
                        }}  type="text" className="form-control" placeholder="Confirm Password" value={ConfirmPassword}
              onFocus={(e) => e.target.select()}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
    
        <div className="form-group col-md-4">
            <label >Role<span style={{color: 'red', fontSize: 15}}>*</span></label>
            <select onMouseEnter={e => {
                            setStyle5('block')
                        }}
                        onMouseLeave={e => {
                            setStyle5('none')
                        }}  class="custom-select"  onChange={(e) => setRole(e.target.value)} onFocus={(e) => e.target.any}>
            <option>Select Role</option>
              <option value='ADMIN'>ADMIN</option>
              <option value='ACCOUNTANT'>ACCOUNTANT</option>
              <option value='SALES'>SALES</option>
              <option value='PRODUCTION'>PRODUCTION</option>
              <option value='FINANCE'>FINANCE</option>
              </select>
        </div>
        </div>
        <Button.Ripple color='primary'  disabled={isButtonDisabled} onClick={addAdmin}>
                ADD
              </Button.Ripple>
        </form>
        </div>
    )
} 

export default addAdmin
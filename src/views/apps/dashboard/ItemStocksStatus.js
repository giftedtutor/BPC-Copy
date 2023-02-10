import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, Activity, Archive, TrendingDown, Users, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, PieChartFill, CardTitle, CardBody, CardText, Row, Col, Media, Button, Label, Form, FormGroup } from 'reactstrap'
import baseURL from '../../../base-url/baseURL'
import { useHistory } from 'react-router-dom'
import AddNewModal from './SideModal'
import Select from 'react-select'

const ItemStocksStatus = ({ cols }) => {
  const [data2, setData2] = React.useState([])
  const [isLoading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [notInStockData, setNotInStockData] = useState([])
  const handleModal = () => setModal(!modal)
  const [profile, setProfile] = useState({ value: '1', label: 'BURAQ' })
  const profileOptions = [
    { value: '', label: 'Select Profile' },
    { value: '1', label: 'BURAQ' },
    { value: '2', label: 'EURO' },
    { value: '3', label: 'PAMO' },
    { value: '4', label: 'PROLINE' },
    { value: '5', label: 'CONCH' },
    { value: '6', label: 'WINTECH' },
    { value: '7', label: 'DECEUNINCK' },
    { value: '8', label: 'SKYPEN' },
    { value: '9', label: 'SUPERWIN' }
  ]

  const history = useHistory()
  const data = [
    {
      title: data2.inStock,
      subtitle: 'in Stock Items',
      color: 'light-success',
      icon: <Archive size={24} />,
      navLink: '/BPC/apps/head-office-inventory/list'
    },
    {
      title: data2.outOfStock?.totalItems,
      subtitle: 'Out of Stock Items',
      color: 'light-danger',
      icon: <Archive size={24} />,
      navLink: ''
    }

  ]

  useEffect(() => {
    console.log(profile)
    Axios.get(`${baseURL}/categoryWiseStock?id=${profile?.value}`)
      .then(response => {
        setData2(response.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [profile])

  const viewNoAllotedStockModal = (notInStockData) => {
    setModal(!modal)
    setNotInStockData(notInStockData)
  }
  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >

          <Media>
            <Avatar onClick={() => {
              if (index === 1) {
                viewNoAllotedStockModal(data2.outOfStock.itemlist)
              } else {
                history.push(item.navLink)
              }
            }} color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 style={{ paddingTop: 7 }} className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText style={{ paddingBottom: 20 }} className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    isLoading ? (
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>) : (
      <Card className='card-statistics'>
        <AddNewModal open={modal} handleModal={handleModal} notInStockData={notInStockData} />
        <CardHeader>
          <Row>
            <Col md='12' style={{ width: 250 }}>
              {/* <Label for='profile'>Select Profile</Label> */}
              <Select

                isClearable={true}
                classNamePrefix='select'
                options={profileOptions}
                value={profile}
                type="text"
                name='profile'
                id='profile'
                onChange={(e) => {
                  setProfile(e)
                }}
                placeholder='Select Profile'
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody className='statistics-body'>
          <Row>{renderData()}</Row>
        </CardBody>
      </Card>)
  )
}

export default ItemStocksStatus

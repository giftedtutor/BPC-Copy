import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, Activity, Archive, TrendingDown, Users, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, PieChartFill, CardTitle, CardBody, CardText, Row, Col, Media, Button } from 'reactstrap'
import baseURL from '../../../base-url/baseURL'
import { useHistory } from 'react-router-dom'
import AddNewModal from './SideModal'
import Cookies from 'js-cookie'

const StatsCard = ({ cols }) => {
  const [data2, setData2] = React.useState([])
  const [isLoading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [notInStockData, setNotInStockData] = useState([])
  const handleModal = () => setModal(!modal)

  const role = Cookies.get('role')

  let admin
  if (role === 'ADMIN') {
    admin = true
  } else {
    admin = false
  }

  let accountant
  if (role === 'ACCOUNTANT') {
    accountant = true
  } else {
    accountant = false
  }

  let sales
  if (role === 'SALES') {
    sales = true
  } else {
    sales = false
  }

  let production
  if (role === 'PRODUCTION') {
    production = true
  } else {
    production = false
  }

  let finance
  if (role === 'FINANCE') {
    finance = true
  } else {
    finance = false
  }

  const history = useHistory()
  const data = [
    {
      title: data2.totalSuppliers,
      subtitle: 'Suppliers',
      color: 'light-primary',
      icon: <Users size={24} />,
      navLink: '/BPC/apps/user/list'
    },
    {
      title: data2.totalClients,
      subtitle: 'Clients',
      color: 'light-info',
      icon: <Users size={24} />,
      navLink: '/BPC/apps/client/list'
    },
    {
      title: data2.totalEmployees,
      subtitle: 'Employees',
      color: 'light-warning',
      icon: <Users size={24} />,
      navLink: '/BPC/apps/employee/list'
    },
    {
      title: data2.totalItems,
      subtitle: 'Items',
      color: 'light-info',
      icon: <Archive size={24} />,
      navLink: '/BPC/apps/allot-and-inventory-section/update-item-rates'
    },
    {
      title: data2.totalProjects,
      subtitle: 'Projects',
      color: 'light-success',
      icon: <Activity size={24} />,
      navLink: '/BPC/apps/project/listing'
    },
    {
      title: data2.inprogressProducionOrder,
      subtitle: 'Inprogress Production Orders',
      color: 'light-success',
      icon: <TrendingUp size={24} />,
      navLink: '/BPC/apps/production-orders/list'
    },
    {
      title: data2.canceledProducionOrder,
      subtitle: 'Canceled Production Orders',
      color: 'light-danger',
      icon: <TrendingDown size={24} />,
      navLink: '/BPC/apps/production-orders/list'
    },
    {
      title: data2.completedProducionOrder,
      subtitle: 'Completed Production Orders',
      color: 'light-success',
      icon: <TrendingUp size={24} />,
      navLink: '/BPC/apps/production-orders/list'
    },
    {
      title: (data2.totalCompletedQuotation + data2.totalPendingQuotation),
      subtitle: 'Total Quotations',
      color: 'light-success',
      icon: <Activity size={24} />,
      navLink: '/BPC/apps/upvcCalculaions/ViewQutation'
    },
    {
      title: data2.totalCompletedQuotation,
      subtitle: 'Completed Quotations',
      color: 'light-success',
      icon: <TrendingUp size={24} />,
      navLink: '/BPC/apps/upvcCalculaions/ViewQutation'
    },
    {
      title: data2.totalPendingQuotation,
      subtitle: 'Pedning Quotations',
      color: 'light-danger',
      icon: <TrendingDown size={24} />,
      navLink: '/BPC/apps/upvcCalculaions/ViewQutation'
    }
  ]

  useEffect(() => {
    Axios.get(`${baseURL}/getDashboardStats`)
      .then(response => {
        setData2(response.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const viewNoAllotedStockModal = (notInStockData) => {
    setModal(!modal)
    setNotInStockData(notInStockData)
  }
  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          style={{
            display: (admin === true || (finance === true && index === 0) || (finance === true && index === 3) || (accountant === true && index === 2) || (accountant === true && (index === 0 || index === 1 || index === 3)) || (production === true && index === 4) || (production === true && (index === 5 || index === 6 || index === 7)) || (sales === true && (index === 1 || index === 4 || index === 8 || index === 9 || index === 10))) ? '' : 'none'
          }}
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >

          <Media>
            <Avatar onClick={() => {
              history.push(item.navLink)
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
          <CardTitle tag='h4'>Dashboard</CardTitle>
        </CardHeader>
        <CardBody className='statistics-body'>
          <Row>{renderData()}</Row>
        </CardBody>
      </Card>)
  )
}

export default StatsCard

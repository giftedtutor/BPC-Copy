// ** User List Component
import Table from './Table'
import { useEffect, useState } from 'react'
// ** Styles
import '@styles/react/apps/app-users.scss'

const ClientsList = () => {

  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default ClientsList

// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
// import IntlDropdown from './IntlDropdown'
// import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
// import NavbarSearch from './NavbarSearch'
// import NotificationDropdown from './NotificationDropdown'

// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { Button, NavItem, NavLink } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const ThemeNavbar = props => {

  const history = useHistory()
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        <h3 className='text-left' style={{
          paddingTop: 5,
          paddingLeft:15
        }}>  BPC uPVC Company</h3>
      </div>
      <ul>
    
   
      </ul>
     
      <ul className='nav navbar-nav align-items-center ml-auto'>
        {/* <IntlDropdown /> */}
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
        {/* <NavbarSearch />
        <CartDropdown />
        <NotificationDropdown /> */}
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar

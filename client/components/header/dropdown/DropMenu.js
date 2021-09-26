import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useHistory } from 'react-router'

import Settings from '../../../assets/icons/cogwheel'
import ArrowBack from '../../../assets/icons/arrow_back'
import ArrowForward from '../../../assets/icons/arrow_forward'
import Logout from '../../../assets/icons/logout'
import Login from '../../../assets/icons/login'
import Profile from '../../../assets/icons/profile'
import View from '../../../assets/icons/view'

//* This is the item that contains both
//* The icon and the drop down menu, also
//* handle open and closing
export default function DropItem(props) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const { loggedIn, admin, logoutUser } = props

  useEffect(() => {
    //* handleClicks
    function handleClickOutside(event) {
      //* If the click took place outside, close menu
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }

    //* Bind the event listener if the menu is open
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => {
      //* Unbind the event listener on when the menu closes
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, open])

  //* Return the JSX
  return (
    <div className="drop-item" ref={ref}>
      <div onClick={() => setOpen(!open)}>
        <IconButton icon={loggedIn ? (admin ? Settings : Profile) : Login} />
      </div>
      {open ? <DropMenu loggedIn={loggedIn} admin={admin} logoutUser={logoutUser} /> : ''}
    </div>
  )
}

//* This is the icon / button that shows
//* In the header
function IconButton(props) {
  //* If the icon is undefined return nothing
  if (props.icon === undefined) return <></>
  //* Return the icon
  return (
    <div className="icon-button">
      <props.icon />
    </div>
  )
}

//* This is the dropdown component that renders
//* the list and it's items
function DropMenu(props) {
  const history = useHistory()
  const dropdownRef = useRef(null)
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const { loggedIn, admin, logoutUser } = props

  useEffect(() => {
    //* Set the menu height
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 40)
  }, [])

  //* Calculate new menu height
  function calcHeight(el) {
    const height = el.offsetHeight + 35
    //! Remove
    console.log('--------------------')
    console.log('height:', height)
    console.log('--------------------')
    //! Remove
    setMenuHeight(height)
  }

  //* Dropdown menu item
  function DropdownItem(props) {
    const { children, goToMenu, rightIcon, leftIcon, click } = props

    return (
      <div className="menu-item-container">
        <a
          className="menu-item"
          onClick={() => {
            if (click) click()
            if (goToMenu) setActiveMenu(goToMenu)
          }}
        >
          <span className="icon-button">{leftIcon}</span>
          {children}
          <span className="icon-right">{rightIcon}</span>
        </a>
      </div>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          {admin ? (
            <DropdownItem leftIcon={<Settings />} rightIcon={<ArrowForward />} goToMenu="settings">
              Admin
            </DropdownItem>
          ) : (
            <></>
          )}
          <DropdownItem leftIcon={<Profile />}>My Profile</DropdownItem>
          {/* Handle the login */}
          {loggedIn ? (
            <DropdownItem rightIcon={<Logout />} click={() => logoutUser()}>
              Log Out
            </DropdownItem>
          ) : (
            <DropdownItem rightIcon={<Login />} click={() => history.push('/login')}>
              Log In
            </DropdownItem>
          )}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowBack />} goToMenu="main">
            Back
          </DropdownItem>
          <DropdownItem leftIcon={<View />}>View Users</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

import React, { useState } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
  } from "shards-react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import '../style/MenuBarStyle.css';
import { useAuth0 } from "@auth0/auth0-react";


function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const  {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

    return(
        <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">CIS 550 NBA</NavbarBrand>
        <NavbarToggler onClick={toggle} />

          <Nav navbar>
            <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/players">
                Players
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/teams" >
                Teams
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/matches" >
                Matches
              </NavLink>
            </NavItem>
            
          </Nav>
          <Nav className="logInOutButton">
              {!isAuthenticated && (
                  <NavItem className="loginButton">
                    <Button
                      onClick={() => {
                        loginWithRedirect();
                      }}> Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <h6> Log out </h6>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>

      </Navbar>
    )
}

export default MenuBar

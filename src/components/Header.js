import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Header = () => {
  return(
    <Navbar className="customNavbar" color="primary" expand="md">
      <NavbarBrand href="https://www.truecaller.com/">Truecaller</NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink href="/">Blog</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header;
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './style.css';

const LoggedInNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="faded" light expand="md" style={{ backgroundColor: '#BAE8C8' }}>
      <NavbarBrand href="/" style={{ fontStyle: 'italic' }}>Cyber Ed</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/logout">Log Out</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/learn">Learn</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default LoggedInNav;

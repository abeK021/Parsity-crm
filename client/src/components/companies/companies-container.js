import React from 'react';
import CompaniesView from './companies-veiw'
import AddCompany from './company-modals/add-company';
import {Nav, /* Tab, Tabs */} from 'react-bootstrap';
/* import DealsContainer from '../deals/deals-container'; */
/* import { Link, Redirect, Switch } from 'react-router-dom'; */
import { LinkContainer } from 'react-router-bootstrap';
import './companies-view-style.css'

function CompaniesContainer() {
  return (
    <React.Fragment>
      <AddCompany/>
      <Nav variant="tabs" defaultActiveKey="/companies">
      <LinkContainer to="/dashboard">
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/companies">
          <Nav.Item>
            <Nav.Link href="/companies">Companies</Nav.Link>
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/deals">
          <Nav.Item>
            <Nav.Link href="/deals">Deals</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
      <CompaniesView />
    </React.Fragment>
  );
};

export default CompaniesContainer;

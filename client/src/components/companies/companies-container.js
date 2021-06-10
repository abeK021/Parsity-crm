import React from 'react';
import { Nav /* Tab, Tabs */ } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CompaniesView from './companies-veiw';
import AddCompany from './company-modals/add-company';
/* import DealsContainer from '../deals/deals-container'; */
/* import { Link, Redirect, Switch } from 'react-router-dom'; */
import './companies-view-style.css';

function CompaniesContainer() {
  return (
    <>
      <AddCompany />
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
    </>
  );
}

export default CompaniesContainer;

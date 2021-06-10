import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DealFilters from '../filters/DealFilters'
import AddDeal from './deals-view/add-deal';
import DealsViewHandler from './deals-view/deals-view-handler';
import './deals-view/deals-view-style.css';

function DealsContainer() {
  return (
    <>
        <AddDeal />
      <Nav variant="tabs" defaultActiveKey="/deals">
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
            <Nav.Link href="/deals" disabled>
              Deals
            </Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
      <DealsViewHandler />
    </>
  );
}

export default DealsContainer;

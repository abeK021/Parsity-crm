import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DashboardView from './dashboard-view/dashboard-view';

function DashboardContainer() {
  return (
    <>
      <Nav
        variant="tabs"
        defaultActiveKey="/dashboard"
        style={{ marginTop: '71px' }}
      >
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
      <DashboardView />
    </>
  );
}

export default DashboardContainer;

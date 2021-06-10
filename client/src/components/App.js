import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Nav from './nav/nav.js';
import DealsContainer from './deals/deals-container';
import DealView from './deals/deal-view/deal-view';
import CompaniesContainer from './companies/companies-container';
import CompanyView from './companies/company-view';
import DashboardContainer from './dashboard/dashboard-container';

function App() {
  return (
    <>
      <Nav /> {/* Nav bar */}
      <Switch>
        <Route path="/companies/:_id" component={CompanyView} />
        <Route path="/companies" component={CompaniesContainer} />
        <Route path="/deals/:_id" component={DealView} />
        <Route path="/deals" component={DealsContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Redirect to="/dashboard" /> {/* Default landing page */}
      </Switch>
    </>
  );
}

export default App;

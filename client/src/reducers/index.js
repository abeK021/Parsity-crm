import { combineReducers } from 'redux';
import CompaniesReducer from './companies-reducer';
import DealsReducer from './deals-reducer';
import NewCompanyReducer from './new-company-reducer';
import CompanyReducer from './company-reducer';
import NewDealReducer from './new-deal-reducer';
import ListReducer from './list-reducer';
import DashboardReducer2 from './dashboard-reducer-2';
import DashboardReducer1 from './dashboard-reducer-1';
import DashboardReducer3 from './dashboard-reducer-3';
import DashboardReducer4 from './dashboard-reducer-4';

const rootReducer = combineReducers({
  companyData: CompaniesReducer,
  dealsData: DealsReducer,
  newCompany: NewCompanyReducer,
  companyView: CompanyReducer,
  newDeal: NewDealReducer,
  companiesList: ListReducer,
  revenueData: DashboardReducer2,
  percentageOverall: DashboardReducer1,
  conversionData: DashboardReducer3,
  monthlyRevenue: DashboardReducer4,
});

export default rootReducer;

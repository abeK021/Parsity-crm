import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { getCompanyById } from '../../actions';
import './company-style.css';
import CompanyViewCard from './company-view-card';

const CompanyView = (props) => {
  const { company } = useSelector((state) => state.companyView);
  const { error } = useSelector((state) => state.companyView);
  const companyId = props.match.params._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyById(companyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanyById]);

  function renderCompany() {
    // if there is no error and the company has associated deals, return the company details and the associated list of deals
    if (_.isEmpty(error) && !_.isEmpty(company.deals)) {
      const deals = company.deals.map((deal) => deal);
      return (
        <div className="center">
          <div className="col-md-4 p-2">
            <CompanyViewCard company={company} companyId={companyId} />
          </div>
          <div className="col-md-4 p-2">
            <div className="card" width="18rem">
              <div className="card-body">
                <h2 className="deals-title">Active Deals</h2>
                {/* loop through the array of deals and render each detail in its respective tag */}
                {deals.map((deal, id) => (
                  <div key={id}>
                    <hr />
                    <Link to={`/deals/${deal._id}`}><p>{deal.name}</p></Link>
                    <h6>Amount: ${deal.amount}</h6>
                    <h6>Stage: {deal.stage}</h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      // if there is no error and the company does not have associated deals, return the company details
    }
    if (_.isEmpty(error) && _.isEmpty(company.deals)) {
      return (
        <div className="center">
          <div className="col-md-4 p-2">
            <CompanyViewCard company={company} companyId={companyId} />
          </div>
          <div className="col-md-4 p-2">
            <div className="card" width="18rem">
              <div className="card-body">
                <h2 className="deals-title">Active Deals</h2>
                <h6 className="center">
                  There are no active deals associated with this company
                </h6>
              </div>
            </div>
          </div>
        </div>
      );
      // if there is an error, return the respective error message
    }
    if (!_.isEmpty(error)) {
      return (
        <div className="float-container error col-md-8">
          <p>Sorry, something went wrong, please try again at a later time.</p>
        </div>
      );
    }
  }

  return (
    <div className="text">
      <Link to="/companies" variant="primary">
        <Button className="btn-return">Return to full list</Button>
      </Link>
      {renderCompany()}
      {/* <EditCompany company={company} id={companyId}/> */}
    </div>
  );
};

export default CompanyView;

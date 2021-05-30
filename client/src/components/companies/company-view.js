import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCompanyById } from "../../actions";
/* import Nav from '../nav/nav'; */
import EditCompany from './edit-company'
import './company-style.css';
import _ from "lodash";

const CompanyView = (props) => {
  const { company }  = useSelector(state => state.companyView);
  const companyId = props.match.params._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyById(companyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanyById]);


  // will refactor this whole function to clean it up, ok for now to fix the error
  function renderCompany() {
    if (!_.isEmpty(company.deals)) {
      let deals = company.deals.map(deal => deal)
      return (
        <div className="float-container col-md-8">
          <div className = "float-child info col-md-4">
            <h2>Company Info</h2>
            <h4>{company.name}</h4>
            <p>Created on:</p><h6>{company.createdAt}</h6>
            <p>Owner/CEO: </p><h6>{company.owner}</h6>
            <p>Phone: </p><h6>{company.phone}</h6>
            <p>Location: </p><h6>{company.city}, {company.state}</h6>
            <p>Industry: </p><h6>{company.industry}</h6>
          </div>
          <div className = "float-child deals col-md-4">
            <h2 className="deals-title">Associated Deals</h2>
            {deals.map((deal, id) => (
              <div key={id} >
                <p>{deal.name}</p>
                <h6>Amount: ${deal.amount}</h6>
                <h6>Stage: {deal.stage}</h6>
              </div>
            ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="float-container col-md-8">
          <div className = "float-child info col-md-4">
            <h2>Company Info</h2>
            <h4>{company.name}</h4>
            <p>Created on:</p><h6>{company.createdAt}</h6>
            <p>Owner/CEO: </p><h6>{company.owner}</h6>
            <p>Phone: </p><h6>{company.phone}</h6>
            <p>Location: </p><h6>{company.city}, {company.state}</h6>
            <p>Industry: </p><h6>{company.industry}</h6>
          </div>
          <div className = "float-child deals col-md-4">
            <h2 className="deals-title">Associated Deals</h2>
            <h6>There are no deals associated with this company</h6>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="text">
      <Link to="/"><button className="btn-return">Return to full list</button></Link>
      {renderCompany()}
      <EditCompany company={company} id={companyId}/>
    </div>
  );
};

export default CompanyView;

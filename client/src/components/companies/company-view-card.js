import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditCompany from './company-modals/edit-company';
import DeleteButton from '../buttons/deleteButton';
import { deleteCompany } from '../../actions';

const CompanyViewCard = (props) => {
  const { company, companyId } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDeleteCompany = () => {
    dispatch(deleteCompany(companyId));
    history.push('/companies');
  };
  return (
    <div className="card" width="18rem">
      <div className="card-body">
        <div className="space-between">
          <h3 className="card-title">{company.name}</h3>
          <img
            src={company.logo ? company.logo : ''}
            width="40"
            height="40"
            alt=""
          />
          <div className="space-between">
            <div className="icon-spacing">
              <EditCompany company={company} id={companyId} />
            </div>
            <div className="icon-spacing">
              <DeleteButton
                deleteFunction={handleDeleteCompany}
                type="company"
              />
            </div>
          </div>
        </div>
        <div className="card-subtitle text-muted">
          {company.city}, {company.state}
        </div>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
            <div className="space-between">
              <div>Phone:</div>
              <div>{company.phone}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="space-between">
              <div>Industry:</div>
              <div>{company.industry}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="space-between">
              <div>Owner/CEO:</div>
              <div>{company.owner}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="space-between">
              <div>Created on:</div>
              <Moment format="MM/DD/YY">{company.createdAt}</Moment>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyViewCard;

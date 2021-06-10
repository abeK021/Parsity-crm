import Moment from 'react-moment';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect /* , useState */ } from 'react';
import { getCompanies } from '../../actions';
/* import { FormControl } from 'react-bootstrap' */
import '../App.css';
import Paginate from '../pagination/pagination';

const queryString = require('query-string');

function CompaniesView() {
  const { companies } = useSelector((state) => state.companyData);
  const { error } = useSelector((state) => state.companyData);

  const dispatch = useDispatch();
  const location = useLocation();
  /*  const [urlQuery, setUrlQuery] = useState(1); */
  const currentQuery = queryString.parse(location.search);

  useEffect(() => {
    // loads all compaines on initial render
    dispatch(getCompanies(currentQuery.page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompanies]);

  function renderCompaniesDisplay() {
    if (_.isEmpty(error) && !_.isEmpty(companies)) {
      // if companies returned from dispatch, render companies

      const companyTableRows = companies.map((item) => {
        item.logo = item.logo
          ? item.logo
          : 'https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg';
        return (
          <tr key={item._id} className="table-row">
            <td className="main-column">
              <Link className="company-name" to={`companies/${item._id}`}>
                <img src={item.logo} alt="" width="40 auto" /> {item.name}
              </Link>
            </td>
            <td className="secondary-column">{item.owner}</td>
            <td className="secondary-column">{item.phone}</td>
            <td className="secondary-column">
              {item.city}, {item.state}
            </td>
            <td className="secondary-column">{item.industry}</td>
            <td className="secondary-column">
              <Moment format="MMMM Do, YYYY">{item.createdAt}</Moment>
            </td>
          </tr>
        );
      });

      return (
        <div>
          <table className="table">
            <thead className="table-head">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Main Contact</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Location</th>
                <th scope="col">Industry</th>
                <th scope="col">Create Date</th>
              </tr>
            </thead>
            <tbody>{companyTableRows}</tbody>
          </table>
        </div>
      );
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
    <div>
      {renderCompaniesDisplay()}
      {/* renders our pagination component */}
      <div id="pagination">
        <Paginate page={queryString.page} />
      </div>
    </div>
  );
}

export default CompaniesView;

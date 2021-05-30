import { getCompanies } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect /* , useState */} from 'react';
import _ from 'lodash'
/* import { FormControl } from 'react-bootstrap' */
import Paginate from '../pagination/pagination'
import '../App.css'
import { Link, useLocation } from 'react-router-dom';
const queryString = require('query-string');

function CompaniesView() {
  const { companies } = useSelector(state => state.companyData);
  const dispatch = useDispatch();
  const location = useLocation();
 /*  const [urlQuery, setUrlQuery] = useState(1); */
  const currentQuery = queryString.parse(location.search);

  useEffect(() => { // loads all compaines on initial render
    dispatch(getCompanies(currentQuery.page));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getCompanies]);

  
  function renderCompaniesDisplay () {
    if (!_.isEmpty(companies)) { // if companies returned from dispatch, render companies
      const companyTableRows = companies.map(item => {
      return (
        <tr key={item._id} className ="table-row">
          <td><Link to={`companies/${item._id}`}>{item.name}</Link></td>
          <td>{item.owner}</td>
          <td>{item.phone}</td>
          <td>{item.city}, {item.state}</td>
          <td>{item.industry}</td>
          <td>{item.createdAt}</td>
        </tr>
        );
      }
    );

    return (
      <div>
        <table className="table">
          <thead className ="table-head">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Main Contact</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Location</th>
              <th scope="col">Industry</th>
              <th scope="col">Create Date</th>
            </tr>
          </thead>
          <tbody>
              {companyTableRows}    
          </tbody>
        </table>       
      </div>
      );
    };
  };

return (
  <div >
    {renderCompaniesDisplay()}
    {/* renders our pagination component */}
    <Paginate page={queryString.page}/>
  </div>
  );
};

export default CompaniesView;

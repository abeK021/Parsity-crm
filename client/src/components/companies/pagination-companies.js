import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const queryString = require('query-string');

const PaginationCompanies = () => {
  const location = useLocation();
  const count = useSelector(({companyData}) => companyData.count);
  console.log(location);
  debugger;
  // const currentPage = useSelector(({currentPage}) => currentPage);
  const currentPage = 1
  const productsPerPage = 5;
  const numberOfPages = Math.ceil(count/productsPerPage);

  const createLinkLocation = (currentLocation, page) => {
    const currentQuery = queryString.parse(currentLocation.search);
    const queryForLink = {...currentQuery, page};
    const linkLocation = {...location, search: queryString.stringify(queryForLink)};
    return linkLocation
  }

  const generatePreviousButton = (currentPage) => {
    const classes = currentPage === 1 ? "page-item disabled" : "page-item";
    return (
      <li key={0} className={classes}><Link className="page-link" to={createLinkLocation(location, currentPage-1)}>Previous</Link></li>
    )
  }

  const generateNextButton = (currentPage, finalPage) => {
    const classes = currentPage >= finalPage ? "page-item disabled" : "page-item";
    return (
      <li key={finalPage + 1} className={classes}><Link className="page-link" to={createLinkLocation(location, currentPage+1)}>Next</Link></li>
    )
  }

  const generatePaginationButton = (pageNumber, currentPage) => {
    const classNames = pageNumber === currentPage ? "page-item active" : "page-item";
    return (
      <li key={pageNumber} className={classNames}><Link className="page-link" to={createLinkLocation(location, pageNumber)}>{pageNumber}</Link></li>
    )
  }
  
  const generatePaginationButtons = (currentPage, numberOfPages) => {
    let paginationButtons = [];
    for (let i = 1; i <= numberOfPages; i++) {
     paginationButtons.push(generatePaginationButton(i, currentPage))
    }
    return paginationButtons;
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <ul className="pagination justify-content-center">
          {generatePreviousButton(currentPage)}
          {generatePaginationButtons(currentPage, numberOfPages)}
          {generateNextButton(currentPage, numberOfPages)}
        </ul>
      </div>
    </div>
  )
}

export default PaginationCompanies;
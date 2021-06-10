import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCompanies } from '../../actions';
import './pagination.css';
import {
  PrevPagElement,
  CenterPagElement,
  NextPagElement,
} from './pag-elements';

const Paginate = () => {
  const dispatch = useDispatch();

  // gets the total items so we can calculate how many pages we need
  const itemsCount = useSelector((state) => state.companyData.count);
  const numOfPages = Math.ceil(itemsCount / 5);

  const [pageNumber, setPageNumber] = useState(1);
  /*   const [name, setName] = useState(''); */

  // dipatch and fetch based on change of the depandencies
  useEffect(() => {
    dispatch(getCompanies(pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handleNextPage = () => {
    pageNumber === numOfPages
      ? setPageNumber(numOfPages)
      : setPageNumber((page) => page + 1);
  };

  // sets the state for next page.
  // conditional to to prevent from going over total page limit
  const handlePrevPage = () => {
    pageNumber === 1 ? setPageNumber(1) : setPageNumber((page) => page - 1);
  };

  const handlePaginationDisplay = () => {
    if (pageNumber === 1 && numOfPages === 1) {
      return (
        <ul className="pagination">
          <CenterPagElement pageNumber={pageNumber} numOfPages={numOfPages} />
        </ul>
      );
    }

    if (pageNumber === 1) {
      return (
        <ul className="pagination">
          <CenterPagElement pageNumber={pageNumber} numOfPages={numOfPages} />
          <NextPagElement
            pageNumber={pageNumber}
            numOfPages={numOfPages}
            handleNextPage={handleNextPage}
          />
        </ul>
      );
    }

    if (pageNumber > 1 && pageNumber < numOfPages) {
      return (
        <ul className="pagination">
          <PrevPagElement
            pageNumber={pageNumber}
            numOfPages={numOfPages}
            handlePrevPage={handlePrevPage}
          />
          <CenterPagElement pageNumber={pageNumber} numOfPages={numOfPages} />
          <NextPagElement
            pageNumber={pageNumber}
            numOfPages={numOfPages}
            handleNextPage={handleNextPage}
          />
        </ul>
      );
    }
    if (pageNumber === numOfPages) {
      return (
        <ul className="pagination">
          <PrevPagElement
            pageNumber={pageNumber}
            numOfPages={numOfPages}
            handlePrevPage={handlePrevPage}
          />
          <CenterPagElement pageNumber={pageNumber} numOfPages={numOfPages} />
        </ul>
      );
    }
  };

  return <>{handlePaginationDisplay()}</>;
};

// this will export and gets rendered in company views
export default Paginate;

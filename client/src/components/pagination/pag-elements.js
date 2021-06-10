export const CenterPagElement = (props) => {
  const { pageNumber, numOfPages } = props;
  return (
    <li className="page-item">
      <div className="page-link pag-text-style center-pag-element">
        Page {pageNumber} of {numOfPages}
      </div>
    </li>
  );
};

export const PrevPagElement = (props) => {
  const { handlePrevPage } = props;
  return (
    <li className="page-item">
      <div className="page-link pag-text-style" onClick={handlePrevPage}>
        <span aria-hidden="true">&laquo; </span>
      </div>
    </li>
  );
};

export const NextPagElement = (props) => {
  const { handleNextPage } = props;
  return (
    <li className="page-item">
      <div className="page-link pag-text-style" onClick={handleNextPage}>
        <span aria-hidden="true"> &raquo;</span>
      </div>
    </li>
  );
};

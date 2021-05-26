import DealsView from './deals-view'
import { getDeals } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash';

function DealsViewHandler() {
  const { deals } = useSelector(state => state.dealsData);
  const dispatch = useDispatch();

  useEffect(() => { // loads all deals on initial render
    dispatch(getDeals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [getDeals]);

  const renderDealView = () => {
    if (!_.isEmpty(deals)) {
      return  <DealsView deals={deals} />
    }
  };

  return (
    <>{renderDealView()}</>
  );
};

export default DealsViewHandler;

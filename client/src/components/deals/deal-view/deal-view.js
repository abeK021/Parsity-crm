import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';
import DealTimeline from './deal-timeline';
import DealViewCard from './deal-view-card';
// import '../../companies/company-style.css';

const DealView = (props) => {
  const dealId = props.match.params._id;
  const [dealData, setDealData] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/deals/${dealId}`)
      .then((returnedDeal) => setDealData(returnedDeal.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteDeal = () => {
    axios.delete(`/deals/${dealData._id}`).then(() => {
      history.push('/deals');
    });
  };
  const handleArchiveDeal = () => {
    axios
      .put(`/deals/${dealData._id}/update`, { archived: true })
      .then((updatedDeal) => setDealData(updatedDeal.data));
  };

  const handleEditDeal = (id, updatedDealInfo) => {
    axios.put(`/deals/${id}/update`, updatedDealInfo).then(updatedDeal => setDealData(updatedDeal.data))
  }

  if (_.isEmpty(dealData)) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="text">
        <Link to="/deals" variant="primary">
          <Button className="btn-return">Return to all deals</Button>
        </Link>
        <div className="center">
          <div className="col-md-4 p-2">
            <DealViewCard
              deal={dealData}
              handleArchiveDeal={handleArchiveDeal}
              handleDeleteDeal={handleDeleteDeal}
              handleEditDeal={handleEditDeal}
            />
          </div>
          <div className="col-md-4 p-2">
            <div className="card" width="18rem">
              <div className="card-body">
                <h2 className="deals-title">Timeline</h2>
                {dealData.stageHistory.length !== 0 ? (
                  <DealTimeline stageHistory={dealData.stageHistory} />
                ) : (
                  <h6 className="center">No updates available</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealView;

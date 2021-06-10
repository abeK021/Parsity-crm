import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesList, getDeals } from '../../actions';
import FilterButton from '../buttons/filterButton'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const DealFilters = () => {
  const [company, setCompany] = useState();
  const [range, setRange] = useState();

  const dispatch = useDispatch();
  
  const companiesList = useSelector(state => state.companiesList);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getCompaniesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesList]);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getDeals(company, range))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, company]);

  return (
    <>
    <div className='row mt-2 p-2'>
      <div className='col filter-item d-flex'>
          <select class="form-select" onChange={event=> setCompany(event.target.value)} value={company}>
              <option value=''>Filter by Company</option>
              {companiesList.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
      </div>
      <div className='col filter-item'>
        <span>
          <Range 
              allowCross={false}
              tipFormatter={value => value}
              defaultValue={[0, 1500]}
              min={0}
              max={1500}
              marks={{0: 0, 1500: 1500}}
              draggableTrack={true}
              onAfterChange={(value) => setRange(value)}
            />
        </span>
        <div className="center">Filter by Price</div>
      </div>
    
      </div>
    </>
  )
}

export default DealFilters
import { useState } from 'react';
import { Funnel, FunnelFill } from 'react-bootstrap-icons';

const FilterButton = ({ onClick }) => {
  const [filterHover, setFilterHover] = useState(false);
  return (
    <h3
      onClick={onClick}
      onMouseEnter={() => setFilterHover(true)}
      onMouseLeave={() => setFilterHover(false)}
    >
      <span title="filter">{filterHover ? <FunnelFill /> : <Funnel />}</span>
    </h3>
  );
};

export default FilterButton;
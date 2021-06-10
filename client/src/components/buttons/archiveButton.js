import { useState } from 'react';
import { Safe, SafeFill } from 'react-bootstrap-icons';

const ArchiveButton = ({ onClick }) => {
  const [archiveHover, setArchiveHover] = useState(false);
  return (
    <h3
      onClick={onClick}
      onMouseEnter={() => setArchiveHover(true)}
      onMouseLeave={() => setArchiveHover(false)}
    >
      <span title="archive">{archiveHover ? <SafeFill /> : <Safe />}</span>
    </h3>
  );
};

export default ArchiveButton;

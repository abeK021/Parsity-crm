import { useState } from 'react';
import { Pencil, PencilFill } from 'react-bootstrap-icons';

const EditButton = ({ onClick }) => {
  const [editHover, setEditHover] = useState(false);
  return (
    <h3
      onClick={onClick}
      onMouseEnter={() => setEditHover(true)}
      onMouseLeave={() => setEditHover(false)}
    >
      <span title="edit">{editHover ? <PencilFill /> : <Pencil />}</span>
    </h3>
  );
};

export default EditButton;

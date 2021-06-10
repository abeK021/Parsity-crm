import { useState } from 'react';
import { X, XCircleFill } from 'react-bootstrap-icons';

const XCloseButton = ({ onClose }) => {
  const [xHover, setXHover] = useState(false);
  return (
    <h3
      onClick={onClose}
      onMouseEnter={() => setXHover(true)}
      onMouseLeave={() => setXHover(false)}
    >
      <span title="close">{xHover ? <XCircleFill /> : <X />}</span>
    </h3>
  );
};

export default XCloseButton;

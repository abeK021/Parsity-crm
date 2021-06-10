import { useState } from 'react';
import { Trash, TrashFill } from 'react-bootstrap-icons';
import { Modal, Button } from 'react-bootstrap';
import XCloseButton from './xCloseButton';

const DeleteButton = ({ deleteFunction, type }) => {
  const [show, setShow] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  return (
    <>
      <h3
        onClick={() => setShow(true)}
        onMouseEnter={() => setDeleteHover(true)}
        onMouseLeave={() => setDeleteHover(false)}
      >
        <span title="delete">{deleteHover ? <TrashFill /> : <Trash />}</span>
      </h3>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
          <XCloseButton onClose={() => setShow(false)} />
        </Modal.Header>
        <Modal.Body>
          <h5>{`Are you sure?${
            type === 'company'
              ? ' Deleting this company will also delete associated active and archived deals'
              : ''
          }`}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteFunction} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;

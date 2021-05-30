import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { editCopmany } from '../../actions'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PencilSquare } from 'react-bootstrap-icons';

const companySchema = Yup.object().shape({
  name: Yup.string().required(),
  owner: Yup.string(),
  phone: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  industry: Yup.string()
})

function EditCompany({ company, id }) {
  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(companySchema),
  });

  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);

  const handleCopmanyEdit = (data) => {
    dispatch(editCopmany(data, id))
    setShow(false);
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Phone', 'City', 'State', 'Industry']

  const renderEditCompanyModal = () => {
    return (
      <>
        <PencilSquare width={32} height={32} onClick={() => setShow(true)}/>
        {/* <Button className="glyphicon glyphicon-pencil" variant="primary" onClick={() => setShow(true)}>
          Edit
        </Button> */}

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title>Edit Company</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit(handleCopmanyEdit)}>
            <Modal.Body>
              {formFields.map(field => {
                return (
                  <div key ={field}>
                    <div className="form-group" >
                      <label>{field}</label>
                      <input
                        className="form-control"
                        defaultValue={company[field.toLowerCase()]}
                        name={field.toLowerCase()}
                        {...register(field.toLowerCase())}
                      ></input>
                      {errors[field.toLowerCase()]?.message}
                    </div>
                    <br />
                  </div>
                )
              })} 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>Close</Button>
              <Button type="submit" variant="primary">Submit</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {renderEditCompanyModal()}
    </div>
  );
};

export default EditCompany;
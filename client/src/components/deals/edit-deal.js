import {Modal, Button} from 'react-bootstrap';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { editDeal } from '../../actions'


const dealSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for the deal"),
  owner: Yup.string(),
  amount: Yup.number().typeError("Please enter a deal amount"),
  company: Yup.string()
})

function EditDeal(props) {
  const { deal } = props;
  const dispatch = useDispatch();

  const { reset, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(dealSchema),
  });

  const [show, setShow] = useState(false);

  const handleDealEdit = (data) => {
    setShow(false);
    dispatch(editDeal(data))
  };

  const onClose = () => {
    setShow(false)
    reset()
  }

  const formFields = ['Name', 'Owner', 'Amount']

  return (
    <>
    <div className="edit-deal" onClick={() => setShow(true)}>{deal.name}</div>

    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Edit deal</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleDealEdit)}>
          <Modal.Body>
            {formFields.map(field => {
              return (
                <div key ={field}>
                  <div className="form-group" >
                    <label>{field}</label>
                    <input
                      className="form-control"
                      defaultValue={deal[field.toLowerCase()]}
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

export default EditDeal;

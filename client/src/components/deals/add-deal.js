import { useState, useEffect } from "react";
import {Modal, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { postNewDeal } from '../../actions'
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const dealSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a name for the deal"),
  owner: Yup.string(),
  amount: Yup.number().typeError("Please enter a deal amount"),
  company: Yup.string()
})
function AddDeal() {
  const { reset, register, handleSubmit, watch, control, formState: { errors }} = useForm({
    resolver: yupResolver(dealSchema),
  });
  const { startDate, endDate } = watch(["startDate", "endDate"]);
  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);
  useEffect(() => axios.get("/companies/list").then(({ data }) => setCompaniesList(data)), [setCompaniesList])
  const handleDealAdd = (data) => {
    debugger;
    dispatch(postNewDeal(data))
    reset()
    setShow(false);
  };
  const onClose = () => {
    setShow(false)
    reset()
  }
  const formFields = ['Name', 'Owner', 'Amount']
  return (
    <div>
      <div className="container-fluid ">
        <div className="row col-12 d-flex justify-content-end">
          <div className="col "> 
              <Button variant="primary" className="add-deals-button" onClick={() => setShow(true)}>
                Add Deal
              </Button>
          </div>
        </div>
      </div>
      
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add a new Deal</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleDealAdd)}>
          <Modal.Body>
            {formFields.map(field => {
              return (
                <div key ={field}>
                  <div className="form-group" >
                    <label>Deal {field}</label>
                    <input
                      className="form-control"
                      placeholder={`Enter Deal ${field}`}
                      name={field.toLowerCase()}
                      {...register(field.toLowerCase())}
                    ></input>
                    {errors[field.toLowerCase()]?.message}
                  </div>
                  <br />
                </div>
              )
            })}
            <div key ="company">
              <div className="form-group" >
                <label>Company</label>
                <select 
                  className="form-select"
                  name="company"
                  {...register("company")}
                  >
                  {companiesList.map(company => {
                    return (
                          <option key={company._id} value={company._id}>{company.name}</option>
                    );
                  })}
                </select>
              </div>
              <br />
            </div>
            <div className="form-section">
              <label htmlFor="expectedCloseDate" className="form-label">Expected Close Date</label>
              <Controller
                control={control}
                name="expectedCloseDate"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                  />
                )}
              />
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button type="submit" variant="primary">Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
export default AddDeal;
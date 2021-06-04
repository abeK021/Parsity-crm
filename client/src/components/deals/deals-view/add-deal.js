import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { postNewDeal, getCompaniesList } from '../../../actions';
import XCloseButton from '../../buttons/xCloseButton';

const dealSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for the deal'),
  amount: Yup.number().typeError('Please enter a deal amount'),
  company: Yup.string(),
});

function AddDeal() {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dealSchema),
  });

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getCompaniesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesList]);

  const companiesList = useSelector(state => state.companiesList);
  // const [companiesList, setCompaniesList] = useState([]);

  const handleDealAdd = (data) => {
    dispatch(postNewDeal(data));
    reset();
    setShow(false);
  };
  const onClose = () => {
    setShow(false);
    reset();
  };
  const formFields = ['Name', 'Amount'];
  return (
    <div>
      <div className="container-fluid ">
        <div className="row col-12 d-flex justify-content-end">
          <div className="col ">
            <Button
              variant="primary"
              className="add-deals-button"
              onClick={() => setShow(true)}
            >
              Add Deal
            </Button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add a new Deal</Modal.Title>
          <XCloseButton onClose={onClose} />
        </Modal.Header>
        <form onSubmit={handleSubmit(handleDealAdd)}>
          <Modal.Body>
            {formFields.map((field) => (
              <div key={field}>
                <div className="form-group">
                  <label>Deal {field}</label>
                  <input
                    className="form-control"
                    placeholder={`Enter Deal ${field}`}
                    name={field.toLowerCase()}
                    {...register(field.toLowerCase())}
                  />
                  {errors[field.toLowerCase()]?.message}
                </div>
                <br />
              </div>
            ))}
            <div key="company">
              <div className="form-group">
                <label>Company</label>
                <select
                  className="form-select"
                  name="company"
                  {...register('company')}
                >
                  {companiesList.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
            </div>
            <div className="form-section">
              <label htmlFor="expectedCloseDate" className="form-label">
                Expected Close Date
              </label>
              <br />
              <Controller
                control={control}
                name="expectedCloseDate"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    minDate={new Date()}
                  />
                )}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
export default AddDeal;

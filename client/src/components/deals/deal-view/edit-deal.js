import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { editDeal, getCompaniesList } from '../../../actions';
import XCloseButton from '../../buttons/xCloseButton';
import EditButton from '../../buttons/editButton';

const dealSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name for the deal'),
  amount: Yup.number().typeError('Please enter a deal amount'),
  company: Yup.string(),
});

function EditDeal(props) {
  const { deal, handleEditDeal } = props;
  const dispatch = useDispatch();
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dealSchema),
    defaultValues: { expectedCloseDate: new Date(deal.expectedCloseDate), company: deal.company._id },
  });
  const companiesList = useSelector(({ companiesList }) => companiesList);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // loads all deals on initial render
    dispatch(getCompaniesList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCompaniesList]);

  const submitDealEdit = (data) => {
    setShow(false);
    handleEditDeal(deal._id, data);
  };

  const onClose = () => {
    setShow(false);
    reset();
  };

  const formFields = ['Name', 'Amount'];

  return (
    <>
      <EditButton onClick={() => setShow(true)} />

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Edit deal</Modal.Title>
          <XCloseButton onClose={onClose} />
        </Modal.Header>
        <form onSubmit={handleSubmit(submitDealEdit)}>
          <Modal.Body>
            {formFields.map((field) => (
              <div key={field}>
                <div className="form-group">
                  <label>{field}</label>
                  <input
                    className="form-control"
                    defaultValue={deal[field.toLowerCase()]}
                    name={field.toLowerCase()}
                    {...register(field.toLowerCase())}
                  />
                  {errors[field.toLowerCase()]?.message}
                </div>
                <br />
              </div>
            ))}
            <div className="form-section">
              <label htmlFor="expectedCloseDate" className="form-label">
                Expected Close Date
              </label>
              <br />
              <Controller
                control={control}
                name="expectedCloseDate"
                defaultValue={deal.expectedCloseDate}
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
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditDeal;

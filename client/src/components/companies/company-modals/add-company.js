import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postNewCompany, resetNewCompany } from '../../../actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';
import '../companies-view-style.css';
import axios from 'axios';
import { companySchema } from './companyHelpers';
import XCloseButton from '../../buttons/xCloseButton';

function AddCompany() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  const newCompany = useSelector(({ newCompany }) => newCompany);
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [searchingByUrl, setSearchingByUrl] = useState(true);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [badSearch, setBadSearch] = useState(false);
  const apiKey = process.env.REACT_APP_BIGPICTURE_API_KEY;
  const apiHeaders = { headers: { Authorization: `${apiKey}` } };

  const failedSearch = () => {
    setShow(true);
    setSearchingByUrl(false);
    setBadSearch(true);
  };

  const handleCompanyAdd = async (data) => {
    if (searchingByUrl) {
      axios
        .get(
          `https://company.bigpicture.io/v1/companies/find?domain=${data.url}`,
          apiHeaders
        )
        .then((formPreFill) => {
          if (formPreFill.status === 202) {
            failedSearch();
            return;
          }
          const dataForForm = {
            name: formPreFill.data.name,
            phone: formPreFill.data.phone,
            city: formPreFill.data.geo?.city,
            state: formPreFill.data.geo?.stateCode,
            industry: formPreFill.data.category.industry,
            logo: formPreFill.data.logo,
            url: formPreFill.data.url,
          };
          setShow(true);
          setSearchingByUrl(false);
          reset(dataForForm);
          setPreviewImageUrl(dataForForm.logo);
        })
        .catch((err) => {
          failedSearch();
        });
      return;
    }
    setBadSearch(false);
    dispatch(postNewCompany(data));
    // reset()
    // setShow(false);
  };

  useEffect(() => {
    if (newCompany.isSuccessful) {
      history.push(`/companies/${newCompany.newCompanyId}`);
      dispatch(resetNewCompany());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompany]);

  const onClose = () => {
    setShow(false);
    reset();
  };

  const formFields = searchingByUrl
    ? ['url']
    : ['Name', 'Owner', 'Phone', 'City', 'State', 'Industry', 'Logo', 'url'];

  const addCompanyForm = () =>
    formFields.map((field) => (
      <div key={field}>
        <div className="form-group">
          <label>{field}</label>
          <input
            className="form-control"
            placeholder={
              searchingByUrl ? 'e.g. walmart.com' : `Enter Company ${field}`
            }
            name={field.toLowerCase()}
            {...register(field.toLowerCase())}
          />
          {field === 'Logo' ? <img src={previewImageUrl} alt="" /> : null}
          {errors[field.toLowerCase()]?.message}
        </div>
        <br />
      </div>
    ));

  return (
    <>
      <div className="container-fluid ">
        <div className="row col-12 d-flex justify-content-end">
          <div className="col ">
            <Button
              className="add-company-button"
              onClick={() => setShow(true)}
            >
              Add a Company
            </Button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>Add a new Company</Modal.Title>
          <XCloseButton onClose={onClose} />
        </Modal.Header>
        <form onSubmit={handleSubmit(handleCompanyAdd)}>
          <Modal.Body>
            {badSearch
              ? 'No result for that domain. Enter details below.'
              : null}
            {searchingByUrl
              ? "Let us find your new client's info. Enter their website domain:"
              : null}
            <br />
            {addCompanyForm()}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchingByUrl(!searchingByUrl);
              }}
            >
              {searchingByUrl ? 'Skip' : 'back to search'}
            </Button>
            <Button type="submit" variant="primary">
              {searchingByUrl ? 'Search' : 'Submit'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddCompany;

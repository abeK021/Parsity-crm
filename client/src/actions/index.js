import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const GET_COMPANY = "GET_COMPANY";
export const GET_DEALS = "GET_DEALS";
export const POST_COMPANY = "POST_COMPANY";
export const PUT_DEAL = "PUT_DEAL";
export const EDIT_COPMANY = "EDIT_COPMANY";
export const POST_DEAL = "POST_DEAL";
export const RESET_NEW_COMPANY = "RESET_NEW_COMPANY";

export function getCompanies(pageNumber) {
  return axios.get(`/companies?page=${pageNumber}`)
  .then(response => {
    return {
      type: GET_COMPANIES,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};

export function getDeals() {
  return axios.get(`/deals/by-stage`)
  .then(response => {
    return {
      type: GET_DEALS,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};

//will need to pass in current page number, and then apply it the .then(() => getCompanies). Currently if on page 2, and no param passed to getCompanies after adding a new company, first 5 companies will be displayed and current page will not be maintained. May want to default to last page so the newly added company is displayed.
export function postNewCopmany(newCompany) {
  return axios.post(`/companies`, newCompany)
  .then(response => {
    return {
      type: POST_COMPANY,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};

export function resetNewCompany() {
  return {
    type: RESET_NEW_COMPANY
  }
}

export function postNewDeal(newDeal) {
  debugger;
  return axios.post(`/deals`, newDeal)
  .then(response => {
    return {
      type: POST_DEAL,
      payload: response
    }; 
  })
  .then(() => getDeals())
  .catch(error => {
    alert('Error');
  });
};

export function putDeal(id, updatedStage) {
  return axios.put(`/deals/${id}`, {stage: updatedStage})
  .then(response => {
    return {
      type: PUT_DEAL
      }
    }
  )
  .then(() => getDeals())
  .catch(error => {alert('Error')});
};

export function editDeal(updatedDeal) {
  console.log(updatedDeal)
 /*  return axios.put(`/deals/${id}`, {stage: updatedStage})
  .then(response => {
    return {
      type: PUT_DEAL
      }
    }
  )
  .then(() => getDeals())
  .catch(error => {alert('Error')}); */
};

export function getCompanyById(_id) {
  return axios.get(`/companies/${_id}`)
  .then(response => {
    return {
      type: GET_COMPANY,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error, that company does not exist');
  });
};

export function editCopmany(updatedInfo, id) {
  debugger;
  return axios.put(`/companies/${id}`, updatedInfo)
  .then(()=>getCompanyById(id))
  .catch(error => {
    alert('Error');
  });
};

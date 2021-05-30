import { Modal, Button, Form, useDropdownMenu } from 'react-overlays';
import styled from 'styled-components';
import Dropdown from 'react-overlays/Dropdown'


const CompanyMenu = ({ role, companiesList }) => {
  const { show, onClose, props } = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });
  return (
    <>
      <div key ="Company">
        <div className="form-group" >
          <label>Company</label>
          <select className="form-control" id="sel1">
            {companiesList.map(company => {
              return (
                    <option key={company.id}>{company.name}</option>
              );
            })}
          </select>
        </div>
        <br />
      </div>
    </>
  );
};

export default CompanyMenu
                  
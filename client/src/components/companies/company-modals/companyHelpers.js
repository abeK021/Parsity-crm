import * as Yup from 'yup';

export const companySchema = Yup.object().shape({
  name: Yup.string(),
  owner: Yup.string(),
  phone: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  industry: Yup.string(),
  logo: Yup.string().url(),
  url: Yup.string(),
});

export const defaultFormFields = [
  'Name',
  'Owner',
  'Phone',
  'City',
  'State',
  'Industry',
  'Logo',
  'url',
];

import { ContactType } from '../utils/ContactUtils';

export default interface ContactModel {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  type: ContactType;
}
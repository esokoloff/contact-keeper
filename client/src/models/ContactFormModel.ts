import { ContactType } from '../utils/ContactUtils';

export default interface ContactFormModel {
  name: string;
  email?: string;
  phone?: string;
  type: ContactType;
}
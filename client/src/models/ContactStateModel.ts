import ContactModel from './ContactModel';

export default interface ContactStateModel {
  contacts: ContactModel[];
  current: ContactModel;
  filtered: ContactModel[];
  error: string;
  loading?: boolean;
}

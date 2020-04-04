import ContactFormModel from "../models/ContactFormModel";
import ContactModel from "../models/ContactModel";
import ContactStateModel from "../models/ContactStateModel";

export enum ContactType {
  PERSONAL = "PERSONAL",
  PROFESSIONAL = "PROFESSIONAL"
}

export interface ContactContextProps extends ContactStateModel {
  addContact: (data: ContactFormModel) => void;
  updateContact: (contact: ContactModel) => void;
  deleteContact: (id: string) => void;
  setCurrent: (contact: ContactModel) => void;
  clearCurrent: () => void;
  filterContacts: (text: string) => void;
  clearFilter: () => void;
  getContacts: () => Promise<void>;
  clearContacts: () => void;
}
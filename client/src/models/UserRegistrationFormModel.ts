import UserRegistrationModel from "./UserRegistrationModel";

export default interface UserRegistrationFormModel extends UserRegistrationModel {
  passwordConfirm: string;
}

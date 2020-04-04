import UserRegistrationModel from "../models/UserRegistrationModel";
import UserLoginModel from "../models/UserLoginModel";
import LoadedUserModel from "../models/LoadedUserModel";

export interface AuthContextProps {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: LoadedUserModel;
  error: string;
  registerUser: (data: UserRegistrationModel) => Promise<void>;
  clearErrors: () => void;
  loadUser: () => Promise<void>;
  loginUser: (data: UserLoginModel) => Promise<void>
  logoutUser: () => void;
}
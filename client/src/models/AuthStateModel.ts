import LoadedUserModel from './LoadedUserModel';

export default interface AuthStateModel {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: LoadedUserModel;
  error: string;
}

import AlertStateModel from '../models/AlertStateModel';

export interface AlertContextProps {
  alerts: AlertStateModel[];
  setAlert: (msg: string, type: string, timeout?: number) => void;
}

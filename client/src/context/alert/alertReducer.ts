import { AlertAction } from '../types';
import AlertStateModel from '../../models/AlertStateModel';

const alertReducer = (
  state: AlertStateModel[],
  action: AlertAction
): AlertStateModel[] => {
  switch (action.type) {
    case 'SET_ALERT': {
      return state.map(alert => alert.msg).includes(action.payload.msg)
        ? state
        : [...state, action.payload];
    }
    case 'REMOVE_ALERT': {
      return state.filter(alert => alert.id !== action.payload);
    }

    default:
      return state;
  }
};

export default alertReducer;

import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AlertStateModel from '../../models/AlertStateModel';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';

const AlertState = (props: any) => {
  const initialState = [] as AlertStateModel[];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg: string, type: string, timeout = 5000) => {
    const id = uuid();

    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type, id }
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ALERT',
        payload: id
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

import { createContext } from 'react';
import { AlertContextProps } from '../../utils/AlertUtils';

const alertContext = createContext({} as AlertContextProps);

export default alertContext;
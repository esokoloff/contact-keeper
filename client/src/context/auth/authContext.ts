import { createContext } from 'react';
import { AuthContextProps } from '../../utils/AuthUtils';


const authContext = createContext({} as AuthContextProps)

export default authContext;
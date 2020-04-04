import { createContext } from 'react'
import { ContactContextProps } from '../../utils/ContactUtils';

const contactContext = createContext({} as ContactContextProps);

export default contactContext;
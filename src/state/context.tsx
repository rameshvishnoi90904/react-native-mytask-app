
import { createContext } from 'react';
import { dispatchActionType, task } from '../utils/types';

export type AppContextType = {
    tasks: task[];
    dispatch: (action: dispatchActionType) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
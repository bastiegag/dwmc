import { createContext } from 'react';

import { DateContextType } from 'types';

export const DateContext = createContext<DateContextType | null>(null);

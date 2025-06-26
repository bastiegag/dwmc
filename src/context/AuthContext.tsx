import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface IAuthContext {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<IAuthContext['user']>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

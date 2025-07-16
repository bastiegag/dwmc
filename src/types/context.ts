import { User } from 'firebase/auth';

import { TransactionItem, CategoryItem } from 'types';

export interface DateContextType {
	current: Date;
	setCurrent: React.Dispatch<React.SetStateAction<DateContextType['current']>>;
	month: number;
	year: number;
	label: string;
}

export interface DataContextType {
	transactions: TransactionItem[] | undefined;
	categories: CategoryItem[] | undefined;
	rawCategories: CategoryItem[] | undefined;
	isLoading: boolean;
	error: Error | null;
}

export interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<AuthContextType['user']>>;
}

export interface AlertContextType {
	alert: {
		open: boolean;
		type: 'success' | 'info' | 'warning' | 'error';
		code?: string;
		message?: string;
	};
	setAlert: React.Dispatch<React.SetStateAction<AlertContextType['alert']>>;
}

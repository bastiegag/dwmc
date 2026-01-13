import type { User } from 'firebase/auth';
import type { Dayjs } from 'dayjs';

import type { TransactionItem, CategoryItem, WalletItem } from 'types';

export interface DateContextType {
	current: Date;
	setCurrent: (date: Date) => void;
	month: number;
	year: number;
	min: Dayjs;
	max: Dayjs;
	label: string;
}

export interface DataContextType {
	transactions: TransactionItem[] | undefined;
	categories: CategoryItem[] | undefined;
	wallets: WalletItem[] | undefined;
	rawCategories: CategoryItem[] | undefined;
	isLoading: boolean;
	error: Error | null;
}

export interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

export interface Alert {
	open: boolean;
	type: 'success' | 'info' | 'warning' | 'error';
	code?: string;
	message?: string;
}

export interface AlertContextType {
	alert: Alert;
	setAlert: (alert: Alert) => void;
	setAlertWithMessage: (
		type: Alert['type'],
		message: string,
		code?: string
	) => void;
}

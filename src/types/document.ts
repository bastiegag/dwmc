export interface CategoryItem {
	color?: string;
	icon?: string;
	id: string;
	name: string;
	section?: string;
	type: string;
}

export interface Category {
	id: string;
	items: CategoryItem[];
	uid: string;
}

export interface TransactionItem {
	amount: number;
	category: string;
	date: string;
	from?: string;
	id: string;
	note?: string;
	to?: string;
	type: number;
}

export interface Transaction {
	id: string;
	items: TransactionItem[];
	month: number;
	uid: string;
}

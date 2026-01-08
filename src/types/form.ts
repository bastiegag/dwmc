import type { Dispatch, SetStateAction } from 'react';

export interface FieldChoice {
	name: string;
	value: string;
}

export interface FieldData {
	choices?: FieldChoice[];
	drawerTitle?: string;
	hidden?: string[];
	icon?: string;
	label?: string;
	name: string;
	required?: boolean;
	type: string;
}

export interface FieldProps {
	data: FieldData;
	hiddenValue: string;
	values: Record<string, string> | undefined;
}

export interface FormProps {
	title: string;
	values?: Record<string, string>;
	open: boolean;
	anchor?: 'bottom' | 'right';
	createNew?: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

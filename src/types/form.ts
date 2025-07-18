export interface FieldData {
	choices?: { name: string; value: string }[];
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
	values: Record<string, string | number | boolean> | undefined;
}

export interface FormProps {
	title: string;
	values?: Record<string, string | number | boolean>;
	open: boolean;
	anchor?: 'bottom' | 'right';
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

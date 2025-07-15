export interface FormProps {
	title: string;
	values?: Record<string, string>;
	open: boolean;
	anchor?: 'bottom' | 'right';
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

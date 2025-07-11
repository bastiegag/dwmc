export interface FormProps {
	title: string;
	values?: Record<string, string>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

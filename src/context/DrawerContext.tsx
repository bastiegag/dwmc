import { createContext } from 'react';

export type DrawerAction = {
	type: string;
	title?: string;
	values?: Record<string, string | number | boolean>;
};

export type DrawerState = {
	open: boolean;
	title: string;
	fullScreen?: boolean;
	content?: React.ReactNode;
};

export type DrawerContextType = {
	drawer: DrawerState;
	dispatchDrawer: React.Dispatch<DrawerAction>;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

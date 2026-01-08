import type { WalletItem } from 'types';

export const getWallet = (
	data: WalletItem[],
	id: string = 'default'
): WalletItem | undefined =>
	data.find((wallet) => wallet.id === id) ||
	data.find((wallet) => wallet.id === 'default');

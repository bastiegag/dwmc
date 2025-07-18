import { WalletItem } from 'types';

export const getWallet = (
	data: WalletItem[],
	id: string = 'default'
): WalletItem | undefined => {
	const wallet = data.find((wallet) => wallet.id === id);

	if (!wallet) {
		return data.find((wallet) => wallet.id === 'default');
	}

	return wallet;
};

import { WalletItem } from 'hooks/useWallets';

export const getWallet = (
	data: WalletItem[],
	id: string | number = 'default'
): WalletItem | undefined => {
	const wallet = data.find((wallet) => wallet.id === id);
	if (!wallet) return;

	return wallet;
};

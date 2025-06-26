import { useEffect } from 'react';
import {
	QueryKey,
	useQuery,
	useQueryClient,
	UseQueryOptions
} from '@tanstack/react-query';

interface UseRealtimeQueryProps<T> {
	queryKey: QueryKey;
	subscribeFn: (
		onData: (data: T) => void,
		onError: (err: unknown) => void
	) => (() => void) | void;
	initialData?: T;
}

export function useRealtimeQuery<T = unknown>({
	queryKey,
	subscribeFn,
	initialData
}: UseRealtimeQueryProps<T>) {
	const queryClient = useQueryClient();

	useEffect(() => {
		const unsubscribe = subscribeFn(
			(data: T) => {
				queryClient.setQueryData(queryKey, data);
			},
			(err: unknown) => {
				console.error('Real-time query error:', err);
				queryClient.invalidateQueries({ queryKey });
			}
		);

		return () => {
			if (typeof unsubscribe === 'function') unsubscribe();
		};
	}, [queryClient, queryKey, subscribeFn]);

	return useQuery<T>({
		queryKey,
		// Since real-time updates come through the subscription,
		// we just return the initial data or latest cached value
		queryFn: async () => {
			const cached = queryClient.getQueryData<T>(queryKey);
			if (cached !== undefined) return cached;
			if (initialData !== undefined) return initialData;
			throw new Error('No data available');
		},
		initialData
	} as UseQueryOptions<T>);
}

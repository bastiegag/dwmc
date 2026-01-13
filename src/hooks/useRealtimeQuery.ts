import { useEffect } from 'react';
import {
	useQuery,
	useQueryClient,
	type QueryKey,
	type UseQueryOptions
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
				console.error('Real-time query error:', err, queryKey);
				queryClient.invalidateQueries({ queryKey });
			}
		);

		return () => {
			if (typeof unsubscribe === 'function') unsubscribe();
		};
	}, [queryClient, queryKey, subscribeFn]);

	return useQuery<T>({
		queryKey,
		queryFn: async () => {
			const cached = queryClient.getQueryData<T>(queryKey);
			if (cached !== undefined) return cached;
			if (initialData !== undefined) return initialData;
			throw new Error('No data available');
		},
		initialData
	} as UseQueryOptions<T>);
}

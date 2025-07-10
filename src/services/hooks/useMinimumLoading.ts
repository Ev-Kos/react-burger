import { useState, useCallback } from 'react';

export const useMinimumLoading = (minDelay: number) => {
	const [isLoading, setIsLoading] = useState(false);

	const executeWithLoading = useCallback(
		async <T>(operation: () => Promise<T>): Promise<T> => {
			const startTime = Date.now();
			setIsLoading(true);

			try {
				return await operation();
			} finally {
				const elapsedTime = Date.now() - startTime;
				const remainingTime = Math.max(minDelay - elapsedTime, 0);

				setTimeout(() => setIsLoading(false), remainingTime);
			}
		},
		[minDelay]
	);

	return [isLoading, executeWithLoading];
};

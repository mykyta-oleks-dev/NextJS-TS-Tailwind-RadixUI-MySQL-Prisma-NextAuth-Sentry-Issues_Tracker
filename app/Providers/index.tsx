'use client';

import { Theme } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import AuthProvider from '../auth/Provider';
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<AuthProvider>
			<QueryProvider>
				<Theme accentColor="violet">{children}</Theme>
				<ReactQueryDevtools />
			</QueryProvider>
		</AuthProvider>
	);
};

export default Providers;

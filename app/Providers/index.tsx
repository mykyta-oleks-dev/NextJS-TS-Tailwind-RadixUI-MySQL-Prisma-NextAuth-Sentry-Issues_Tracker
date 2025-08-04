'use client';

import { Theme } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';
import AuthProvider from '../auth/Provider';
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<AuthProvider>
			<QueryProvider>
				<Theme accentColor="violet">
					{children}
					<Toaster />
				</Theme>
				<ReactQueryDevtools />
			</QueryProvider>
		</AuthProvider>
	);
};

export default Providers;

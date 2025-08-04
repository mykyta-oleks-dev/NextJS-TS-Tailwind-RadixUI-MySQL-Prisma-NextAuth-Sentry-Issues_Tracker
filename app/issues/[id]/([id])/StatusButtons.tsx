'use client';

import { Status } from '@/app/generated/prisma';
import issuesService from '@/app/services/IssuesService';
import StatusMap from '@/app/services/statusMap';
import {
	AlertDialog,
	Box,
	Button,
	Flex,
	Spinner,
	Text,
} from '@radix-ui/themes';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StatusButtons = ({
	issueId,
	status,
}: {
	issueId: number;
	status: Status;
}) => {
	const router = useRouter();
	const { status: authStatus } = useSession();
	const [isLoadingStatus, setIsLoadingStatus] = useState<Status | null>(null);
	const [error, setError] = useState<string>('');

	const onClickStatusChange = async (value: Status) => {
		if (value === status || authStatus === 'loading') return;

		if (authStatus === 'unauthenticated') {
			await signIn();
		}

		try {
			setIsLoadingStatus(value);

			const { request } = issuesService.update(
				issueId,
				{ status: value },
				{}
			);

			await request;

			router.refresh();
		} catch (err: unknown) {
			console.error(err);

			if (err instanceof Error) setError(err.message);
			else setError('An unexpected error occured');
		} finally {
			setIsLoadingStatus(null);
		}
	};

	const statuses = Object.keys(Status) as Status[];
	return (
		<Box>
			<Text>Set status to:</Text>
			<Flex gap="2" direction="column">
				{statuses.map((s) => {
					const map = StatusMap[s];

					return (
						<Button
							key={s}
							onClick={() => void onClickStatusChange(s)}
							color={map.color}
							disabled={status === s || isLoadingStatus === s}
						>
							{map.label}{' '}
							<Spinner loading={isLoadingStatus === s} />
						</Button>
					);
				})}
			</Flex>

			<AlertDialog.Root open={!!error}>
				<AlertDialog.Content maxWidth="450px">
					<AlertDialog.Title>Error!</AlertDialog.Title>
					<AlertDialog.Description size="2">
						{error}
					</AlertDialog.Description>
					<Flex mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button
								variant="soft"
								color="gray"
								onClick={() => setError('')}
							>
								Close
							</Button>
						</AlertDialog.Cancel>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Box>
	);
};

export default StatusButtons;

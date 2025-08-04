'use client';

import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes';
import { TiDeleteOutline } from 'react-icons/ti';
import issuesService from '@/app/services/IssuesService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);
			const { request } = issuesService.delete(issueId, {});
			await request;

			router.push('/issues');
			router.refresh();
		} catch (err: unknown) {
			setIsLoading(false);
			toast.error((err as Error).message ?? 'Unexpected error occured');
		}
	};

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="red" disabled={isLoading}>
					Delete
					<Spinner loading={isLoading}>
						<TiDeleteOutline size="1.25em" />
					</Spinner>
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content maxWidth="450px">
				<AlertDialog.Title>Delete issue</AlertDialog.Title>
				<AlertDialog.Description size="2">
					Are you sure you want to remove the issue from the
					application? It can not be undone.
				</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<AlertDialog.Cancel>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button
							variant="solid"
							color="red"
							onClick={() => void onClick()}
						>
							Delete
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default DeleteButton;

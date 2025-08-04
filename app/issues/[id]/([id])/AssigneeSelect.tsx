'use client';

import { Issue } from '@/app/generated/prisma';
import issuesService from '@/app/services/IssuesService';
import useUsers from '@/app/hooks/useUsers';
import { Select, Text } from '@radix-ui/themes';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { status: authStatus } = useSession();
	const { data: users, error, isPending: isLoading } = useUsers();

	const { id, assignedToUserId } = issue;

	if (isLoading) {
		return (
			<>
				<Text>Assigned to:</Text>
				<Select.Root disabled>
					<Select.Trigger placeholder="Loading..." />
				</Select.Root>
			</>
		);
	}

	if (error) {
		return (
			<Text as="p">
				{error?.message ?? 'Unexpected error encountered'}
			</Text>
		);
	}

	const handleValueChange = async (userId: string) => {
		if (userId === assignedToUserId || authStatus === 'loading') return;

		if (authStatus === 'unauthenticated') {
			await signIn();
		}

		try {
			const { request } = issuesService.update(
				id,
				{
					assignedToUserId:
						!userId || userId === 'null' ? null : userId,
				},
				{}
			);

			await request;
		} catch (err: unknown) {
			console.error(err);
			toast.error((err as Error).message ?? 'Unexpected error occured');
		}
	};

	return (
		<>
			<Text>Assigned to:</Text>
			<Select.Root
				onValueChange={(value) => void handleValueChange(value)}
				defaultValue={assignedToUserId ?? 'null'}
			>
				<Select.Trigger placeholder="Assign..." />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value="null">None</Select.Item>
						<Select.Separator />
						{users.map((u) => (
							<Select.Item key={u.id} value={u.id}>
								{u.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
};

export default AssigneeSelect;

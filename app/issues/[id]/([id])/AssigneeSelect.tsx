'use client';

import useUsers from '@/app/hooks/useUsers';
import { Select, Text } from '@radix-ui/themes';

const AssigneeSelect = () => {
	const { data: users, error, isPending: isLoading } = useUsers();

	if (isLoading) {
		return (
			<Select.Root disabled>
				<Select.Trigger placeholder="Loading..." />
			</Select.Root>
		);
	}

	if (error) {
		return (
			<Text as="p">
				{error?.message ?? 'Unexpected error encountered'}
			</Text>
		);
	}

	return (
		<>
			<Text>Assigned to:</Text>
			<Select.Root>
				<Select.Trigger placeholder="Assign..." />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
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

'use client';

import { Issue } from '@/app/generated/prisma';
import { Button, Flex, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import { RxPencil2 } from 'react-icons/rx';
import AssigneeSelect from './AssigneeSelect';
import DeleteButton from './DeleteButton';
import StatusButtons from './StatusButtons';

const Actions = ({ issue }: { issue: Issue }) => {
	const { id, status } = issue;
	return (
		<Flex direction="column" gap="2">
			<StatusButtons issueId={id} status={status} />

			<Separator size="4" my="2" />

			<AssigneeSelect issue={issue} />

			<Separator size="4" my="2" />

			<Button asChild>
				<Link href={`/issues/${id}/edit`}>
					Edit <RxPencil2 />
				</Link>
			</Button>

			<DeleteButton issueId={id} />
		</Flex>
	);
};

export default Actions;

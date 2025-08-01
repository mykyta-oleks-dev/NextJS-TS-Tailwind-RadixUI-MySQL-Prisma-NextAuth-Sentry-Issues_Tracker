'use client';

import { Status } from '@/app/generated/prisma';
import { Button, Flex, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import { RxPencil2 } from 'react-icons/rx';
import DeleteButton from './DeleteButton';
import StatusButtons from './StatusButtons';

const Actions = ({ issueId, status }: { issueId: number; status: Status }) => {
	return (
		<Flex direction="column" gap="2">
			<StatusButtons issueId={issueId} status={status} />

			<Separator size="4" my="2" />

			<Button asChild>
				<Link href={`/issues/${issueId}/edit`}>
					Edit <RxPencil2 />
				</Link>
			</Button>

			<DeleteButton issueId={issueId} />
		</Flex>
	);
};

export default Actions;

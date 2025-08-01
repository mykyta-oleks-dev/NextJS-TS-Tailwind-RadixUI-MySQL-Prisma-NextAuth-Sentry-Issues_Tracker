'use client';

import { Status } from '@/app/generated/prisma';
import issuesService from '@/app/services/IssuesService';
import StatusMap from '@/app/services/statusMap';
import { Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RxPencil2 } from 'react-icons/rx';

const Actions = ({ issueId, status }: { issueId: number; status: Status }) => {
	const router = useRouter();

	const onClickStatusChange = async (value: Status) => {
		if (value === status) return;

		const { request } = issuesService.updateStatus(
			issueId,
			{ status: value },
			{}
		);
		const response = await request;

		if (response.status >= 400) return;

		router.refresh();
	};

	const statuses = Object.keys(Status) as Status[];

	return (
		<Flex direction="column" gap="2">
			<Button asChild color="orange" mb="2">
				<Link href={`/issues/${issueId}/edit`}>
					<RxPencil2 />
					Edit
				</Link>
			</Button>

			<Text>Set status to:</Text>
			<Flex gap="2" direction="column">
				{statuses.map((s) => {
					const map = StatusMap[s];

					return (
						<Button
							key={s}
							onClick={() => void onClickStatusChange(s)}
							color={map.color}
							disabled={status === s}
						>
							{map.label}
						</Button>
					);
				})}
			</Flex>
		</Flex>
	);
};

export default Actions;

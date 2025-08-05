import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { Status } from '../generated/prisma';

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
	const containers: { label: string; value: number; status: Status }[] = [
		{ label: 'Open issues', value: open, status: 'OPEN' },
		{
			label: 'Issues in progress',
			value: inProgress,
			status: 'IN_PROGRESS',
		},
		{ label: 'Closed issues', value: closed, status: 'CLOSED' },
	];

	return (
		<Flex gap="5" justify="between">
			{containers.map((c) => (
				<Card key={c.status} asChild>
					<Link href={`/issues?status=${c.status}`}>
						<Flex direction="column">
							<Text className="text-sm font-medium">
								{c.label}
							</Text>
							<Text size="5" className="font-bold">
								{c.value}
							</Text>
						</Flex>
					</Link>
				</Card>
			))}
		</Flex>
	);
};

export default IssuesSummary;

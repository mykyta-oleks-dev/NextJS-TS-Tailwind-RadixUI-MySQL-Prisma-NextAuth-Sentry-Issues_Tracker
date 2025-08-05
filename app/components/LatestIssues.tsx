import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import StatusBadge from './StatusBadge';

const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: 'desc' },
		take: 5,
		include: {
			assignedToUser: true,
		},
	});
	return (
		<Card className="h-full">
			<Heading mb="5">Latest issues</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((i) => (
						<Table.Row key={i.id}>
							<Table.Cell>
								<Flex justify="between" align="center">
									<Flex
										direction="column"
										align="start"
										gap="1"
									>
										<Link href={`/issues/${i.id}`}>
											{i.title}
										</Link>
										<StatusBadge status={i.status} />
									</Flex>
									{i.assignedToUser && (
										<Avatar
											src={i.assignedToUser.image!}
											alt="assigned-user-profile-picture"
											size="2"
											radius="full"
											fallback="?"
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssues;

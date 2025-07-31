import prisma from '@/prisma/client';
import { Table, Text } from '@radix-ui/themes';
import { Link, StatusBadge } from '../components';
import IssuesActions from './IssuesActions';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<IssuesActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Created at
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((i) => (
						<Table.Row key={i.id}>
							<Table.Cell>
								<Link href={`/issues/${i.id}`}>
									<Text>{i.title}</Text>
									<Text className="block md:hidden">
										Status:{' '}
										<StatusBadge status={i.status} />
									</Text>
									<Text className="block md:hidden">
										Created At:{' '}
										{i.createdAt.toLocaleString()}
									</Text>
								</Link>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<StatusBadge status={i.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{i.createdAt.toLocaleString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

import { Table } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import Skeleton from '@/app/components/Skeleton';

const LoadingIssuesPage = () => {
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
					{[1, 2, 3, 4, 5, 6].map((n) => (
						<Table.Row key={n}>
							<Table.Cell>
								<Skeleton />
								<div className="block md:hidden">
									<Skeleton />
									<Skeleton />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default LoadingIssuesPage;

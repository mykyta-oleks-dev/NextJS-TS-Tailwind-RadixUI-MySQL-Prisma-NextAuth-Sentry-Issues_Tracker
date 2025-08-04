import { StatusBadge } from '@/app/components';
import { Issue, Status } from '@/app/generated/prisma';
import { Table, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { RxArrowDown, RxArrowUp } from 'react-icons/rx';
import { OrderType } from './page';

interface Props {
	issues: Issue[];

	searchParams: SearchParams;
}

const IssuesTable = ({ issues, searchParams }: Props) => {
	const { orderBy, orderType } = searchParams;

	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{headerCells.map((hc) => (
						<Table.ColumnHeaderCell
							key={hc.key}
							className={hc.className}
						>
							<Link
								href={{
									query: {
										...searchParams,
										orderBy: hc.key,
										orderType:
											orderBy === hc.key &&
											orderType === 'asc'
												? 'desc'
												: 'asc',
									},
								}}
							>
								{hc.label}
							</Link>
							{hc.key === orderBy &&
								(orderType === 'asc' ? (
									<RxArrowUp className="inline" />
								) : (
									<RxArrowDown className="inline" />
								))}
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{issues.map((i) => (
					<Table.Row key={i.id}>
						<Table.Cell>
							<Link href={`/issues/${i.id}`}>
								<Text>{i.title}</Text>
								<Text className="block md:hidden">
									Status: <StatusBadge status={i.status} />
								</Text>
								<Text className="block md:hidden">
									Created At: {i.createdAt.toLocaleString()}
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
	);
};

export const headerCells: {
	key: keyof Issue;
	label: string;
	className?: string;
}[] = [
	{ key: 'title', label: 'Issue' },
	{ key: 'status', label: 'Status', className: 'hidden md:table-cell' },
	{
		key: 'createdAt',
		label: 'Created At',
		className: 'hidden md:table-cell',
	},
];

export type SearchParams = {
	status?: Status;
	orderBy?: keyof Issue;
	orderType?: OrderType;
	page?: string;
	pageSize?: string;
};

export default IssuesTable;

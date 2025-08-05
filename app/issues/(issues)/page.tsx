import { Prisma, Status } from '@/app/generated/prisma';
import prisma from '@/prisma/client';
import { Box } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import IssuesTable, { headerCells } from './IssuesTable';
import { Metadata } from 'next';
import { orderTypes, SearchParams } from './types';

export const metadata: Metadata = {
	title: 'Issues Tracker - Issues table',
	description: 'View all project issues',
};

interface Props {
	searchParams: Promise<SearchParams>;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const search = await searchParams;
	const { status, orderBy, orderType } = search;

	const page = parseInt(search.page ?? '1');
	const pageSize = parseInt(search.pageSize ?? '10');

	const whereQuery = {
		status:
			status && Object.values(Status).includes(status)
				? status
				: undefined,
	};

	const orderByQuery: Prisma.IssueOrderByWithRelationInput =
		orderBy && headerCells.map((hc) => hc.key).includes(orderBy)
			? {
					[orderBy]:
						orderType && orderTypes.includes(orderType)
							? orderType
							: 'asc',
				}
			: { createdAt: 'desc' };

	const issues = await prisma.issue.findMany({
		where: whereQuery,
		orderBy: orderByQuery,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const count = await prisma.issue.count({ where: whereQuery });

	return (
		<Box>
			<IssuesActions page={page} pageSize={pageSize} count={count} />
			<IssuesTable issues={issues} searchParams={search} />
		</Box>
	);
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

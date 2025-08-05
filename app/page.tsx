import prisma from '@/prisma/client';
import { Box, Grid, Heading } from '@radix-ui/themes';
import IssuesChart from './components/IssuesChart';
import IssuesSummary from './components/IssuesSummary';
import LatestIssues from './components/LatestIssues';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Issues Tracker - Dashboard',
	description: 'View a summary of project issues',
};

export default async function Home() {
	const openCount = await prisma.issue.count({ where: { status: 'OPEN' } });
	const inProgressCount = await prisma.issue.count({
		where: { status: 'IN_PROGRESS' },
	});
	const closedCount = await prisma.issue.count({
		where: { status: 'CLOSED' },
	});

	return (
		<Box>
			<Heading mb="5">Dashboard</Heading>
			<Grid
				areas={{
					initial: '"summary" "chart" "latest"',
					md: '"summary latest" "chart latest"',
				}}
				columns={{
					initial: '1',
					md: '1fr 1fr',
				}}
				gap="5"
			>
				<Box gridArea="summary">
					<IssuesSummary
						open={openCount}
						inProgress={inProgressCount}
						closed={closedCount}
					/>
				</Box>
				<Box gridArea="chart">
					<IssuesChart
						open={openCount}
						inProgress={inProgressCount}
						closed={closedCount}
					/>
				</Box>
				<Box gridArea="latest">
					<LatestIssues />
				</Box>
			</Grid>
		</Box>
	);
}

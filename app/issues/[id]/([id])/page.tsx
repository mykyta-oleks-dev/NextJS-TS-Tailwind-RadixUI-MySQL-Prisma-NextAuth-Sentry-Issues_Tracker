import prisma from '@/prisma/client';
import { Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Actions from './Actions';
import Details from './Details';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { cache } from 'react';

interface Props {
	params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
	prisma.issue.findUnique({
		where: { id: issueId },
	})
);

const IssueDetailsPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	const id = parseInt((await params).id);

	if (!id) notFound();

	const issue = await fetchUser(id);

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '3fr 1fr' }} gap="5">
			<Details issue={issue} />
			{session && <Actions issue={issue} />}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props) {
	const id = parseInt((await params).id);

	const issue = await fetchUser(id);

	if (!issue)
		return {
			title: 'Issues Tracker - Not Found',
			description: 'The issue is not found in the database',
		};

	return {
		title: 'Issues Tracker - ' + issue.title,
		description: `Details page for an issue "${issue.title}"`,
	};
}

export default IssueDetailsPage;

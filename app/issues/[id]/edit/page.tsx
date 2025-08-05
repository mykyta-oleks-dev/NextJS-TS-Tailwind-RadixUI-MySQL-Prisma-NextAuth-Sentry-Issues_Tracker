import { notFound } from 'next/navigation';
import Edit from './Edit';
import prisma from '@/prisma/client';
import { cache } from 'react';

interface Props {
	params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
	prisma.issue.findUnique({
		where: { id: issueId },
	})
);

const EditIssuePage = async ({ params }: Props) => {
	const id = parseInt((await params).id);

	if (!id) notFound();

	const issue = await fetchUser(id);

	if (!issue) notFound();

	return <Edit issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
	const id = parseInt((await params).id);

	const issue = await fetchUser(id);

	if (!id || !issue)
		return {
			title: 'Issues Tracker - Not Found',
			description: 'The issue is not found in the database',
		};

	return {
		title: `Issues Tracker - Edit issue "${issue.title}"`,
		description: `Editing the "${issue.title}" issue's data`,
	};
}

export default EditIssuePage;

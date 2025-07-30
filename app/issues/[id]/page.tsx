import StatusBadge from '@/app/components/StatusBadge';
import prisma from '@/prisma/client';
import { Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
	const id = parseInt((await params).id);

	if (!id) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue) notFound();

	return (
		<div>
			<Text as="p">Issue {id}</Text>
			<Text as="p">{issue.title}</Text>
			<Text as="p">{issue.description}</Text>
			<Text as="p">
				<StatusBadge status={issue.status} />
			</Text>
			<Text as="p">{issue.createdAt.toLocaleString()}</Text>
		</div>
	);
};

export default IssueDetailsPage;

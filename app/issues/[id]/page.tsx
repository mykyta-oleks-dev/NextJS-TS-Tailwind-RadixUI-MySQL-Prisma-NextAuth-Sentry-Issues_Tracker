import { MarkdownPreview, StatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
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
		<Flex direction="column">
			<Flex gap="2" mb="3" align="center">
				<Heading>{issue.title}</Heading>
				<StatusBadge status={issue.status} />
			</Flex>
			<Text>Created at: {issue.createdAt.toLocaleString()}</Text>
			<Text>Updated at: {issue.updatedAt.toLocaleString()}</Text>
			<Card mt="4">
				<MarkdownPreview>{issue.description}</MarkdownPreview>
			</Card>
		</Flex>
	);
};

export default IssueDetailsPage;

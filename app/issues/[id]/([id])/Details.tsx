import { MarkdownPreview, StatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/prisma';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

const Details = ({ issue }: { issue: Issue }) => {
	return (
		<Box>
			<Flex gap="2" mb="3" align="center">
				<Heading>{issue.title}</Heading>
				<StatusBadge status={issue.status} />
			</Flex>
			<Text as="p">Created at: {issue.createdAt.toLocaleString()}</Text>
			<Text as="p">Updated at: {issue.updatedAt.toLocaleString()}</Text>
			<Card mt="4">
				<MarkdownPreview>{issue.description}</MarkdownPreview>
			</Card>
		</Box>
	);
};

export default Details;

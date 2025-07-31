import { Box, Card, Flex } from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';

const LoadingIssueDetailsPage = () => {
	return (
		<Box>
			<Flex gap="2" mb="3" align="center">
				<Skeleton width={200} />
				<Skeleton width={50} />
			</Flex>
			<Skeleton count={2} width={250} />
			<Card mt="4">
				<Skeleton count={10} />
			</Card>
		</Box>
	);
};

export default LoadingIssueDetailsPage;

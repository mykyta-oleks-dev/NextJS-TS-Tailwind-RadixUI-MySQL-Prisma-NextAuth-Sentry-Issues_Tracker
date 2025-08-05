import {
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Select,
	Separator,
	Text,
} from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';
import { Status } from '@/app/generated/prisma';

const LoadingIssueDetailsPage = () => {
	const statuses = Object.keys(Status) as Status[];

	return (
		<Grid columns={{ initial: '1', md: '3fr 1fr' }} gap="5">
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
			<Box>
				<Text>Set status to:</Text>
				<Flex gap="2" direction="column">
					{statuses.map((s) => {
						return <Button key={s} loading />;
					})}

					<Separator size="4" my="2" />

					<Text>Assigned to:</Text>
					<Select.Root disabled>
						<Select.Trigger placeholder="Loading..." />
					</Select.Root>

					<Separator size="4" my="2" />

					<Button loading />
					<Button loading />
				</Flex>
			</Box>
		</Grid>
	);
};

export default LoadingIssueDetailsPage;

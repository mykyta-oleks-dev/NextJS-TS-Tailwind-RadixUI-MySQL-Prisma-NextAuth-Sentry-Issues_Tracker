import {
	Button,
	Flex,
	IconButton,
	Select,
	Spinner,
	Table,
	Text,
} from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import Skeleton from '@/app/components/Skeleton';
import {
	RxChevronLeft,
	RxChevronRight,
	RxDoubleArrowLeft,
	RxDoubleArrowRight,
} from 'react-icons/rx';

const LoadingIssuesPage = () => {
	return (
		<div>
			<Flex mb="5" justify="between">
				<Button asChild disabled>
					<Text>New Issue</Text>
				</Button>

				<Flex gap="2" align="center">
					<IconButton variant="soft" loading>
						<RxDoubleArrowLeft />
					</IconButton>
					<IconButton variant="soft" loading>
						<RxChevronLeft />
					</IconButton>
					<Text size="2">
						Loading... <Spinner className="inline!" />
					</Text>
					<IconButton variant="soft" loading>
						<RxChevronRight />
					</IconButton>
					<IconButton variant="soft" loading>
						<RxDoubleArrowRight />
					</IconButton>
				</Flex>

				<Select.Root>
					<Select.Trigger placeholder="Loading..." />
				</Select.Root>
			</Flex>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Created at
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{[1, 2, 3, 4, 5, 6].map((n) => (
						<Table.Row key={n}>
							<Table.Cell>
								<Skeleton />
								<div className="block md:hidden">
									<Skeleton />
									<Skeleton />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default LoadingIssuesPage;

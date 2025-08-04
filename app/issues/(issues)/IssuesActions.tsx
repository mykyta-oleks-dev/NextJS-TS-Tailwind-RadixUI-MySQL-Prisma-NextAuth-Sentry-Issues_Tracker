import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssuesFilter from './IssuesFilter';
import Pagination from '@/app/components/Pagination';

const IssuesActions = ({
	count,
	page,
	pageSize,
}: {
	count: number;
	page: number;
	pageSize: number;
}) => {
	return (
		<Flex mb="5" justify="between">
			<Button asChild>
				<Link href="/issues/new">New Issue</Link>
			</Button>

			<Pagination count={count} page={page} pageSize={pageSize} />

			<IssuesFilter />
		</Flex>
	);
};

export default IssuesActions;

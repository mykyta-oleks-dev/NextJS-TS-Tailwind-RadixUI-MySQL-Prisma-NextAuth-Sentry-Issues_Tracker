import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';
import { RxPencil2 } from 'react-icons/rx';

const Actions = ({ issueId }: { issueId: number }) => {
	return (
		<Box>
			<Button asChild>
				<Link href={`/issues/${issueId}/edit`}>
					<RxPencil2 />
					Edit
				</Link>
			</Button>
		</Box>
	);
};

export default Actions;

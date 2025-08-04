import prisma from '@/prisma/client';
import { Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Actions from './Actions';
import Details from './Details';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
	params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	const id = parseInt((await params).id);

	if (!id) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '3fr 1fr' }} gap="5">
			<Details issue={issue} />
			{session && <Actions issue={issue} />}
		</Grid>
	);
};

export default IssueDetailsPage;

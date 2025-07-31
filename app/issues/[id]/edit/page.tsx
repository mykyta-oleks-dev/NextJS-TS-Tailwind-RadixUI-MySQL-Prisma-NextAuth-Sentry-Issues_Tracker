import { notFound } from 'next/navigation';
import Edit from './Edit';
import prisma from '@/prisma/client';

interface Props {
	params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
	const id = parseInt((await params).id);

	if (!id) notFound();

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue) notFound();

	return <Edit issue={issue} />;
};

export default EditIssuePage;

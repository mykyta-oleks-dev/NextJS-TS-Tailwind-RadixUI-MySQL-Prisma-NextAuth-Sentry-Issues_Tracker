import prisma from '@/prisma/client';

const issueFind = async (paramsId: string) => {
	const id = parseInt(paramsId);

	if (!id) return;

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue) return;

	return issue;
};

export default issueFind;

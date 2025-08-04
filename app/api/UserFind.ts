import prisma from '@/prisma/client';

const userFind = async (id?: string | null) => {
	if (!id) return;

	const user = await prisma.user.findUnique({
		where: { id },
	});

	if (!user) return;

	return user;
};

export default userFind;

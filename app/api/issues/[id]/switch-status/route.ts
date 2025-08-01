import AuthCheck from '@/app/api/AuthCheck';
import { Status } from '@/app/generated/prisma';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const authCheck = await AuthCheck();
	if (authCheck) return authCheck;

	const id = parseInt((await params).id);

	if (!id)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const data = (await request.json()) as { status: string };

	const { status } = data;

	if (!statusCheck(status)) {
		return NextResponse.json(
			{ error: 'Wrong status provided' },
			{ status: 400 }
		);
	}

	const updIssue = await prisma.issue.update({
		where: { id },
		data: {
			status,
		},
	});

	return NextResponse.json(updIssue);
}

const statusCheck = (status: string): status is Status => {
	for (const val in Status) {
		if (status === val) return true;
	}

	return false;
};

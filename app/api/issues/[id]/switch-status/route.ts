import AuthCheck from '@/app/api/AuthCheck';
import issueFind from '@/app/api/IssueFind';
import statusCheck from '@/app/api/StatusCheck';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const authErr = await AuthCheck();
	if (authErr) return authErr;

	const issue = await issueFind((await params).id);

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const { id } = issue;

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

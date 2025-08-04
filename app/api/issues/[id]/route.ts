import { UpdateIssueData, updateIssueSchema } from '@/app/validations/issues';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { treeifyError } from 'zod';
import AuthCheck from '../../AuthCheck';
import issueFind from '../../IssueFind';
import userFind from '../../UserFind';

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

	const data = (await request.json()) as UpdateIssueData;

	const validate = updateIssueSchema.safeParse(data);
	if (!validate.success) {
		return NextResponse.json(treeifyError(validate.error), { status: 400 });
	}

	const { title, description, assignedToUserId, status } = data;

	const candidate = await userFind(assignedToUserId);

	if (assignedToUserId && !candidate)
		return NextResponse.json({ error: 'User not found' }, { status: 404 });

	const updIssue = await prisma.issue.update({
		where: { id },
		data: {
			title,
			description,
			assignedToUserId,
			status: status ?? undefined,
		},
	});

	return NextResponse.json(updIssue);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const authErr = await AuthCheck();
	if (authErr) return authErr;

	const issue = await issueFind((await params).id);

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const { id } = issue;

	await prisma.issue.delete({
		where: { id },
	});

	return NextResponse.json({});
}

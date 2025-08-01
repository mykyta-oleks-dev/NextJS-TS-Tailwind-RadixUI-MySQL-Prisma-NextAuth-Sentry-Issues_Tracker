import { createIssueSchema, CreateIssueData } from '@/app/validations/issues';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { treeifyError } from 'zod';

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = parseInt((await params).id);

	if (!id)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const data = (await request.json()) as CreateIssueData;

	const validate = createIssueSchema.safeParse(data);
	if (!validate.success) {
		return NextResponse.json(treeifyError(validate.error), { status: 400 });
	}

	const { title, description } = data;
	console.log({ data });

	const updIssue = await prisma.issue.update({
		where: { id },
		data: {
			title,
			description,
		},
	});

	return NextResponse.json(updIssue);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = parseInt((await params).id);

	if (!id)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	await prisma.issue.delete({
		where: { id },
	});

	return NextResponse.json({});
}

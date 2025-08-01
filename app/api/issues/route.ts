import { CreateIssueData, createIssueSchema } from '@/app/validations/issues';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { treeifyError } from 'zod';
import AuthCheck from '../AuthCheck';

export async function POST(request: NextRequest) {
	const authCheck = await AuthCheck();
	if (authCheck) return authCheck;

	const data = (await request.json()) as CreateIssueData;

	const validate = createIssueSchema.safeParse(data);
	if (!validate.success) {
		return NextResponse.json(treeifyError(validate.error), { status: 400 });
	}

	const { title, description } = data;

	const issue = await prisma.issue.create({
		data: { title, description },
	});

	return NextResponse.json(issue, { status: 201 });
}

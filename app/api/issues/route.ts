import { createIssueSchema, CreateIssueData } from '@/app/validations/issues';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = (await request.json()) as CreateIssueData;

	const validate = createIssueSchema.safeParse(data);
	if (!validate.success) {
		return NextResponse.json(validate.error.issues, { status: 400 });
	}

	const { title, description } = data;

	const issue = await prisma.issue.create({
		data: { title, description },
	});

	return NextResponse.json(issue, { status: 201 });
}

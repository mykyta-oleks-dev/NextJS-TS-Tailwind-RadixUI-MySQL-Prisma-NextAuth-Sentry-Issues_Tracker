import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
	const users = await prisma.user.findMany();

	return NextResponse.json(users);
}

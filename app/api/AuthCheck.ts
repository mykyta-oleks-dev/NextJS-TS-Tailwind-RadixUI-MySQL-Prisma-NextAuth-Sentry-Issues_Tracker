import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import { NextResponse } from 'next/server';

const AuthCheck = async () => {
	const session = await getServerSession(authOptions);

	if (!session)
		return NextResponse.json({ error: 'Not Authorised' }, { status: 401 });
};

export default AuthCheck;

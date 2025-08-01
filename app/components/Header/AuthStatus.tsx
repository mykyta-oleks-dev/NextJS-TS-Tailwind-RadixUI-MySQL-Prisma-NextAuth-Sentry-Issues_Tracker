import { Avatar, Button, DropdownMenu, Flex, Spinner } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AuthStatus = () => {
	const { data: session, status } = useSession();
	return (
		<Flex className="ml-auto" gap="2" align="center" id="auth-box">
			{status === 'authenticated' && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session.user!.image!}
							alt="profile-picture"
							size="2"
							radius="full"
							className="cursor-pointer"
							fallback="?"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>
							{session.user!.email}
						</DropdownMenu.Label>
						<DropdownMenu.Item color="red">
							<Link
								href="/api/auth/signout"
								className="w-full text-center"
							>
								Sign Out
							</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}
			{status === 'loading' && (
				<Spinner>
					<Avatar size="2" fallback="?" />
				</Spinner>
			)}
			{status === 'unauthenticated' && (
				<Button asChild color="green">
					<Link href="/api/auth/signin">Sign In</Link>
				</Button>
			)}
		</Flex>
	);
};

export default AuthStatus;

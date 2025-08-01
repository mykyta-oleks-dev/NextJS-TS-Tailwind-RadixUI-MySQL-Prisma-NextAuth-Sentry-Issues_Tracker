'use client';

import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import HeaderLinks from './components/Header/Links';
import AuthStatus from './components/Header/AuthStatus';

const Header = () => {
	return (
		<header className="mb-3 border-b border-b-zinc-300">
			<nav className="flex gap-9 py-3">
				<Link href="/">
					<AiFillBug size="1.75em" />
				</Link>
				<HeaderLinks />
				<AuthStatus />
			</nav>
		</header>
	);
};

export default Header;

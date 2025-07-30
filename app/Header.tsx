'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const Header = () => {
	const currentPath = usePathname();
	const links = [
		{ href: '/issues', label: 'Issues' },
		{ href: '/about', label: 'About' },
	];

	return (
		<header className="mb-3">
			<nav className="flex gap-9 border-b border-b-zinc-300 px-10 py-3">
				<Link href="/">
					<AiFillBug size="1.75em" />
				</Link>
				<ul className="flex gap-3">
					{links.map((l) => (
						<li key={l.href}>
							<Link
								href={l.href}
								className={
									l.href === currentPath ? 'active' : ''
								}
							>
								{l.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default Header;

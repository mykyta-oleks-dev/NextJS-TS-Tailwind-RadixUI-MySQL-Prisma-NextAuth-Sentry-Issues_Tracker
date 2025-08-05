'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const HeaderLinks = () => {
	const currentPath = usePathname();
	const links = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/issues', label: 'Issues' },
	];
	return (
		<ul className="my-auto flex gap-3">
			{links.map((l) => (
				<li key={l.href}>
					<Link
						href={l.href}
						className={l.href === currentPath ? 'active' : ''}
					>
						{l.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default HeaderLinks;

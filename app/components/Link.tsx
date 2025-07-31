import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	href: string;
	className?: string;
}

const Link = ({ href, className, children }: Props) => {
	return (
		<RadixLink asChild>
			<NextLink href={href} className={className}>
				{children}
			</NextLink>
		</RadixLink>
	);
};

export default Link;

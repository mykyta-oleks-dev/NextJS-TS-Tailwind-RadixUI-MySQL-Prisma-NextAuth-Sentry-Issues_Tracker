import { Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

const Footer = () => {
	return (
		<footer className="mt-auto border-t border-t-zinc-300 py-5">
			<Flex justify="between">
				<Text>&copy; Oleksiichuk Mykyta</Text>
				<Text>Issues Tracker</Text>
				<Link
					href="https://github.com/mykyta-oleks-dev?tab=repositories"
					className="flex items-center gap-2"
				>
					<SiGithub /> Github Repository
				</Link>
			</Flex>
		</footer>
	);
};

export default Footer;

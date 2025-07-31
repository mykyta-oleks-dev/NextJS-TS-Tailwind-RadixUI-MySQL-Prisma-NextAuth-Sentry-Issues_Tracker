import LoadingSpinner from '@/app/components/LoadingSpinner';
import { Button, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';

const LoadingNewIssuePage = () => {
	return (
		<Flex direction="column" gap="3">
			<Heading>Update an issue</Heading>

			<form className="space-y-2.5">
				<div>
					<TextField.Root disabled />
				</div>
				<div>
					<TextArea rows={20} disabled />
				</div>
				<Button type="button" disabled color="green">
					Loading form... <LoadingSpinner />
				</Button>
			</form>
		</Flex>
	);
};

export default LoadingNewIssuePage;

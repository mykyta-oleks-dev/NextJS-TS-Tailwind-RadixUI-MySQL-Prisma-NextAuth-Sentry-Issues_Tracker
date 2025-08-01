'use client';

import { ErrorMessage } from '@/app/components';
import { Issue } from '@/app/generated/prisma';
import { CreateIssueData, createIssueSchema } from '@/app/validations/issues';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	AlertDialog,
	Button,
	Callout,
	Flex,
	Heading,
	Spinner,
	TextField,
} from '@radix-ui/themes';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';
import MarkdownEditor from './MarkdownEditor';

interface Props {
	issue?: Issue;
	submitCallback: (data: CreateIssueData) => Promise<void>;
	isNew?: boolean;
}

const IssueForm = ({ issue, submitCallback }: Props) => {
	const form = useForm<CreateIssueData>({
		resolver: zodResolver(createIssueSchema),
		mode: 'onBlur',
		defaultValues: {
			title: issue?.title ?? '',
			description: issue?.description ?? '',
		},
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = form;

	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: CreateIssueData) => {
		try {
			setIsLoading(true);
			await submitCallback(data);
		} catch (err: unknown) {
			setIsLoading(false);
			setError((err as Error).message ?? 'An unexpected error occured');
		}
	};

	return (
		<Flex direction="column" gap="3">
			<Heading>
				{!issue ? 'Create a new issue' : 'Update an issue'}
			</Heading>
			<form
				className="space-y-2.5"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
			>
				<div>
					<TextField.Root
						placeholder="Title"
						{...register('title')}
					/>
					<ErrorMessage>{errors?.title?.message}</ErrorMessage>
				</div>
				<div>
					<Controller
						control={control}
						name="description"
						render={({ field }) => <MarkdownEditor field={field} />}
					/>
					<ErrorMessage>{errors?.description?.message}</ErrorMessage>
				</div>
				<Button
					type="submit"
					disabled={!isValid || isLoading}
					color="green"
				>
					Submit
					<Spinner loading={isLoading} />
				</Button>
			</form>

			<AlertDialog.Root open={!!error}>
				<AlertDialog.Content maxWidth="450px">
					<AlertDialog.Title>Error!</AlertDialog.Title>
					<AlertDialog.Description size="2">
						{error}
					</AlertDialog.Description>
					<Flex mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button
								variant="soft"
								color="gray"
								onClick={() => setError('')}
							>
								Close
							</Button>
						</AlertDialog.Cancel>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Flex>
	);
};

export default IssueForm;

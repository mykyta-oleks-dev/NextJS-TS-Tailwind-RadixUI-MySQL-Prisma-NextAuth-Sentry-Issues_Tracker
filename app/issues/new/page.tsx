'use client';

import { Button, Callout, Heading, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import issuesService from '@/app/services/IssuesService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateIssueData, createIssueSchema } from '@/app/validations/issues';
import ErrorMessage from '@/app/components/ErrorMessage';

const NewIssuePage = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<CreateIssueData>({
		resolver: zodResolver(createIssueSchema),
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
		},
	});
	const router = useRouter();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: CreateIssueData) => {
		try {
			const { request } = issuesService.create(data, {});
			setIsLoading(true);
			await request;
			router.push('/issues');
		} catch (err: unknown) {
			setIsLoading(false);
			setError((err as Error).message ?? 'An unexpected error occured');
		}
	};

	return (
		<div className="space-y-2.5">
			<Heading>Create a new issue</Heading>
			{error && (
				<Callout.Root color="red" role="alert">
					<Callout.Icon>
						<FaExclamationTriangle />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
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
						render={({ field }) => (
							<SimpleMDE placeholder="Description" {...field} />
						)}
					/>
					<ErrorMessage>{errors?.description?.message}</ErrorMessage>
				</div>
				<Button
					type="submit"
					disabled={!isValid || isLoading}
					color="green"
				>
					Submit new issue
					{isLoading && (
						<svg
							className="size-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent"
							viewBox="0 0 24 24"
						>
							asdasd
						</svg>
					)}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;

'use client';

import {
	ErrorMessage,
	LoadingSpinner,
	MarkdownPreview,
} from '@/app/components';
import issuesService from '@/app/services/IssuesService';
import { CreateIssueData, createIssueSchema } from '@/app/validations/issues';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Flex, Heading, TextField } from '@radix-ui/themes';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { Controller, useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

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
			const response = await request;
			router.push('/issues/' + response.data.id);
		} catch (err: unknown) {
			setIsLoading(false);
			setError((err as Error).message ?? 'An unexpected error occured');
		}
	};

	const options = useMemo(() => {
		return {
			toolbar: [
				'bold',
				'italic',
				'strikethrough',
				'|',
				'heading-1',
				'heading-2',
				'heading-3',
				'heading-bigger',
				'heading-smaller',
				'|',
				'code',
				'table',
				'unordered-list',
				'ordered-list',
				'|',
				'link',
				'image',
				'quote',
				'upload-image',
				'|',
				'horizontal-rule',
				'preview',
				'side-by-side',
				'fullscreen',
				'|',
				'guide',
			],
			previewRender(text) {
				return renderToString(
					<MarkdownPreview>{text}</MarkdownPreview>
				);
			},
		} as EasyMDE.Options;
	}, []);

	return (
		<Flex direction="column" gap="3">
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
							<SimpleMDE
								placeholder="Description"
								{...field}
								options={options}
							/>
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
					{isLoading && <LoadingSpinner />}
				</Button>
			</form>
		</Flex>
	);
};

export default NewIssuePage;

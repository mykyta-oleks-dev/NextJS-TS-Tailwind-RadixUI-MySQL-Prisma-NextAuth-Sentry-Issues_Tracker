'use client';
import { MarkdownPreview } from '@/app/components';
import { CreateIssueData } from '@/app/validations/issues';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { renderToString } from 'react-dom/server';
import { ControllerRenderProps } from 'react-hook-form';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

const MarkdownEditor = ({
	field,
}: {
	field: ControllerRenderProps<CreateIssueData, 'description'>;
}) => {
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
		<SimpleMdeReact
			placeholder="Description"
			{...field}
			options={options}
		/>
	);
};

export default MarkdownEditor;

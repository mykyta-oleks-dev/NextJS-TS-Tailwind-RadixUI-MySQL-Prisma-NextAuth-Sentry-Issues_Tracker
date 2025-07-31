import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

const MarkdownPreview = ({
	children,
}: {
	children: string | null | undefined;
}) => {
	return (
		<div className="prose">
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkBreaks]}
				components={{
					pre(props) {
						return <pre {...props} className="bg-gray-800!" />;
					},
				}}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownPreview;

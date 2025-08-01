'use client';

import { Issue } from '@/app/generated/prisma';
import issuesService from '@/app/services/IssuesService';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import LoadingForm from '../../_components/LoadingForm';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
	ssr: false,
	loading: () => <LoadingForm heading="Update an issue" />,
});

interface Props {
	issue: Issue;
}

const Edit = ({ issue }: Props) => {
	const router = useRouter();

	return (
		<IssueForm
			issue={issue}
			submitCallback={async (data) => {
				const { request } = issuesService.update(issue.id, data, {});
				const response = await request;
				router.push('/issues/' + response.data.id);
			}}
		/>
	);
};

export default Edit;

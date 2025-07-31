'use client';

import { Issue } from '@/app/generated/prisma';
import issuesService from '@/app/services/IssuesService';
import { useRouter } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

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

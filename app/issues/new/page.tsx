'use client';

import { useRouter } from 'next/navigation';
import IssueForm from '../_components/IssueForm';
import issuesService from '@/app/services/IssuesService';

const NewIssuePage = () => {
	const router = useRouter();
	return (
		<IssueForm
			submitCallback={async (data) => {
				const { request } = issuesService.create(data, {});
				const response = await request;
				router.push('/issues/' + response.data.id);
			}}
		/>
	);
};

export default NewIssuePage;

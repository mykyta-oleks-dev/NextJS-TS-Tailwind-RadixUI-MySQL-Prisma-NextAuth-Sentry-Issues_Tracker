'use client';

import { useRouter } from 'next/navigation';
import issuesService from '@/app/services/IssuesService';
import dynamic from 'next/dynamic';
import LoadingForm from '../_components/LoadingForm';

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
	ssr: false,
	loading: () => <LoadingForm heading="Create a new issue" />,
});

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

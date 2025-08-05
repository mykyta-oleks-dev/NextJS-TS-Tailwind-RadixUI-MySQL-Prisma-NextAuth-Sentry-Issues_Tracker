import { Metadata } from 'next';
import NewIssue from './NewIssue';

export const metadata: Metadata = {
	title: 'Issue Tracker - New issue',
	description: 'Create a new issue',
};

const NewIssuePage = () => <NewIssue />;

export default NewIssuePage;

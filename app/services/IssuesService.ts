import { Issue } from '../generated/prisma';
import HttpService from './HttpService';

type IssuePartial = Partial<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>;

class IssuesService extends HttpService<Issue, IssuePartial> {
	constructor() {
		super('/api/issues');
	}
}

const instance = new IssuesService();

export default instance;

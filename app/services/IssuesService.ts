import { AxiosRequestConfig } from 'axios';
import { Issue, Status } from '../generated/prisma';
import HttpService from './HttpService';
import apiClient from './api-client';

type IssuePartial = Partial<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>;

class IssuesService extends HttpService<Issue, IssuePartial> {
	constructor() {
		super('/api/issues');
	}

	updateStatus(
		id: string | number,
		data: { status: Status },
		config: AxiosRequestConfig
	) {
		const controller = new AbortController();

		const request = apiClient.patch<Issue>(
			`${this.url}/${id}/switch-status`,
			data,
			{
				...config,
				signal: controller.signal,
			}
		);

		return { request, abort: () => controller.abort() };
	}
}

const instance = new IssuesService();

export default instance;

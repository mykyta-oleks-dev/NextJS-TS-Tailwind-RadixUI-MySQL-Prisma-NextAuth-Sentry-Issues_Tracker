import type { AxiosRequestConfig } from 'axios';
import apiClient from './api-client';

export default class HttpService<T extends P & { id: number | string }, P> {
	url: string;
	constructor(url: string) {
		this.url = url;
	}

	create(data: P, config: AxiosRequestConfig) {
		const controller = new AbortController();

		const request = apiClient.post<T>(this.url, data, {
			...config,
			signal: controller.signal,
		});

		return { request, abort: () => controller.abort() };
	}

	update(id: string | number, data: P, config: AxiosRequestConfig) {
		const controller = new AbortController();

		const request = apiClient.patch<T>(`${this.url}/${id}`, data, {
			...config,
			signal: controller.signal,
		});

		return { request, abort: () => controller.abort() };
	}

	delete(id: string | number, config: AxiosRequestConfig) {
		const controller = new AbortController();

		const request = apiClient.delete<void>(`${this.url}/${id}`, {
			...config,
			signal: controller.signal,
		});

		return { request, abort: () => controller.abort() };
	}
}

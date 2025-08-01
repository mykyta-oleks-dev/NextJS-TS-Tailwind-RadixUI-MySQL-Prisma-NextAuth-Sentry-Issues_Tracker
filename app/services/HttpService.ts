import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from './api-client';

export default class HttpService<T extends P & { id: number | string }, P> {
	url: string;
	constructor(url: string) {
		this.url = url;
	}

	create(
		data: P,
		config: AxiosRequestConfig
	): {
		request: Promise<AxiosResponse<T>>;
		abort: (reason?: unknown) => void;
	};
	create(
		data: P,
		config: AxiosRequestConfig,
		signal: AbortSignal
	): Promise<AxiosResponse<T>>;
	create(data: P, config: AxiosRequestConfig, signal?: AbortSignal) {
		const controller = new AbortController();

		const request = apiClient.post<T>(this.url, data, {
			...config,
			signal: signal ?? controller.signal,
		});

		if (signal) return request;
		return { request, abort: () => controller.abort() };
	}

	readMany(config: AxiosRequestConfig): {
		request: Promise<AxiosResponse<T[]>>;
		abort: (reason?: unknown) => void;
	};
	readMany(
		config: AxiosRequestConfig,
		signal: AbortSignal
	): Promise<AxiosResponse<T[]>>;
	readMany(config: AxiosRequestConfig, signal?: AbortSignal) {
		const controller = new AbortController();

		const request = apiClient.get<T[]>(this.url, {
			...config,
			signal: signal ?? controller.signal,
		});

		if (signal) return request;
		return { request, abort: () => controller.abort() };
	}

	update(
		id: string | number,
		data: P,
		config: AxiosRequestConfig
	): {
		request: Promise<AxiosResponse<T>>;
		abort: (reason?: unknown) => void;
	};
	update(
		id: string | number,
		data: P,
		config: AxiosRequestConfig,
		signal: AbortSignal
	): Promise<AxiosResponse<T>>;
	update(
		id: string | number,
		data: P,
		config: AxiosRequestConfig,
		signal?: AbortSignal
	) {
		const controller = new AbortController();

		const request = apiClient.patch<T>(`${this.url}/${id}`, data, {
			...config,
			signal: signal ?? controller.signal,
		});

		if (signal) return request;
		return { request, abort: () => controller.abort() };
	}

	delete(
		id: string | number,
		config: AxiosRequestConfig
	): {
		request: Promise<AxiosResponse<void>>;
		abort: (reason?: unknown) => void;
	};
	delete(
		id: string | number,
		config: AxiosRequestConfig,
		signal: AbortSignal
	): Promise<AxiosResponse<void>>;
	delete(
		id: string | number,
		config: AxiosRequestConfig,
		signal?: AbortSignal
	) {
		const controller = new AbortController();

		const request = apiClient.delete<void>(`${this.url}/${id}`, {
			...config,
			signal: signal ?? controller.signal,
		});

		if (signal) return request;
		return { request, abort: () => controller.abort() };
	}
}

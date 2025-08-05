import { Issue, Status } from '@/app/generated/prisma';

export const orderTypes = ['asc', 'desc'];
export type OrderType = (typeof orderTypes)[number] | undefined;

export type SearchParams = {
	status?: Status;
	orderBy?: keyof Issue;
	orderType?: OrderType;
	page?: string;
	pageSize?: string;
};

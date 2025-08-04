import { z } from 'zod';
import { Status } from '../generated/prisma';

export const createIssueSchema = z.object({
	title: z
		.string()
		.trim()
		.min(3, 'Minimal length is 3 characters')
		.max(255, 'Maximal length is 255 characters'),
	description: z
		.string()
		.trim()
		.min(1, 'Description is required')
		.max(65535, 'Maximal length is 65535 characters'),
});

export const updateIssueSchema = createIssueSchema
	.extend({
		status: z
			.enum(Status, 'Status has to be of supported values')
			.nullable(),
		assignedToUserId: z
			.string()
			.trim()
			.min(1, 'AssignedToUserId is required')
			.max(255, 'Maximal length is 255')
			.nullable(),
	})
	.partial();

export type CreateIssueData = z.infer<typeof createIssueSchema>;

export type UpdateIssueData = z.infer<typeof updateIssueSchema>;

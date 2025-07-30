import { z } from 'zod';

export const createIssueSchema = z.object({
	title: z
		.string()
		.trim()
		.min(3, 'Minimal length is 3 characters')
		.max(255, 'Maximal length is 255 characters'),
	description: z.string().trim().min(1, 'Description is required'),
});

export type CreateIssueData = z.infer<typeof createIssueSchema>;

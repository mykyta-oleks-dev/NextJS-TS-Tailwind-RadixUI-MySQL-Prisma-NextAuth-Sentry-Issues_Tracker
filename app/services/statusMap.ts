import { Status } from '../generated/prisma';

const StatusMap: Record<
	Status,
	{ label: string; color: 'red' | 'violet' | 'green' }
> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

export default StatusMap;

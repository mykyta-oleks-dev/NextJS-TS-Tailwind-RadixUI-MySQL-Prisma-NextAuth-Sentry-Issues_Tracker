import { Status } from '../generated/prisma';

const StatusMap: Record<
	Status,
	{ label: string; color: 'orange' | 'violet' | 'green' }
> = {
	OPEN: { label: 'Open', color: 'orange' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

export default StatusMap;

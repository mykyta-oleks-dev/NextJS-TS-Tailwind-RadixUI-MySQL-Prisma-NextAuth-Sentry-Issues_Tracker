import { Badge } from '@radix-ui/themes';
import { Status } from '../generated/prisma';

const BadgeMap: Record<
	Status,
	{ label: string; color: 'red' | 'violet' | 'green' }
> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

const StatusBadge = ({ status }: Readonly<{ status: Status }>) => {
	const badge = BadgeMap[status];
	return (
		<Badge color={badge.color} size="2">
			{badge.label}
		</Badge>
	);
};

export default StatusBadge;

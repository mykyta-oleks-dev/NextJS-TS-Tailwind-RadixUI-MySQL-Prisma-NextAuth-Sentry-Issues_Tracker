import { Badge } from '@radix-ui/themes';
import { Status } from '../generated/prisma';
import StatusMap from '../services/statusMap';

const StatusBadge = ({ status }: Readonly<{ status: Status }>) => {
	const badge = StatusMap[status];
	return (
		<Badge color={badge.color} size="2">
			{badge.label}
		</Badge>
	);
};

export default StatusBadge;

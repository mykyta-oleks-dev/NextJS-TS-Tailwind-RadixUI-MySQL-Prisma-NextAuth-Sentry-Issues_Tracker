import { Status } from '../generated/prisma';
import { orange, violet, green } from '@radix-ui/colors';

type AvailableColor = 'orange' | 'violet' | 'green';

const colors: Record<AvailableColor, { [key: string]: string }> = {
	orange,
	violet,
	green,
};

const StatusMap: Record<Status, { label: string; color: AvailableColor }> = {
	OPEN: { label: 'Open', color: 'orange' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

export const getColor = (colorName: AvailableColor) =>
	Object.entries(colors[colorName]).find((c) => c[0].includes('9'))?.[1] ??
	undefined;

export default StatusMap;

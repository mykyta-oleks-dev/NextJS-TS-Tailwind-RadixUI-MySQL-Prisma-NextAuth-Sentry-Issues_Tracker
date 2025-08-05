'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import StatusMap, { getColor } from '../services/statusMap';

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

const IssuesChart = ({ open, inProgress, closed }: Props) => {
	const data: { label: string; value: number; fill: string }[] = [
		{
			label: 'Open issues',
			value: open,
			fill: getColor(StatusMap['OPEN'].color)!,
		},
		{
			label: 'Issues in progress',
			value: inProgress,
			fill: getColor(StatusMap['IN_PROGRESS'].color)!,
		},
		{
			label: 'Closed issues',
			value: closed,
			fill: getColor(StatusMap['CLOSED'].color)!,
		},
	];

	return (
		<Card className="h-full">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="label" />
					<YAxis />
					<Bar dataKey="value" barSize={100} />
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};

export default IssuesChart;

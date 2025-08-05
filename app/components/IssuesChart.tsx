'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import StatusMap from '../services/statusMap';
import { orange, violet, green } from '@radix-ui/colors';

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
			fill: orange.orange9,
		},
		{
			label: 'Issues in progress',
			value: inProgress,
			fill: violet.violet9,
		},
		{
			label: 'Closed issues',
			value: closed,
			fill: green.green9,
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

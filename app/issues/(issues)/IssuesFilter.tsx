'use client';

import { Status } from '@/app/generated/prisma';
import StatusMap from '@/app/services/statusMap';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const IssuesFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const statuses = Object.keys(Status) as Status[];

	const handleValueChange = (status: Status | 'null') => {
		const params = new URLSearchParams();
		const orderBy = searchParams.get('orderBy');
		const orderType = searchParams.get('orderType');

		if (status !== 'null') {
			params.append('status', status);
		}
		if (orderBy) {
			params.append('orderBy', orderBy);
		}
		if (orderType) {
			params.append('orderType', orderType);
		}

		const query = params.size ? '?' + params.toString() : '';
		router.push(`/issues${query}`);
	};

	return (
		<Select.Root
			onValueChange={handleValueChange}
			defaultValue={searchParams.get('status') ?? 'null'}
		>
			<Select.Trigger placeholder="Select status..." />
			<Select.Content>
				<Select.Item value="null">All</Select.Item>
				{statuses.map((s) => (
					<Select.Item key={s} value={s}>
						{StatusMap[s].label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssuesFilter;

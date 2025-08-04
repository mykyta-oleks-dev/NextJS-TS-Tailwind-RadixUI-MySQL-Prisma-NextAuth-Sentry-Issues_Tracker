'use client';

import { Flex, IconButton, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	RxChevronLeft,
	RxChevronRight,
	RxDoubleArrowLeft,
	RxDoubleArrowRight,
} from 'react-icons/rx';

interface Props {
	count: number;
	pageSize: number;
	page: number;
}

const Pagination = ({ count, pageSize, page }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageCount = Math.ceil(count / pageSize);
	if (pageCount <= 1) return null;

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		let valPage = page > pageCount ? pageCount : page;
		valPage = page < 1 ? 1 : page;

		params.set('page', valPage + '');
		router.push('?' + params.toString());
	};

	return (
		<Flex gap="2" align="center">
			<IconButton
				variant="soft"
				disabled={page === 1}
				onClick={() => changePage(1)}
			>
				<RxDoubleArrowLeft />
			</IconButton>
			<IconButton
				variant="soft"
				disabled={page === 1}
				onClick={() => changePage(page - 1)}
			>
				<RxChevronLeft />
			</IconButton>
			<Text size="2">
				Page {page} of {pageCount}
			</Text>
			<IconButton
				variant="soft"
				disabled={page === pageCount}
				onClick={() => changePage(page + 1)}
			>
				<RxChevronRight />
			</IconButton>
			<IconButton
				variant="soft"
				disabled={page === pageCount}
				onClick={() => changePage(pageCount)}
			>
				<RxDoubleArrowRight />
			</IconButton>
		</Flex>
	);
};

export default Pagination;

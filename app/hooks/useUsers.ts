import usersService from '@/app/services/UsersService';
import { useQuery } from '@tanstack/react-query';

const useUsers = () =>
	useQuery({
		queryKey: ['users'],
		queryFn: async ({ signal }) =>
			(await usersService.readMany({}, signal)).data,
		placeholderData: (prev) => prev,
	});

export default useUsers;

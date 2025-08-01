import { User } from '../generated/prisma';
import HttpService from './HttpService';

type PartialUser = Partial<User>;

class UsersService extends HttpService<User, PartialUser> {
	constructor() {
		super('/api/users');
	}
}

const usersService = new UsersService();

export default usersService;

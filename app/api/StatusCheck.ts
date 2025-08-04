import { Status } from '../generated/prisma';

const statusCheck = (status: string): status is Status => {
	for (const val in Status) {
		if (status === val) return true;
	}

	return false;
};

export default statusCheck;

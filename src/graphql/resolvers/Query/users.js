import { User } from '#root/db/models/user';

const usersResolver = async () => {
    return await User.findAll();
};

export default usersResolver;
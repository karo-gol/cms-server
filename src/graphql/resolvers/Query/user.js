import { User } from '#root/db/models/user';
import { isAuth } from '#root/helpers/jwt/isAuth';

const userResolver = async (obj, { id }, context) => {
    await isAuth(context);    

    try {            
        return await User.findByPk(id);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default userResolver;
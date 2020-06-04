import { User } from '#root/db/models/user';
import { isAuth } from '#root/helpers/jwt/isAuth';

const deleteUserResolver = async (obj, { id }, context) => {
    await isAuth(context);   

    try {
        await User.update({            
            deletedAt: Date.now()
        }, {
            where: {
                id: id
            }
        });
    } catch (err) {
        console.log(err);
        return { ok: false, error: err };
    }

    return { ok: true, error: '' };

};

export default deleteUserResolver;
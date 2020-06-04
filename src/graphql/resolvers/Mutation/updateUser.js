import { Op } from 'sequelize';
import { hash } from 'bcryptjs';
import { User } from '#root/db/models/user';
import { isAuth } from '#root/helpers/jwt/isAuth';

const updateUserResolver = async (obj, { id, login, email, password }, context) => {
    await isAuth(context);

    let error = '';

    const userExisted = await User.findAll({ 
        where: {
            deletedAt: null, 
            [Op.or]: [ 
                { login: login },
                { email: email }
            ],
            id: {
                [Op.ne]: id
            }
        }
    });

    if(userExisted.length !== 0) {
        error = 'User has been already added with the same login or email or password. Please, try again!';
        console.log(error);
        return { ok: false, error: error };
    }

    const hashedPassword = await hash(password, 12);

    try {
        await User.update({
            login: login,
            email: email,
            password: hashedPassword,
            updatedAt: Date.now()
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

export default updateUserResolver;
import { Op } from 'sequelize';
import { hash } from 'bcryptjs';
import { User } from '#root/db/models/user';
import { isAuth } from '#root/helpers/jwt/isAuth';

const createUserResolver = async (obj, { login, password, email }, context) => {
    await isAuth(context);

    let error = '';

    const userExisted = await User.findAll({ 
        where: { 
            [Op.or]: [ 
                { login: login },
                { email: email }
            ]
        }
    });

    if(userExisted) {
        error = 'User has been already added with the same login or password.';
        console.log(error);
        return { ok: false, error: error };
    }

    const hashedPassword = await hash(password, 12);

    try {
        await User.create({
            login: login,
            email: email,
            password: hashedPassword
        });
    } catch (err) {
        console.log(err);
        return { ok: false, error: err };
    }

    return { ok: true, error: '' };
};

export default createUserResolver;
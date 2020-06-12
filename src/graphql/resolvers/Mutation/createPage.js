import { Op } from 'sequelize';
import { Page, User } from '#root/db/models/page';
import { isAuth } from '#root/helpers/jwt/isAuth';

const createPageResolver = async (obj, { header, content, userId }, context) => {
    await isAuth(context);

    let error = '';

    const pageExisted = await Page.findAll({ 
        where: {            
            deletedAt: null,
            [Op.or]: [ 
                { header: header }               
            ]        
        }
    });

    if(pageExisted.length !== 0) {       
        error = 'Page with the same header has been already added. Please, try again!';
        console.log(error);
        return { ok: false, error: error };
    }  

    const userExisted = await User.findByPk(userId);

    if(userExisted === null) {
        error = 'User does not exist.';
        console.log(error);
        return { ok: false, error: error };
    }

    try {
        await Page.create({
            header: header,
            content: content,
            userId: userId
        });
    } catch (err) {
        console.log(err);
        return { ok: false, error: err };
    }

    return { ok: true, error: '' };
};

export default createPageResolver;
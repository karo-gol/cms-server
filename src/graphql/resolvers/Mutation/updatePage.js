import { Op } from 'sequelize';
import { Page, User } from '#root/db/models/page';
import { isAuth } from '#root/helpers/jwt/isAuth';

const updatePageResolver = async (obj, { id, header, content, userId }, context) => {
    await isAuth(context);

    let error = '';

    const pageExisted = await Page.findAll({ 
        where: {            
            deletedAt: null,
            [Op.or]: [ 
                { header: header }               
            ],
            id: {
                [Op.ne]: id
            }        
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
        await Page.update({
            header: header,
            content: content,
            userId: userId,
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

export default updatePageResolver;
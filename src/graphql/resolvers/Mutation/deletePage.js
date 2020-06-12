import { Page } from '#root/db/models/page';
import { isAuth } from '#root/helpers/jwt/isAuth';

const deletePageResolver = async (obj, { id }, context) => {
    await isAuth(context);   

    try {
        await Page.update({            
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

export default deletePageResolver;
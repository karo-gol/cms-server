import { Page } from '#root/db/models/page';
import { isAuth } from '#root/helpers/jwt/isAuth';

const pageResolver = async (obj, { id }, context) => {
    await isAuth(context);    

    try {            
        return await Page.findByPk(id);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default pageResolver;
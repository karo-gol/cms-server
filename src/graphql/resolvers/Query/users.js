import { User } from '#root/db/models/user';
import { isAuth } from '#root/helpers/jwt/isAuth';
import { Op } from 'sequelize';

const usersResolver = async (obj, { offset, limit, order, orderBy, searchText='' }, context) => {
    await isAuth(context);

    let users = {};

    if(searchText) {        
        users = await User.findAndCountAll({
            where: {
                deletedAt: null,
                [Op.or]: [                    
                    { login: { [Op.substring]: searchText } },
                    { email: { [Op.substring]: searchText } },                    
                ]
            },
            offset: offset, 
            limit: limit,
            order: [[ orderBy, order ]] 
        });        
    } else {
        users = await User.findAndCountAll({
            where: { deletedAt: null },           
            offset: offset, 
            limit: limit,
            order: [[ orderBy, order ]] 
        });        
    }   

    return { rows: users.rows, count: users.count };
};

export default usersResolver;

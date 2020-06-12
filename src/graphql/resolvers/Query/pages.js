import { Page } from '#root/db/models/page';
import { isAuth } from '#root/helpers/jwt/isAuth';
import { Op } from 'sequelize';

const pagesResolver = async (obj, { offset, limit, order, orderBy, searchText='' }, context) => {
    await isAuth(context);

    let pages = {};

    if(searchText) {        
        pages = await Page.findAndCountAll({
            where: {
                deletedAt: null,
                [Op.or]: [                    
                    { header: { [Op.substring]: searchText } },
                    { content: { [Op.substring]: searchText } },                    
                ]
            },
            offset: offset, 
            limit: limit,
            order: [[ orderBy, order ]] 
        });        
    } else {
        pages = await Page.findAndCountAll({
            where: { deletedAt: null },           
            offset: offset, 
            limit: limit,
            order: [[ orderBy, order ]] 
        });        
    }   

    return { rows: pages.rows, count: pages.count };
};

export default pagesResolver;

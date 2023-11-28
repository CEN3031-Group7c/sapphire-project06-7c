'use strict';

module.exports = {

    async create(ctx) {
        const { block } = ctx.request.body

        return strapi.services.block.create({
            id: block.name, 
            name: block.name,
            description: block.description,
            blocks_category: block.blocks_category,
            image_url: block.image_url,
        })
    }
};

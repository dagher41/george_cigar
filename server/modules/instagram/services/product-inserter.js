import db from '../../../models';
const { ImageSource, Product, Tag } = db;

export default async function (instagramImage) {
    const existingSource = await ImageSource.findOne({ where: { sourceId: instagramImage.id } })
    let product;
    if (existingSource) {
        const image = await existingSource.getProductImage();
        product = await image.getProduct();
        if (product.title != instagramImage.getTitle() || product.body != instagramImage.getDescription()) {
            product.update({ title: instagramImage.getTitle(), body: instagramImage.getDescription() });
        }
    } else {
        product = await Product.create({
            title: instagramImage.getTitle(),
            body: instagramImage.getDescription(),
            status: 1
        });

        const image = await product.createProductImage({
            url: instagramImage.url,
            status: 1
        });

        await image.createImageSource({
            source: 'instagram',
            sourceId: instagramImage.id,
            payload: instagramImage.payload
        });
    }
    const tagMap = await getTagMap();
    const productTags = instagramImage.tags.reduce((acc, tagName) => {
        if (tagMap[tagName]) {
            acc.push(tagMap[tagName]);
        }
        return acc;
    }, []);
    product.setTags(productTags);
}


async function getTagMap() {
    const tags = ['cigars', 'vapes', 'glass', 'cbd'];
    const dbTags = await Tag.findAll({ where: { name: tags } })

    return tags.reduce((acc, tag) => {
        acc[tag] = dbTags.find(dbTag => dbTag.name == tag)
        return acc;
    }, {});
}

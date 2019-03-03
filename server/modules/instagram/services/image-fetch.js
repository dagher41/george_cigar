import instagram from './instagram-client';
import ImageFacade from './instagram-image.facade';
import productInserter from './product-inserter';

function collectImages(accessToken) {
    return new Promise((resolve, reject) => {
        let images = []
        function fetchImages(url) {
            return instagram.get(url, { access_token: accessToken })
                .then(response => {
                    images = images.concat(response.data);
                    if (response.pagination && response.next_url) {
                        return fetchImages(response.next_url);
                    } else {
                        return Promise.resolve(images);
                    }
                });
        }

        fetchImages('users/self/media/recent')
            .then(images => resolve(images))
            .catch(reject);
    });
}

function filterSiteImages(images) {
    const siteImages = images.filter(image => image.tags.indexOf('site') >= 0)
    const userTags = { 'cigars': [], 'vapes': [], 'glass': [], 'cbd': [] }
    siteImages.forEach(image => {
        image.tags.forEach(tag => {
            if (userTags[tag]) {
                userTags[tag].push(new ImageFacade(image));
            }
        })
    });
    return userTags
}

function insertImages({ imageMap }) {
    Object.keys(imageMap).forEach(tagName => {
        imageMap[tagName].forEach(image => {
            productInserter(image);
        })
    });

    return { imageMap };
}

export function processImages(accessToken) {
    return new Promise((resolve, reject) => {
        collectImages(accessToken)
            .then(images => {
                return filterSiteImages(images);
            })
            .then(imageMap => {
                return insertImages({ imageMap });
            })
            .then(images => {
                resolve(images);
            })
            .catch(reject);
    });
}

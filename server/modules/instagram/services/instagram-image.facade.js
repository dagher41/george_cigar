export default class {
    constructor(imageJson) {
        this.id = imageJson.id;
        this.url = imageJson.images.standard_resolution.url;
        this.caption = imageJson.caption.text;
        this.tags = imageJson.tags;
        this.payload = JSON.stringify(imageJson);
    }

    getTitle() {
        if (this.title) {
            return this.title;
        }
        this._setProductAttributes();
        return this.title;
    }

    getDescription() {
        if (this.discription) {
            return this.description;
        }
        this._setProductAttributes();
        return this.description;
    }

    _setProductAttributes() {
        const components = this.caption.split(':');
        this.title = components[0].trim();
        this.description = components[1].replace(/\#\w+ */g, '').trim();
    }
}
export class LoaderComponent extends HTMLElement {

    constructor() {
        super();
        console.log('waiting for datas...')
    }
}

customElements.get('loader-component') || customElements.define('loader-component', LoaderComponent);

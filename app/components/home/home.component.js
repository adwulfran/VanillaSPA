import { Observable } from '../../observable.js';

export class HomeComponent extends HTMLElement {

    constructor() {

        super();
        var title  = new Observable("title");
        title.subscribe("Hello Home");
        
    }
}

customElements.get('home-component') || customElements.define('home-component', HomeComponent);
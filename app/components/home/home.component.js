import { Component } from '../../component.js';
import { Observable } from '../../observable.js';

// component's template + style
import HomeComponentHTML from './home.component.html';
import HomeComponentCss from './home.component.css';

new Component().render({
    'path': 'home-component',
    'template': HomeComponentHTML,
    'style': HomeComponentCss
})

export class HomeComponent extends HTMLElement {

    constructor() {

        super();
        var title = new Observable("title");
        title.subscribe("Hello Home");

    }
}

customElements.get('home-component') || customElements.define('home-component', HomeComponent);
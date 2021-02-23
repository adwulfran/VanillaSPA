import { Component } from '../../component.js'

// component's template + style
import ContactComponentHTML from './contact.component.html';
import ContactComponentCss from './contact.component.css';

new Component().render({
    'path': 'contact-component',
    'template': ContactComponentHTML,
    'style': ContactComponentCss
})

export class ContactComponent extends HTMLElement {

    constructor() {
        
        super();
        
    }
}

customElements.get('contact-component') || customElements.define('contact-component', ContactComponent);

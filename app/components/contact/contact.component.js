export class ContactComponent extends HTMLElement {

    constructor() {
        
        super();
        
    }
}

customElements.get('contact-component') || customElements.define('contact-component', ContactComponent);

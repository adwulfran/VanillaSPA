import { Component } from '../../component.js'
import {Observable } from '../../observable.js'
// component's template + style
import ContactComponentHTML from './contact.component.html';
import ContactComponentCss from './contact.component.css';

new Component().render({
    'path': 'contact-component',
    'template': ContactComponentHTML,
    'style': ContactComponentCss
})

export class ContactComponent {

    constructor() {
        this.email = new Observable('email');
        this.email.subscribe('adrienwulfran@gmail.com')
    }
    
}
 new ContactComponent()
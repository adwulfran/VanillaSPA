import { Component } from '../../component'
import {Observable } from '../../observable'


new Component().render({
    'path': 'contact-component',
    'template': require('./contact.component.html'),
    'style': require('./contact.component.css')
})

export class ContactComponent {
    
    email : any = new Observable('email');
    constructor() {
       this.email.subscribe('adrienwulfran@gmail.com');
    }

}
new ContactComponent()
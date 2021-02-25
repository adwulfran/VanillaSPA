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

export class HomeComponent {

    constructor() {
        this.title = new Observable('title')
        this.title.subscribe("Hello Home");
    }
    
}
new HomeComponent()
import { Component } from '../../component';
import { Observable } from '../../observable';

new Component().render({
    'path': 'home-component',
    'template': require('./home.component.html'),
    'style': require('./home.component.css')
})

export class HomeComponent {

    title: any = new Observable('title');

    constructor() {
        this.init();
    }

    init() {
        this.title.subscribe("Hello Home");
    }

}
new HomeComponent();
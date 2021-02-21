import { Observable } from '../../observable.js'
export class HomeComponent extends HTMLElement {
    constructor() {
        super();
        console.log('foucou')
        var title  = new Observable("title");
        title.subscribe("Hello Home")
       
    }
}
import { Observable } from '../../observable.js'
export class HomeComponent extends HTMLElement {
    constructor() {
        super();
        var title  = new Observable("title");
        title.subscribe("Hello Home")
       
    }
}
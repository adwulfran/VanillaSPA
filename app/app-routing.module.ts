declare module globalThis {
    let routes: any;
}
declare module window {
    let location:any;
    let onhashchange:any;
    let active: any;
}
// render 
import { Routes } from './routes';

// SINGLE PAGE APPLICATION'S ROUTES 
export class Router {

    constructor() {
        globalThis.routes = Routes;
        // route change view
        var hashStores = [];
        if (hashStores.length == 0) {
            hashStores.push(window.location.hash)
            globalThis.routes.forEach((el:any) => {
                if (window.location.hash === '#' + el.path) {
                    this.changeView(el)
                }
            })
        }

        window.onhashchange = () => {
            hashStores.push(window.location.hash)
            globalThis.routes.forEach((el:any) => {
                if (window.location.hash === '#' + el.path) {
                    this.changeView(el)
                }
            })
        }

        window.active = this.active;
    }

    changeView(el:any) {
        var root = document.getElementById('root')
        var script = document.createElement('script');
        script.src = "../dist/" + el['path'] + ".js"
        root.appendChild(script)
    }

    active(e:any) {
        for (var i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
            document.getElementsByClassName('nav-link')[i].classList.remove("active")
        }
        e.classList.add('active')
    }

}

new Router();

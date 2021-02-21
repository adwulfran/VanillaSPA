import { HomeComponent }  from './components/home/home.component.js'
import HomeComponentHTML from './components/home/home.component.html';
import { ContactComponent } from './components/contact/contact.component.js';
import ContactComponentHTML from './components/contact/contact.component.html';
import { RealtimeComponent } from './components/realtime/realtime.component.js';
import RealtimeComponentHTML from './components/realtime/realtime.component.html';

// SINGLE PAGE APPLICATION'S ROUTES 
const Routes = [
    {
        'path': 'home-component', 'component': HomeComponent, 'template': HomeComponentHTML
    },
    {
        'path': 'contact-component', 'component': ContactComponent, 'template': ContactComponentHTML
    },
    {
        'path': 'realtime-component', 'component': RealtimeComponent, 'template': RealtimeComponentHTML
    }
]
function active(e) {
    for (var i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
        document.getElementsByClassName('nav-link')[i].classList.remove("active")
    }
    e.classList.add('active')
}
global.active = active;

var hashStores = [];
window.onhashchange = function () {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            var root = document.getElementById('root');
            root.innerHTML = `<`+el['path']+`>`+el['template']+ `</`+el['path']+`>`;
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}

if (hashStores.length == 0) {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            var root = document.getElementById('root');
            root.innerHTML = `<`+el['path']+`>`+el['template']+ `</`+el['path']+`>`;
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}



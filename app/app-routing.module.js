import { HomeComponent } from './components/home/home.component.js'
import HomeComponentHTML from './components/home/home.component.html';
import { FriendsComponent } from './components/friends/friends.component.js'
import FriendsComponentHTML from './components/friends/friends.component.html';
import { LiveStreamComponent } from './components/livestream/livestream.component.js';
import livestreamComponentHTML from './components/livestream/livestream.component.html';
import { RealtimeComponent } from './components/realtime/realtime.component.js';
import RealtimeComponentHTML from './components/realtime/realtime.component.html';
// SINGLE PAGE APPLICATION'S ROUTES <3
const Routes = [
    {
        'path': 'home-component', 'component': HomeComponent, 'template': HomeComponentHTML
    },
    {
        'path': 'friends-component', 'component': FriendsComponent, 'template': FriendsComponentHTML
    },
    {
        'path': 'livestream-component', 'component': LiveStreamComponent, 'template': livestreamComponentHTML
    },
    {
        'path': 'realtime-component', 'component': RealtimeComponent, 'template': RealtimeComponentHTML
    }
]

function active(e) {
    for (var i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
        document.getElementsByClassName('nav-link')[i].classList.remove("activez")
    }
    e.classList.add('activez')
}
global.active = active
var hashStores = [];
window.onhashchange = function () {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            var router = document.getElementById('router');
            router.innerHTML = el['template'];
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}

if (hashStores.length == 0) {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            var router = document.getElementById('router');
            router.innerHTML = el['template'];
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}



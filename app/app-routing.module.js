const { HomeComponent } = require('./components/home/home.component.js');
import HomeComponentHTML from './components/home/home.component.html';
const { FriendsComponent } = require('./components/friends/friends.component.js');
import FriendsComponentHTML from './components/friends/friends.component.html';
const { LiveStreamComponent } = require('./components/livestream/livestream.component.js')
import livestreamComponentHTML from './components/livestream/livestream.component.html';
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
            var root = document.getElementById('root');
            root.innerHTML = el['template'];
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}

if (hashStores.length == 0) {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            var root = document.getElementById('root');
            root.innerHTML = el['template'];
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}



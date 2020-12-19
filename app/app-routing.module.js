const { HomeComponent } = require('./components/home/home.component.js');
import HomeComponentHTML from './components/home/home.component.html';
const { FriendsComponent } = require('./components/friends/friends.component.js');
import FriendsComponentHTML from './components/friends/friends.component.html';
const { FamilyComponent } = require('./components/family/family.component.js')
import FamilyComponentHTML from './components/family/family.component.html';
// SINGLE PAGE APPLICATION'S ROUTES <3
const Routes = [
    {
        'path': 'home-component', 'component': HomeComponent, 'template': HomeComponentHTML
    },
    {
        'path': 'friends-component', 'component': FriendsComponent, 'template': FriendsComponentHTML
    },
    {
        'path': 'family-component', 'component': FamilyComponent, 'template': FamilyComponentHTML
    }
]

function active(e) {    
    for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
        document.getElementsByTagName('li')[i].classList.remove("active")
    }
    e.classList.add('active')
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



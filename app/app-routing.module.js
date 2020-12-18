const { HomeComponent } = require('./components/home/home.component.js');
import HomeComponentHTML from './components/home/home.component.html';
const { FriendsComponent } = require('./components/friends/friends.component.js');
import FriendsComponentHTML from './components/friends/friends.component.html';

// SINGLE PAGE APPLICATION'S ROUTES <3
const Routes = [
    {
        'path': 'home-component',
        'component': HomeComponent,
        'template': HomeComponentHTML
    },
    {
        'path': 'friends-component',
        'component': FriendsComponent,
        'template': FriendsComponentHTML
    }
]

function router(p) {
    window.location.hash = p;
    Routes.forEach(function (el, i) {
        console.log('p ' + p)
        if (p === el.path) {
            var root = document.getElementById('root');
            root.innerHTML = el['template'];
            customElements.get(el['path']) || customElements.define(el['path'], el['component']);
        }
    })
}

global.router = router;
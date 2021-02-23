// render 
import {Component} from './component.js';

// templates + styles
import HomeComponentHTML from './components/home/home.component.html';
import HomeComponentCss from './components/home/home.component.css';

import ContactComponentHTML from './components/contact/contact.component.html';
import ContactComponentCss from './components/contact/contact.component.css';

import RealtimeComponentHTML from './components/realtime/realtime.component.html';
import RealtimeComponentCss from './components/realtime/realtime.component.css';

// SINGLE PAGE APPLICATION'S ROUTES 
const Routes = [
    {
        'path': 'home-component', 'template': [HomeComponentHTML, HomeComponentCss]
    },
    {
        'path': 'contact-component', 'template': [ContactComponentHTML, ContactComponentCss]
    },
    {
        'path': 'realtime-component', 'template': [RealtimeComponentHTML, RealtimeComponentCss]
    }
];

global.active = function active(e) {
    for (var i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
        document.getElementsByClassName('nav-link')[i].classList.remove("active")
    }
    e.classList.add('active')
}


var component = new Component;
Routes.forEach(function(el){
    component.parent(el['path'])
})

var hashStores = [];
window.onhashchange = function () {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            component.render(el)
        }
    })
}

if (hashStores.length == 0) {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            component.render(el)
        }
    })
}



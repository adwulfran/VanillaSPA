// render 
import {Component} from './component.js';

// SINGLE PAGE APPLICATION'S ROUTES 
const Routes = [
    {
        'path': 'home-component'
    },
    {
        'path': 'contact-component'
    },
    {
        'path': 'realtime-component'
    }
];

var component = new Component;

var hashStores = [];
window.onhashchange = function () {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            component.show(el)
        }
    })
}

if (hashStores.length == 0) {
    hashStores.push(window.location.hash)
    Routes.forEach(function (el, i) {
        if (window.location.hash === '#' + el.path) {
            component.show(el)
        }
    })
}

global.active = function active(e) {
    for (var i = 0; i < document.getElementsByClassName('nav-link').length; i++) {
        document.getElementsByClassName('nav-link')[i].classList.remove("active")
    }
    e.classList.add('active')
}

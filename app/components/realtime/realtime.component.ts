import { Component } from '../../component';

new Component().render({
    'path': 'realtime-component', 
    'template': require('./realtime.component.html'), 
    'style': require('./realtime.component.css')
}) 
export class RealtimeComponent  {

    constructor() {
        new Component().render({
            'path': 'candlestick-component', 
            'template': require('./candlestick/candlestick.component.html'), 
            'style' : require('./candlestick/candlestick.component.css') 
        });
        new Component().render({
            'path': 'orderbook-component',
            'template': require('./orderbook/orderbook.component.html'),
            'style' : require('./orderbook/orderbook.component.css') 
        })
    }
    
}

new RealtimeComponent()
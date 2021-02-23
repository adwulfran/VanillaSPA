import { Component } from '../../component.js';

// component's template + style
import RealtimeComponentHTML from './realtime.component.html';
import RealtimeComponentCss from './realtime.component.css';

// sub component's templates + styles
import CandlestickComponentHTML from './candlestick/candlestick.component.html';
import CandlestickComponentCss from './candlestick/candlestick.component.css';
import OrderbookComponentHTML from './orderbook/orderbook.component.html';
import OrderbookComponentCss from './orderbook/orderbook.component.css';

new Component().render({
    'path': 'realtime-component', 
    'template': RealtimeComponentHTML, 
    'style': RealtimeComponentCss
})
export class RealtimeComponent extends HTMLElement {

    constructor() {

        super();
        var component = new Component();
        component.subrender({
            'path': 'candlestick-component', 
            'template': CandlestickComponentHTML, 
            'style' : CandlestickComponentCss 
        });
        component.subrender({
            'path': 'orderbook-component',
            'template': OrderbookComponentHTML,
            'style' : OrderbookComponentCss 
        })

    }

}

customElements.get('realtime-component') || customElements.define('realtime-component', RealtimeComponent);
import { Component } from '../../component.js';

// templates + styles
import CandlestickComponentHTML from './candlestick/candlestick.component.html';
import CandlestickComponentCss from './candlestick/candlestick.component.css';
import OrderbookComponentHTML from './orderbook/orderbook.component.html';
import OrderbookComponentCss from './orderbook/orderbook.component.css';

export class RealtimeComponent extends HTMLElement {

    constructor() {

        super();
        var component = new Component;
        component.render({'path': 'candlestick-component', 'template': [CandlestickComponentHTML, CandlestickComponentCss]});
        component.render({'path': 'orderbook-component', 'template': [OrderbookComponentHTML, OrderbookComponentCss]})

    }

}

customElements.get('realtime-component') || customElements.define('realtime-component', RealtimeComponent);
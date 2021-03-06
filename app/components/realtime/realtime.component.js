import { Component } from '../../component';

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
export class RealtimeComponent  {
    constructor() {
        
        this.component = new Component();
        this.component.render({
            'path': 'candlestick-component', 
            'template': CandlestickComponentHTML, 
            'style' : CandlestickComponentCss 
        });
        this.component.render({
            'path': 'orderbook-component',
            'template': OrderbookComponentHTML,
            'style' : OrderbookComponentCss 
        })

    }
}

new RealtimeComponent()
import { Observable } from '../../../observable';
import { Component } from '../../../component';

export class OrderbookComponent {
    price:any = new Observable('price');
    type:any = new Observable('type');
    loader:any = new Component();
    bidsArr:any = [];
    asksArr:any = [];
    constructor() {
        /*  ------------------------------------------------------------------------
            ------------------------------TICKER------------------------------------
            ------------------------------------------------------------------------
        */

        var websocket_ticker = new WebSocket('wss://ws.bitstamp.net');
        const message_ticker = {
            event: "bts:subscribe",
            data: {
                channel: "live_trades_btcusd"
            }
        };
        var checkToLoad = 0;
        websocket_ticker.onopen = (evt) => { websocket_ticker.send(JSON.stringify(message_ticker)) };
        websocket_ticker.onmessage = (evt) => {
            checkToLoad = checkToLoad + 1;
            if (window.location.hash === '#realtime-component') {
                var obj = JSON.parse(evt.data)
                console.log(obj)
                if (obj.data.price !== undefined) {
                    this.price.subscribe(obj.data.price)
                    if (obj.data.type == 0) {
                        this.type.subscribe('buy')
                    }
                    else {
                        this.type.subscribe('sell')
                    }
                }
                else {
                    this.loader.render({
                        'path': 'loader-component',
                        'template': require('../../loader/loader.component.html'),
                        'style': require('../../loader/loader.component.css')
                    })
                }

            } else {
                websocket_ticker.close()
            }
        }
        /* ------------------------------------------------------------------------
           ------------------------------ORDERBOOK---------------------------------
           ------------------------------------------------------------------------
       */
       
        for (var i = 0; i < 10; i++) {
            var liBids = document.createElement('li');
            liBids.className = 'bids';
            liBids.setAttribute("bind-text", "bids-" + i.toString())
            document.getElementById('bids').appendChild(liBids);
            this.bidsArr.push(new Observable('bids-' + i))

            var liAsks = document.createElement('li');
            liAsks.className = 'asks';
            liAsks.setAttribute("bind-text", "asks-" + i.toString())
            document.getElementById('asks').appendChild(liAsks);
            this.asksArr.push(new Observable('asks-' + i))
        }
        var websocket_orderbook = new WebSocket('wss://ws.bitstamp.net');
        const message_bookorder = {
            event: "bts:subscribe",
            data: {
                channel: "order_book_btcusd"
            }
        };
        websocket_orderbook.onopen = () => { websocket_orderbook.send(JSON.stringify(message_bookorder)) };
        websocket_orderbook.onmessage = (evt) => {
            if (window.location.hash === '#realtime-component') {
                var obj = JSON.parse(evt.data)
                if (obj.data.bids !== undefined && obj.data.asks !== undefined) {
                    obj.data.bids.slice(0, 10).forEach((el:any, i:number) => {
                        this.bidsArr[i].subscribe(el[0] + '&nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1])
                    })
                    obj.data.asks.slice(0, 10).reverse().forEach((el:any, i:number) => {
                        this.asksArr[i].subscribe(el[0] + ' &nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1])
                    })
                }
            } else {
                websocket_orderbook.close()
            }
        }

    }

}
new OrderbookComponent()
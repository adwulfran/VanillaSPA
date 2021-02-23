import { Observable } from '../../../observable.js'
import LoaderComponentHTML from '../../loader/loader.component.html';
import { LoaderComponent } from '../../loader/loader.component.js';


export class OrderbookComponent extends HTMLElement {

    constructor() {

        super();
        /*  ------------------------------------------------------------------------
            ------------------------------TICKER------------------------------------
            ------------------------------------------------------------------------
        */
        var price = new Observable('price');
        var type = new Observable('type');
        var websocket_ticker = new WebSocket('wss://ws.bitstamp.net');
        const message_ticker = {
            event: "bts:subscribe",
            data: {
                channel: "live_trades_btcusd"
            }
        };
        var checkToLoad = 0;
        websocket_ticker.onopen = function (evt) { websocket_ticker.send(JSON.stringify(message_ticker)) };
        websocket_ticker.onmessage = function (evt) {
            checkToLoad = checkToLoad + 1;
            if (window.location.hash === '#realtime-component') {
                var obj = JSON.parse(evt.data)
                console.log(obj)
                if (obj.data.price !== undefined) {
                    price.subscribe(obj.data.price)
                    if (obj.data.type == 0) {
                        type.subscribe('buy')
                    }
                    else {
                        type.subscribe('sell')
                    }
                }
                else {
                    price.subscribe(LoaderComponentHTML)
                    customElements.get('loader-component') || customElements.define('loader-component', LoaderComponent);
                }

            } else {
                websocket_ticker.close()
            }
        }


        /* ------------------------------------------------------------------------
           ------------------------------ORDERBOOK---------------------------------
           ------------------------------------------------------------------------
       */
        var bidsArr = [];
        var asksArr = []
        for (var i = 0; i < 10; i++) {
            var liBids = document.createElement('li');
            liBids.className = 'bids';
            liBids.setAttribute("bind-text", "bids-" + i.toString())
            document.getElementById('bids').appendChild(liBids);
            bidsArr.push(new Observable('bids-' + i))

            var liAsks = document.createElement('li');
            liAsks.className = 'asks';
            liAsks.setAttribute("bind-text", "asks-" + i.toString())
            document.getElementById('asks').appendChild(liAsks);
            asksArr.push(new Observable('asks-' + i))
        }
        var websocket_orderbook = new WebSocket('wss://ws.bitstamp.net');
        const message_bookorder = {
            event: "bts:subscribe",
            data: {
                channel: "order_book_btcusd"
            }
        };
        websocket_orderbook.onopen = function (evt) { websocket_orderbook.send(JSON.stringify(message_bookorder)) };
        websocket_orderbook.onmessage = function (evt) {
            if (window.location.hash === '#realtime-component') {
                var obj = JSON.parse(evt.data)
                if (obj.data.bids !== undefined && obj.data.asks !== undefined) {
                    obj.data.bids.slice(0, 10).forEach(function (el, i) {
                        bidsArr[i].subscribe(el[0] + '&nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1])
                    })
                    obj.data.asks.slice(0, 10).reverse().forEach(function (el, i) {
                        asksArr[i].subscribe(el[0] + ' &nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1])
                    })
                }
            } else {
                websocket_orderbook.close()
            }
        }

    }

}

customElements.get('orderbook-component') || customElements.define('orderbook-component', OrderbookComponent);
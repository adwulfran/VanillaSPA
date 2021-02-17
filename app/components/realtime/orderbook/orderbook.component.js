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
            console.log('check ?? ' + this.nom)
            //new OnInit();
            checkToLoad = checkToLoad + 1;
            if (window.location.hash === '#realtime-component') {
                var obj = JSON.parse(evt.data)
                if (obj.data.price !== undefined) {     
                    price.subscribe(obj.data.price)
                    if (obj.data.type == 0) {
                        document.getElementsByClassName('card-body')[2].style.color = 'green'
                    }
                    else {
                        document.getElementsByClassName('card-body')[2].style.color = 'red'
                    }
                }
                else {
                    document.getElementsByClassName('card-body')[2].innerHTML = LoaderComponentHTML
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
        for (var i = 0; i < 10; i++) {
            var liBids = document.createElement('li');
            liBids.className = 'bids';
            document.getElementsByClassName('card-body')[3].appendChild(liBids)
            var liAsks = document.createElement('li');
            liAsks.className = 'asks';
            document.getElementsByClassName('card-body')[1].appendChild(liAsks)
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
                        document.getElementsByClassName('bids')[i].innerHTML = el[0] + '&nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1]
                    })
                    obj.data.asks.slice(0, 10).reverse().forEach(function (el, i) {
                        document.getElementsByClassName('asks')[i].innerHTML = el[0] + ' &nbsp;&nbsp;&nbsp;&nbsp;    ' + el[1]
                    })
                }



            } else {
                websocket_orderbook.close()
            }

        }

    }

}
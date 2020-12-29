
export const WsTickerService = () => {

    var websocket = new WebSocket('wss://ws.bitstamp.net');
    const message = {
        event: "bts:subscribe",
        data: {
            channel: "live_trades_btcusd"
        }
    };
    websocket.onopen = function (evt) { websocket.send(JSON.stringify(message)) };
    websocket.onmessage = function (evt) {
        if (window.location.hash === '#realtime-component') {
            var obj = JSON.parse(evt.data)
            document.getElementsByClassName('card-body')[0].innerText = obj.data.price;
            if (obj.data.type == 0 ){
                document.getElementsByClassName('card-body')[0].style.backgroundColor = 'green'
            }
            else {
                document.getElementsByClassName('card-body')[0].style.backgroundColor = 'red'
            }
           
        } else {
            websocket.close()
        }
    }

}
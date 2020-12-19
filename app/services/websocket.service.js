const { TransactionService } = require('./transaction.service.js');
import Chart from 'chart.js';
export const WebSocketService = () => {



    var price = [];
    var dates = [];
    var chart;
    (async function asyncGetTransaction() {
        await TransactionService().then(data => {
            data.forEach(function (el, i) {
                price.push(el.price);
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                var date = new Date(el.date * 1000);
                // Hours part from the timestamp
                var hours = date.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                dates.push(formattedTime)
            })
            drawChart(dates.reverse().slice(1800, dates.length), price.reverse().slice(1800, price.length))
        })

    })()
    function drawChart(dates, price) {
        var options = {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: '# of Votes',
                        data: price,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            reverse: false
                        }
                    }]
                }
            }
        }
        var ctx = document.getElementById('chartJSContainer').getContext('2d');
        chart = new Chart(ctx, options);
        var websocket = new WebSocket('wss://ws.bitstamp.net');
    const message = {
        event: "bts:subscribe",
        data: {
            channel: "live_trades_btcusd"
        }
    };
    websocket.onopen = function (evt) { websocket.send(JSON.stringify(message)) };
    websocket.onmessage = function (evt) {
        if (window.location.hash === '#livestream-component') {
            var obj = JSON.parse(evt.data)
            console.log('ok? ' + JSON.stringify(obj))


            document.getElementsByClassName('card-body')[0].innerText = obj.data.price;
            price.push(obj.data.price);
            var date = new Date(obj.data.timestamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            dates.push(formattedTime)
            chart.data.datasets.data = price;
            chart.data.labels = dates;
            chart.update();
        } else {
            websocket.close()
        }
    }
    }


    
}
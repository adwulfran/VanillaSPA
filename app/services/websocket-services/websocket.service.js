const { TransactionService } = require('../http-services/transaction.service.js');
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
                var date = new Date(el.date * 1000)
                function getTimeString(p) {
                    var day = p.getDate();
                    var month = p.getMonth() + 1;
                    var year = p.getFullYear();
                    var hours = p.getHours();
                    var minutes = p.getMinutes();
                    var secondes = p.getSeconds();

                    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes
                }

                dates.push(getTimeString(date))
            })
            drawChart(dates.reverse().slice(0, dates.length), price.reverse().slice(0, price.length))
        })

    })()
    function drawChart(dates, price) {
        var config = {
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
                        reverse: false,
                        
                      
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    enabled: true,
                    mode: 'xy', // or 'x' for "drag" version
                }
            }
        }
        var ctx = document.getElementById('chartJSContainer').getContext('2d');
        chart = new Chart(ctx, config);
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
                if (obj.data.type == 0 ){
                    document.getElementsByClassName('card-body')[0].style.backgroundColor = 'green'
                }
                else {
                    document.getElementsByClassName('card-body')[0].style.backgroundColor = 'red'
                }
                price.push(obj.data.price);
                var date = new Date(obj.data.timestamp * 1000)

                function getTimeString(p) {
                    var day = p.getDate();
                    var month = p.getMonth() + 1;
                    var year = p.getFullYear();
                    var hours = p.getHours();
                    var minutes = p.getMinutes();
                    var secondes = p.getSeconds();

                    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes
                }



                // Will display time in 10:30:23 format
                dates.push(getTimeString(date))
                chart.data.datasets.data = price;
                chart.data.labels = dates;
                chart.update();
            } else {
                websocket.close()
            }
        }
    }





    var volume = [];
    var volumeColors = [];
    var datesVolume = [];
    var chartVolume;
    setTimeout(function() { 
    (async function asyncGetTransaction() {
        await TransactionService().then(data => {
            data.forEach(function (el, i) {
                volume.push(el.amount);
                if (el.type == 0) {
                    volumeColors.push("green")
                }
                else {
                    volumeColors.push("red")
                }
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                var date = new Date(el.date * 1000)
                function getTimeString(p) {
                    var day = p.getDate();
                    var month = p.getMonth() + 1;
                    var year = p.getFullYear();
                    var hours = p.getHours();
                    var minutes = p.getMinutes();
                    var secondes = p.getSeconds();

                    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes
                }

                datesVolume.push(getTimeString(date))
            })
            drawChart(datesVolume.reverse().slice(0, datesVolume.length), volume.reverse().slice(0, volume.length))
        })

    })()
    function drawChart(datesVolume, volume) {
        var config = {
            type: 'bar',
            data: {
                labels: datesVolume,
                datasets: [
                    {
                        label: '# of Votes',
                        data: volume,
                        backgroundColor : volumeColors,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        reverse: false,
                        
                      
                    }],
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    enabled: true,
                    mode: 'xy', // or 'x' for "drag" version
                }
            }
        }
        var ctx = document.getElementById('chartJSContainer2').getContext('2d');
        chartVolume = new Chart(ctx, config);
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
                    volume.push(obj.data.amount);
                    if (obj.data.type == 0) {
                        volumeColors.push("green")
                    }
                    else {
                        volumeColors.push("red")
                    }
                var date = new Date(obj.data.timestamp * 1000)

                function getTimeString(p) {
                    var day = p.getDate();
                    var month = p.getMonth() + 1;
                    var year = p.getFullYear();
                    var hours = p.getHours();
                    var minutes = p.getMinutes();
                    var secondes = p.getSeconds();

                    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes
                }



                // Will display time in 10:30:23 format
                datesVolume.push(getTimeString(date))
                chartVolume.data.datasets.data = volume;
                chartVolume.data.labels = datesVolume;
                chartVolume.update();
            } else {
                websocket.close()
            }
        }
    }


}, 4000)


}
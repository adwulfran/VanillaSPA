const { TransactionService } = require('../../../services/http-services/transaction.service.js');
import Chart from 'chart.js';

export class HistoricalChartComponent extends HTMLElement {
    constructor() {
        super();
        var price = [];
        var dates = [];

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
                drawChart(dates.reverse().slice(1000, dates.length), price.reverse().slice(1000, price.length))
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
            new Chart(ctx, options);
        }

    }
}
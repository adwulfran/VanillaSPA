const { TransactionService } = require('../../../services/http-services/transaction.service.js');
const { EchartsService } = require('../../../services/echarts-services/echarts.services.js');

export class CandlestickComponent extends HTMLElement {
    constructor() {

        super();
        
        var raw_data = [];
        async function GetTransaction(period) {
            raw_data = []; 
            await TransactionService(period).then(data => {
                data.data.ohlc.forEach(function (el, i) {
                    var arr = [];
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    var date = new Date(el.timestamp * 1000)
                    function getTimeString(p) {
                        var day = p.getDate();
                        day = day.toString();
                        if (day.length === 1) { day = '0' + day }
                        var month = p.getMonth() + 1;
                        month = month.toString()
                        if (month.length === 1) { month = '0' + month }
                        var year = p.getFullYear();
                        year = year.toString();
                        var hours = date.getHours();
                        // Minutes part from the timestamp
                        var minutes = "0" + date.getMinutes();
                        // Seconds part from the timestamp
                        var seconds = "0" + date.getSeconds();

                        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
                    }
                    var k = el.volume.indexOf('.');
                    var volumez = el.volume.slice(0, k)
                    arr.push(getTimeString(date), Number(el.open), Number(el.close), Number(el.low), Number(el.high), Number(volumez))
                    raw_data.push(arr);
                })
                EchartsService(raw_data);
            })
        }

        GetTransaction('60');

        var t = 0;
        var refreshTime = setInterval(function () {
            t = t + 1; console.log('t ' + t);
            if (window.location.hash !== '#realtime-component') {
                console.log(window.location.hash)
                clearInterval(refreshTime);
                clearInterval(refreshGT)
            }
        }, 1000);

        var refreshGT = setInterval(function () { GetTransaction('60'); t = 0; }, 60000)

        global.period = function period(e, period) {
            for (var i = 0; i < document.getElementsByClassName('period').length; i++) {
                document.getElementsByClassName('period')[i].classList.remove("underline_period")
            }
            e.classList.add('underline_period');
            clearInterval(refreshTime);
            clearInterval(refreshGT);
            GetTransaction(period);
            if (period === '60') {
                t = 0;
                refreshTime = setInterval(function () {
                    t = t + 1;
                    console.log('t '+t)
                    if (window.location.hash !== '#realtime-component') {
                        console.log(window.location.hash)
                        clearInterval(refreshTime);
                        clearInterval(refreshGT)
                    }
                }, 1000)
                refreshGT = setInterval(function () { GetTransaction('60'); t = 0; }, 60000)
            }
            
        }
       
    }

}

customElements.get('candlestick-component') || customElements.define('candlestick-component', CandlestickComponent);
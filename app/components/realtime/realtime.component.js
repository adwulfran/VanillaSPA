const { TransactionService } = require('../../services/http-services/transaction.service.js');
const { WsTickerService } = require('../../services/websocket-services/ws-ticker.service.js');
const { EchartsService } = require('../../services/echarts-services/echarts.services.js')

export class RealtimeComponent extends HTMLElement {

    constructor() {

        super();
        WsTickerService();

        var raw_data = [];
        async function GetTransaction() {
            raw_data = [];  
            await TransactionService().then(data => {
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
        
        GetTransaction();
        var t = 0;
        setInterval(function() { t = t + 1 ;},1000)
        setInterval(function(){ GetTransaction(); t = 0;}, 60000)

    }

}
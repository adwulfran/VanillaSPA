import { TransactionService } from '../../../services/http-services/transaction.service';
import { EchartsService } from '../../../services/echarts-services/echarts.services';


export class CandlestickComponent {
    raw_data: any = [];
    refreshTime:any;
    refreshGT: any;
    t:number = 0;

    constructor() {
        
        this.raw_data = [];
        this.GetTransaction('60');
        document.getElementById('minutes').addEventListener('click', (e: Event) => this.period(e, '60'));
        document.getElementById('hours').addEventListener('click', (e: Event) => this.period(e, '3600'));
        document.getElementById('days').addEventListener('click', (e: Event) => this.period(e, '86400'));
        document.getElementById('weeks').addEventListener('click', (e: Event) => this.period(e, '259200'))

    }

    async GetTransaction(period: any) {
        this.raw_data = [];
        await TransactionService(period).then(data => {
            data.data.ohlc.forEach((el: any) => {
                var arr = [];
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                var date = new Date(el.timestamp * 1000)
                function getTimeString(p: any) {
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
                this.raw_data.push(arr);
            })
            EchartsService(this.raw_data);
        })
    }
    
    period(e: any, periods: any) {
        for (var i = 0; i < document.getElementsByClassName('period').length; i++) {
            document.getElementsByClassName('period')[i].classList.remove("underline_period")
        }
        (e.target as Element).classList.add('underline_period');
        clearInterval(this.refreshTime);
        clearInterval(this.refreshGT);
        console.log('check periods ? ' + periods)
        this.GetTransaction(periods);
        if (periods === '60') {
            this.t = 0;
            this.refreshTime = setInterval( () => {
                this.t = this.t + 1;
                console.log('t '+this.t)
                if (window.location.hash !== '#realtime-component') {
                    console.log(window.location.hash)
                    clearInterval(this.refreshTime);
                    clearInterval(this.refreshGT)
                }
            }, 1000)
            this.refreshGT = setInterval(() => { this.GetTransaction('60'); this.t = 0; }, 60000)
        }
    }
    
}
new CandlestickComponent()
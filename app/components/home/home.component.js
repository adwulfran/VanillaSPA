const { TickerService } = require('../../services/ticker.service.js');
import { HistoricalChartComponent } from './historical-chart/historical-chart.component.js';
import HistoricalChartComponentHTML from './historical-chart/historical-chart.component.html';


export class HomeComponent extends HTMLElement {
    constructor(GetTicker = TickerService()) {
        super();
        GetTicker.then(data => {
            AddToTable(data.last, data.volume)
        })
        function AddToTable(lp, v) {
            document.querySelector('.card-title').innerText = lp+' $';
            document.querySelector('.card-text').innerText = 'volume : '+ v + ' bitcoins'
        }
        function reloadData() {
            GetTicker.then(data => {
                AddToTable(data.last)
            })
        }
        document.getElementsByTagName('historical-chart-component')[0].innerHTML = HistoricalChartComponentHTML;
        customElements.get('historical-chart-component') || customElements.define('historical-chart-component', HistoricalChartComponent);
        
    }
}
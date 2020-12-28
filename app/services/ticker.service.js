export const TickerService = () => {
    const url = 'https://www.bitstamp.net/api/ticker/';



    return fetch("https://www.bitstamp.net/api/ticker/", {
       
       
        "method": "GET",
        
    }).then((resp) => resp.json())
        .then(function (data) {
            return data
        })
}
export const TransactionService = (period) => {
    const url = 'https://www.bitstamp.net/api/v2/ohlc/btcusd/?step='+period+'&limit=1000';
    return fetch(url, { method: "GET"})
        .then((resp) => resp.json())
        .then(function (data) {
            return data
        })
}
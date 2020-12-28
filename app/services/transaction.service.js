export const TransactionService = () => {
    const url = 'https://www.bitstamp.net/api/v2/ohlc/btcusd/?step=60&limit=500';
    return fetch(url, { method: "GET"})
        .then((resp) => resp.json())
        .then(function (data) {
            return data
        })
}
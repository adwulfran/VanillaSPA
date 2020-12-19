export const TransactionService = () => {
    const url = 'https://www.bitstamp.net/api/transactions/';
    return fetch(url, { method: "GET"})
        .then((resp) => resp.json())
        .then(function (data) {
            return data
        })
}
import Web3 from 'web3'

let web3Object = new Promise(function(resolve, reject) {
        // Check for injected web3 (mist/metamask)
        var web3js = window.web3
        if (typeof web3js !== 'undefined') {
            var web3 = new Web3(web3js.currentProvider);
            resolve({
                //injectedWeb3: web3.isConnected(),
                web3() {
                    return web3
                }
            })
        } else {
            // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
            reject(new Error('Unable to connect to Metamask'))
        }
    })
    .then(result => {
        return new Promise(function(resolve, reject) {
            // Retrieve network ID
            result.web3().eth.getChainId((err, networkId) => {
                if (err) {
                    // If we can't find a networkId keep result the same and reject the promise
                    reject(new Error('Unable to retrieve network ID'))
                } else {
                    // Assign the networkId property to our result and resolve promise
                    result = Object.assign({}, result, { networkId })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function(resolve, reject) {
            // Retrieve coinbase
            result.web3().eth.getCoinbase((err, coinbase) => {
                if (err) {
                    reject(new Error('Unable to retrieve coinbase'))
                } else {
                    coinbase = "0xEaf66C61d57BC60A7fc0d352f7f339A22e30D4E9"
                    result = Object.assign({}, result, { coinbase })
                    resolve(result)
                }
            })
        })
    })
    .then(result => {
        return new Promise(function(resolve, reject) {
            // Retrieve balance for coinbase
            result.web3().eth.getBalance(result.coinbase, (err, balance) => {
                if (err) {
                    reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
                } else {
                    result = Object.assign({}, result, { balance })
                    resolve(result)
                }
            })
        })
    })

export default web3Object
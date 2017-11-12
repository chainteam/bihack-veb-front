const Web3 = require('web3')
const abi = require('./abi')
const cfg = require('./config')
const web3 = new Web3(new Web3.providers.HttpProvider(cfg.nodeProvider))

module.exports = function(component) {
  function _fake(req, res, next) {
    res.send('FAKE')
  }

  //  contract = new web3.eth.Contract(abi, cfg.contractAddress)

  return {
    fake: _fake
  }
}

const Web3 = require('web3')
const abi = require('./abi')
const cfg = require('./config')
const web3 = new Web3(new Web3.providers.HttpProvider(cfg.nodeProvider))
const Contract = new web3.eth.Contract(abi, cfg.contractAddress)

module.exports = function(component) {
  function _fake(req, res, next) {
    res.send('FAKE')
  }

  function _find(req, res, next) {
    console.log(req.body)
    if (req.body) {
      Contract.methods.getRequest().call((err, resp) => {
        console.log(err, resp)
        res.json(resp)
      })
    } else {
      res.send()
    }
  }

  return {
    fake: _fake,
    find: _find
  }
}

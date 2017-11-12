const Web3 = require('web3')
const abi = require('./abi')
const YSP = require('yahoo-stock-prices')
const schedule = require('node-schedule')
const cfg = require('./config')
const web3 = new Web3(new Web3.providers.HttpProvider(cfg.nodeProvider))


/**
 *
 * оракул меряет верхнюю и нижнюю границу один раз в день
 * и в случае наступления страхового случая вызывает метод [stop]
 * в смарт-контракте после чего прекращает свою работу
 *
 * один раз в квартал (7884000 секунд от startDate контракта) он дергает метод
 * getProfit() вплоть до startDate + period
 *
 */


class Oracul {

  constructor() {
    this.contractAddress = cfg.contractAddress
    this.contract = new web3.eth.Contract(abi, cfg.contractAddress)
    this.stocks = cfg.noteStocks
    this.startTime = null
    this.limits = {}
    this.stocks.forEach(stock => {
      this.limits[stock] = {
        high: null,
        low: null,
      }
    })
  }


  getStartContract() {
    return this.contract.startDate()
  }


  getLimits() {
    this.stock.forEach(stock => {
      this.limits[stock] = {
        high: this.contract.getHigh(stock),
        low: this.contract.getLow(stock),
      }
    })
  }


  getStartContract() {
    this.contract.methods.startTime().call((err, resp) => {
      !err && (this.startDate = resp)
    })
  }


  cron() {
    this.startDate && schedule.scheduleJob({
      start: new Date(this.startDate),
      // end: endTime,
      rule: '0 0 0 1 */3 *'
    }, function() {
      this.contract.methods.getProfit().call((err, resp) => {
        console.log(err, resp)
      })
    })
  }


  checkNote() {
    stocks.forEach(stock => {
      try {
        YSP.getCurrentPrice(stock, function(err, price) {
          console.log(stock, price)
          if (price > this.limits[stock].high) {
            this.contract.methods.insuranceUpperCaseHappened(stock, 'high', price).call((err, resp) => {
              console.log(err, resp)
            })
          }
          if (price < this.limits[stock].low) {
            this.contract.methods.insuranceLowerCaseHappened(stock, 'low', price).call((err, resp) => {
              console.log(err, resp)
            })
          }
        })
      } catch (e) {
        console.error('Failed fetch price', price, e)
      }
    })
  }


  test() {
    this.contract.methods.startTime().call((err, resp) => {
      console.log(err, resp);
    });
  }


  start() {

    this.contract.methods.assetsAdded().call((err, resp) => {
      console.log('assetsAdded', err, resp);
      if (resp) {
        this.getLimits()

        setInterval(() => {
          this.checkNote()
        }, cfg.checkTimeout)
      }
    })


  }

}


const oracul = new Oracul()
oracul.test()

var m = require('mithril')

var CurrencyTabs = require('./views/CurrencyTabs')
var PeriodTabs = require('./views/PeriodTabs')
var HistoricData = require('./views/HistoricData')
var Layout = require('./views/Layout')
var TotalData = require('./views/TotalData')
var Stats = require('./models/Stats')

var TotalView = {
  render: function () {
    return <Layout tabs={<CurrencyTabs />} data={<TotalData />} />
  }
}

m.route(document.getElementById('app'), '/total', {
  '/total': TotalView,
  '/total/:period': TotalView,
  '/:currency/:period': {
    render: function () {
      return <Layout tabs={[<CurrencyTabs />, <PeriodTabs />]} data={<HistoricData />} />
    }
  },
  '/:404...': {
    render: function () {
      window.location.replace('/404')
    }
  }
})

// Poll for new data every 30 seconds
setInterval(Stats.loadData, 30 * 1000)
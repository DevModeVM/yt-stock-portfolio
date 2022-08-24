const yahooFinance = require('yahoo-finance2').default
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('frontend'))

app.get('/price', async (req, res) => {
  const symbol = req.query.symbol
  if (!symbol) {
    return res.status(404).send('Not found')
  }
  try {
    const result = await yahooFinance.quoteSummary(symbol, {
      modules: ['financialData'],
    })
    if (result.financialData && result.financialData.currentPrice) {
      res.send({
        symbol: symbol,
        price: result.financialData.currentPrice,
      })
    } else {
      return res.status(404).send('Not found')
    }
  } catch (err) {
    res.send(err)
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

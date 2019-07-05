/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
/*
import renderBuy from './blue-buy/render';

*/
const app = express()
app.use(morgan('dev'))
app.use('/', express.static('./dist/public'))
app.use('/notes', express.static('./dist/public'))
/*
app.use('/blue-buy', (req, res) => {
  res.send(renderBuy());
});
app.use('/blue-basket', (req, res) => {
  res.send(renderBasket(0));
});
*/

const port = 3001
app.listen(port)
console.log(`card notes running at http://127.0.0.1:${port}`)

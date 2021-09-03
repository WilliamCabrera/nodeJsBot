let jsonData = require('./Data/MATIC/matic.json');
//const EMATechInd = require('technicalindicators').EMA
const EMATechInd = require('./utils/index.js').EMA
const BBTechInd = require('./utils/index.js').BollingerBands


const ema = require('./utils/functions.js').EMA
const sma = require('./utils/functions.js').SMA
const bollingerbans = require('./utils/functions.js').BB



let period = 5;
let emaVal = ema(jsonData.MATIC['1D'].close, period)
let smaVal = sma(jsonData.MATIC['1D'].close, period)
let bb = bollingerbans(jsonData.MATIC['1D'].close, period)

//console.log(emaVal)
console.log(bb)
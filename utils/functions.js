/**
 * 
 * @param {* List of elements} array 
 * @param {* starting element index } from 
 * @param {* last element index} to 
 * @returns List[any] elements between index from and to
 */
let getItems = (array, from, to) => {

    let result = []
    if (from > to || array == undefined)
        return result

    for (let index = from; index < Math.min(array.length, to); index++) {
        result.push(array[index])
    }
    return result
}

/**
 * 
 * @param {* array[int]: list of the closing prices} close 
 * @param {* int: represents the number of candlestick to look back} period 
 * @returns list[float] Standard Deviation (sd)
 */
let StandardDeviation = (close, period) => {

    let standardDeviations = []

    let startingValue = 0

    let sma = getItems(close, 0, period).reduce((a, b) => a + b) / period

    // store the sma values
    //let sma = SMA(close, period)

    for (let index = period; index < close.length; index++) {

        startingValue = close[index - period]
        sma = sma + close[index] / period - startingValue / period
        let sd = 0
        for (let j = 0; j < period; j++) {
            sd += Math.pow(close[index - j] - sma, 2) / period
        }
        standardDeviations.push(Math.sqrt(sd))
    }

    return standardDeviations
}

/**
 * 
 * @param {* array[int]: list of the closing prices} close 
 * @param {* int: represents the number of candlestick to look back} period 
 * @returns list[float] Simple Moving Average (sma)
 */
let SMA = (close, period) => {


    let startingValue = 0

    // storing the sma for the n-first values (n=period) very first candlestick
    let sma = getItems(close, 0, period).reduce((a, b) => a + b) / period

    let result = []

    for (let index = period; index < close.length; index++) {
        startingValue = close[index - period]
        sma = sma + close[index] / period - startingValue / period
        result.push(sma)
    }

    return result;

}

/**
 * 
 * @param {* int: represents the number of candlestick to look back} period 
 * @param {*float: represents the current closing price} price 
 * @param {* float: prevoius candlestick EMA (SMA for the very fist candlestick)} previousEma 
 * @returns float: Exponential Moving Average
 */
let EMAFormula = (period, price, previousEma) => {

    let weight = 2 / (period + 1)
    return (price - previousEma) * weight + previousEma

}

/**
 * 
 * @param {* array[int]: list of the closing prices} close 
 * @param {* int: epresents the number of candlestick to look back} period 
 * @returns list[float] Exponential Moving Average (ema)
 */
const EMA = (close, period) => {

    // storing the sma for the very first candlestick
    let result = [getItems(close, 0, period).reduce((a, b) => a + b) / period]

    for (let index = period + 1; index < close.length; index++) {
        let price = close[index];
        let ema = EMAFormula(period, price, result[result.length - 1])
        result.push(ema)
    }
    return result
}

/**
 * 
 * @param {* array[int]: list of the closing prices} close 
 * @param {* int: epresents the number of candlestick to look back} period 
 * @param {* sd factor} sdParam 
 * @returns List[{sma,upper,lower,pd},....] return a list with with each element of the bands
 */
const BollingerBands = (close, period, sdParam = 2) => {

    let BB = []
    let sma = SMA(close, period)
    let sd = StandardDeviation(close, period)

    for (let index = 0; index < sma.length; index++) {

        let upper = sma[index] + (sd[index] * sdParam)
        let lower = sma[index] - (sd[index] * sdParam)

        BB.push({
            middle: sma[index],
            upper: upper,
            lower: lower,
            pb: (close[index] - lower) / (upper - lower)
        })
    }

    return BB
}

module.exports = {
    'EMA': EMA,
    'SMA': SMA,
    'BB': BollingerBands
};
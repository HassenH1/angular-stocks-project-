import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR']
let service: string = 'https://angular2-in-action-api.herokuapp.com'

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  get(){
    return stocks.slice()
  }

  add(stock){
    stocks.push(stock)
    return this.get()
  }

  remove(stock){
    stocks.splice(stocks.indexOf(stock), 1)
    return this.get()
  }

  load(symbols){
    if(symbols){          
      return this.http.get<Array<StockInterface>>(`${service}/stocks/snapshot?symbols=${symbols.join()}`)
      //<Array<StockInterface>> --> is known as type variable that tells the get() method what type of object it should expect, and in thus case it'll expect to get an array of objects that conform to the StockInterface
    }
  }
}

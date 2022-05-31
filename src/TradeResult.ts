import { sumWithMaxPrecision } from './Functions'
import { ExchangeSymbol } from './Types'

export class TradeResult {
  symbol: ExchangeSymbol;
  quantity = 0;
  // todo: get rid of either paid or cost field
  cost = 0;
  paid = 0;
  gained = 0;
  soldPrice: number;
  profit = 0;
  commission = 0;
  msg: string;
  fromExchange = false;

  constructor(symbol: ExchangeSymbol, msg = "") {
    this.symbol = symbol;
    this.msg = msg;
  }

  get price(): number {
    return +(this.cost / this.quantity).toFixed(8);
  }

  toString(): string {
    return `${this.symbol} => Qty: ${this.quantity}, Av. price: ${this.price}, Paid: ${this.paid}, Sold price: ${this.soldPrice}, Gained: ${this.gained}, Commission BNB: ${this.commission}, Profit: ${this.profit}, Msg: ${this.msg}`;
  }

  /**
   * @example "Bought 21 DAR for 9.81183 BUSD. Average price: 0.46723"
   */
  toTradeString(): string {
    return `${this.soldPrice ? "Sold" : "Bought"} ${this.quantity} ${
      this.symbol.quantityAsset
    } for ${this.cost} ${this.symbol.priceAsset}. Price: ${this.price}`;
  }

  join(next: TradeResult): TradeResult {
    if (this.fromExchange !== next.fromExchange) {
      throw Error(
        `Cannot join trades where 'fromExchange' is not equal: ${next.toString()}`
      );
    }
    if (this.symbol.quantityAsset !== next.symbol.quantityAsset) {
      throw Error(
        `Cannot join trades where 'quantityAsset' is not equal: current=${this.symbol.quantityAsset} next=${next.symbol.quantityAsset}`
      );
    }
    const result = new TradeResult(next.symbol, next.msg);
    result.commission = this.commission + next.commission;
    result.fromExchange = next.fromExchange;
    result.addQuantity(this.quantity, this.cost);
    result.addQuantity(next.quantity, next.cost);
    return result;
  }

  addQuantity(quantity: number, cost: number): void {
    // we should maintain the precision returned by Binance for quantity
    this.quantity = sumWithMaxPrecision(this.quantity, quantity);
    this.cost += cost;
    this.paid += cost;
  }
}

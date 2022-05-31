import { TradeMemo } from "./TradeMemo";
import { Coin } from "./Types";

export interface AssetsResponse {
  stableCoins: Coin[];
  trades: TradeMemo[];
}

import { TradeMemo } from "./TradeMemo"
import { Coin } from "./Types"

export type AssetsResponse = {
  stableCoins: Coin[]
  trades: TradeMemo[]
}

import { ScoreSelectivityKeys } from "./Types";

export type ScoreValueMap = {
  [key in ScoreSelectivityKeys]: number;
};

export class CoinScore {
  private readonly n: string;
  /**
   * The map of score value for each selectivity level.
   */
  private readonly sm: ScoreValueMap = {
    EXTREME: 0,
    HIGH: 0,
    MODERATE: 0,
    MINIMAL: 0,
  };

  constructor(coinName: string, obj?: any) {
    this.n = coinName;
    this.sm = obj?.sm ?? this.sm;
  }

  static migrateOldScore(
    old: any,
    cs: CoinScore,
    key: keyof ScoreValueMap
  ): void {
    if (old.r) {
      cs.sm[key] = old.r;
    }
  }

  static fromObject(obj: object): CoinScore {
    return Object.assign(Object.create(CoinScore.prototype), obj);
  }

  getScore(key: keyof ScoreValueMap): number {
    return this.sm ? this.sm[key] : 0;
  }

  get coinName(): string {
    return this.n;
  }

  addScore(key: keyof ScoreValueMap, value: number): void {
    this.sm[key] += value;
  }
}

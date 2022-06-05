import { ScoreSelectivity } from "./Types";

export class CoinScore {
  private readonly n: string;
  /**
   * The map of score value for each selectivity level.
   */
  private readonly sm: {
    [ScoreSelectivity.EXTREME]: number;
    [ScoreSelectivity.HIGH]: number;
    [ScoreSelectivity.MODERATE]: number;
    [ScoreSelectivity.MINIMAL]: number;
  } = {
    [ScoreSelectivity.EXTREME]: 0,
    [ScoreSelectivity.HIGH]: 0,
    [ScoreSelectivity.MODERATE]: 0,
    [ScoreSelectivity.MINIMAL]: 0,
  };

  constructor(coinName: string, obj?: any) {
    this.n = coinName;
    this.sm = obj?.sm ?? this.sm;
  }

  static migrateOldScore(
    old: any,
    cs: CoinScore,
    selectivity: ScoreSelectivity
  ): void {
    if (old.r) {
      cs.sm[selectivity] = old.r;
    }
  }

  static fromObject(obj: object): CoinScore {
    return Object.assign(Object.create(CoinScore.prototype), obj);
  }

  getScore(selectivity: ScoreSelectivity): number {
    return this.sm ? this.sm[selectivity] : 0;
  }

  get coinName(): string {
    return this.n;
  }

  addScore(selectivity: ScoreSelectivity, value: number): void {
    this.sm[selectivity] += value;
  }
}

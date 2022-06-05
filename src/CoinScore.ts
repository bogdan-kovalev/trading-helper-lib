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

  /**
   * @deprecated
   */
  private r = 0;

  constructor(coinName: string, obj?: CoinScore) {
    this.n = coinName;
    this.sm = obj?.sm ?? this.sm;
    this.r = obj?.r ?? this.r;
  }

  static fromObject(obj: object): CoinScore {
    return Object.assign(new CoinScore(``), obj);
  }

  getScore(selectivity: ScoreSelectivity): number {
    return this.sm[selectivity];
  }

  get coinName(): string {
    return this.n;
  }

  addScore(selectivity: ScoreSelectivity, value: number): void {
    this.sm[selectivity] += value;
  }

  /**
   * The number of times this coin was going up when the rest of the market wasn't.
   * @deprecated
   */
  get score(): number {
    return this.r;
  }

  /**
   * @deprecated
   */
  scoreUp(): void {
    this.r++;
  }

  /**
   * @deprecated
   */
  scoreDown(): void {
    this.r > 0 && this.r--;
  }
}

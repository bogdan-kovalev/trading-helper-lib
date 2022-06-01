export class CoinScore {
  private readonly n: string;
  private r = 0;

  constructor(coinName: string, obj?: CoinScore) {
    this.n = coinName;
    this.r = obj?.r ?? this.r;
  }

  static fromObject(obj: object): CoinScore {
    return Object.assign(Object.create(CoinScore.prototype), obj);
  }

  /**
   * The number of times this coin was going up when the rest of the market wasn't.
   */
  get score(): number {
    return this.r;
  }

  get coinName(): string {
    return this.n;
  }

  scoreUp(): void {
    this.r++;
  }

  scoreDown(): void {
    this.r > 0 && this.r--;
  }
}

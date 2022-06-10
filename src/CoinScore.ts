import { ScoreSelectivity, ScoreSelectivityKeys } from "./Types";
import { enumKeys } from "./Functions";

const shortMapping: { [key in ScoreSelectivityKeys]: ShortMappingKeys } = {
  EXTREME: `E`,
  HIGH: `H`,
  MODERATE: `M`,
  MINIMAL: `MI`,
};

type ShortMappingKeys = `E` | `H` | `M` | `MI`;

export class CoinScore {
  private readonly n: string;
  /**
   * The map of score value for each selectivity level.
   */
  private readonly sm: { [key in ShortMappingKeys]: number } = {
    E: 0,
    H: 0,
    M: 0,
    MI: 0,
  };

  constructor(coinName: string, obj?: any) {
    this.n = coinName;
    this.sm = obj?.sm ?? this.sm;
  }

  static migrateOldScore(
    old: any,
    cs: CoinScore,
    key: ScoreSelectivityKeys
  ): void {
    if (old?.r) {
      cs.sm[key] = old.r;
    }
    enumKeys<ScoreSelectivityKeys>(ScoreSelectivity).forEach((k) => {
      cs.sm[shortMapping[k]] = old?.[k] ?? 0;
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete cs.sm[k];
    });
  }

  static fromObject(obj: object): CoinScore {
    return Object.assign(Object.create(CoinScore.prototype), obj);
  }

  getScore(key: ScoreSelectivityKeys): number {
    return this.sm ? this.sm[shortMapping[key]] : 0;
  }

  get coinName(): string {
    return this.n;
  }

  addScore(key: ScoreSelectivityKeys, value: number): void {
    this.sm[shortMapping[key]] += value;
  }
}

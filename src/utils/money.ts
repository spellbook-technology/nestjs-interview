import { Expose } from 'class-transformer';

export class Money {
  subunit: number;
  currency: string;

  constructor(subunit: number, currency: string) {
    this.subunit = subunit;
    this.currency = currency;
  }

  @Expose()
  formatted() {
    return `${this.subunit / 100} ${this.currency}`;
  }
}

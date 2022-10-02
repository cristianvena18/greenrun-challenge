import {Money, Currencies} from "ts-money";


class CustomMoney extends Money {
  static USD(amount: number): CustomMoney {
    return CustomMoney.fromInteger(amount, Currencies.USD);
  }

  static EUR(amount: number): CustomMoney {
    return CustomMoney.fromInteger(amount, Currencies.EUR);
  }

  static fromPrimitives(amount: number) {
    if (amount < 0) {
      return CustomMoney.fromDecimal(amount, 'USD');
    }

    return CustomMoney.fromInteger(amount, 'USD')
  }
}

export default CustomMoney;

import {Money, Currencies} from "ts-money";


class CustomMoney extends Money {
  static USD(amount: number): CustomMoney {
    return CustomMoney.fromInteger(amount, Currencies.USD);
  }

  static EUR(amount: number): CustomMoney {
    return CustomMoney.fromInteger(amount, Currencies.EUR);
  }
}

export default CustomMoney;

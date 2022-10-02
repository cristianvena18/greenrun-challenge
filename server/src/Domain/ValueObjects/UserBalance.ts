import Money from "./Money";
import Uuid from "./Uuid";

class UserBalance {

  constructor(
    private id: Uuid,
    private amount: Money,
  ) {}


  getBalance() {
    return this.amount;
  }

  getUserId(): Uuid {
    return this.id;
  }
}

export default UserBalance;

import {IUserRepository} from "../../../Domain/Contracts/IUserRepository";
import {User} from "../../../Domain/Entities/User";
import {Knex} from "knex";
import EntityNotFound from "../../../Domain/Exceptions/EntityNotFound";
import UserBet from "../../../Domain/Entities/UserBet";

class KnexUserRepository implements IUserRepository {
  constructor(
    private connection: Knex
  ) {
  }

  async getByIdOrFail(id: string): Promise<User> {

    const user = await this.repository().where({id}).first();

    if (!user) {
      throw new EntityNotFound();
    }

    const transactions = await this.connection('transactions').where({user_id: id});

    user.transactions = transactions;

    return User.fromPrimitives(user);
  }

  async save(user: User): Promise<void> {
    const primitives = user.toPrimitives();

    for (const transaction of primitives.transactions) {
      await this.connection('transactions').insert(transaction).onConflict().ignore();
    }

    const count = await this.repository().where({id: primitives.id}).count();
    const exists = count[0]['count(*)'] > 0;

    delete primitives.transactions;

    if (!exists) {
      await this.repository().insert(primitives);
    } else {
      await this.repository().update(primitives);
    }
  }

  private repository() {
    return this.connection('users')
  }

}

export default KnexUserRepository;

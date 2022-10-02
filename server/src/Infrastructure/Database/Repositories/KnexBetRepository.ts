import {IBetRepository} from "../../../Domain/Contracts/IBetRepository";
import Bet from "../../../Domain/Entities/Bet";
import {Knex} from "knex";
import EntityNotFound from "../../../Domain/Exceptions/EntityNotFound";

class KnexBetRepository implements IBetRepository {
  constructor(private connection: Knex) {}

  async getByIdOrFail(id: string): Promise<Bet> {
    const primitives = await this.repository().where({id}).first();

    if (!primitives) {
      throw new EntityNotFound('bet not found');
    }

    return Bet.fromPrimitives(primitives);
  }

  async save(bet: Bet): Promise<void> {
    const primitives = bet.toPrimitives();

    for (const user of primitives.users) {
      await this.connection('user_bets').insert(user)
    }
    delete primitives.users;

    const count = await this.repository().where({id: primitives.id}).count();
    const exists = count[0]['count(*)'] > 0;

    if (!exists) {
      await this.repository().insert(primitives);
    } else {
      await this.repository().update(primitives);
    }
  }

  private repository() {
    return this.connection('bets');
  }
}

export default KnexBetRepository;

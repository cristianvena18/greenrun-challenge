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
      await this.connection('user_bets').insert(user).onConflict().merge(['odd', 'updated_at', 'state']);
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

  // @ts-ignore
  async getFullByIdOrFail(id: string): Promise<Bet> {
    const bet = await this.repository().where({id}).first();

    if (!bet) {
      throw new EntityNotFound('bet not found');
    }

    let userBetsCompleted = []

    const userBets = await this.connection('user_bets').where({'bet_id': id}).select();

    for (const userBet of userBets) {
      const user = await this.connection('users').where({id: userBet.user_id}).first();
      userBetsCompleted.push({...userBet, user});
    }

    bet.users = userBetsCompleted;

    return Bet.fromPrimitives(bet);
  }

  private repository() {
    return this.connection('bets');
  }
}

export default KnexBetRepository;

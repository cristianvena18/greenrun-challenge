import Bet from "../Entities/Bet";

export interface IBetRepository {
  getByIdOrFail(id: string): Promise<Bet>;

  save(bet: Bet): Promise<void>;

  getFullByIdOrFail(id: string): Promise<Bet>;
}

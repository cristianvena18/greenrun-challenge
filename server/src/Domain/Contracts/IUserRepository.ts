import {User} from "../Entities/User";

export interface IUserRepository {
  getByIdOrFail(id: string): Promise<User>;

  save(user: User): Promise<void>;
}

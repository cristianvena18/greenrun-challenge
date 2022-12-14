import { v4 } from "uuid";
import validate from "uuid-validate";


class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  toString(): string {
    return this.value;
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new Error(
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }
}

export default Uuid;

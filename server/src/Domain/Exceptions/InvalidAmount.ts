export class InvalidAmount extends Error {
  constructor(message: string = 'invalid amount provided') {
    super(message);
  }
}

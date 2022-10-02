export class BetNotActiveException extends Error {
  constructor(message: string = 'bet is not active') {
    super(message);
  }
}

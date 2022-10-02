export class InsufficientMoneyException extends Error {

  constructor(message: string = 'insufficient money') {
    super(message);
  }
}

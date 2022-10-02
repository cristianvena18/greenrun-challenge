class UnprocessableStatusChange extends Error {

  constructor(message: string = 'unprocessable status change detected') {
    super(message);
  }
}

export default UnprocessableStatusChange;

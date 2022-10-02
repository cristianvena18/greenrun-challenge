class ForbiddenUserException extends Error {

  constructor(message: string = 'access denied') {
    super(message)
  }

}

export default ForbiddenUserException;

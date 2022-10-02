class EntityNotFound extends Error{

  constructor(message: string = "entity not found") {
    super(message);
  }
}

export default EntityNotFound;

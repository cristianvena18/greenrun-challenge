import {ResponseObject, ResponseToolkit} from "@hapi/hapi";
import {BetNotActiveException} from "../../Domain/Exceptions/BetNotActiveException";
import EntityNotFound from "../../Domain/Exceptions/EntityNotFound";
import ForbiddenUserException from "../../Domain/Exceptions/ForbiddenUserException";
import {InsufficientMoneyException} from "../../Domain/Exceptions/InsufficientMoneyException";
import {InvalidAmount} from "../../Domain/Exceptions/InvalidAmount";
import UnprocessableStatusChange from "../../Domain/Exceptions/UnprocessableStatusChange";

export class ErrorHandler {

  static resolve(error: Error, h: ResponseToolkit): ResponseObject {

    console.error({error, message: 'handling error'});

    if (error instanceof BetNotActiveException) {
      return h.response({message: error.message}).code(409);
    }

    if (error instanceof EntityNotFound) {
      return h.response({message: error.message}).code(404);
    }

    if (error instanceof ForbiddenUserException) {
      return h.response({message: error.message}).code(403);
    }

    if (error instanceof InsufficientMoneyException) {
      return h.response({message: error.message}).code(422);
    }

    if (error instanceof InvalidAmount) {
      return h.response({message: error.message}).code(400);
    }

    if (error instanceof UnprocessableStatusChange) {
      return h.response({message: error.message}).code(422);
    }

    return h.response({message: error.message}).code(500);
  }

}

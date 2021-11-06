import AppError from "../errors/app-error";
import { Request, Response, NextFunction } from "express";
import TicketPick from "../domain/models/ticket-pick";
export default function validateRequest(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  validateMainBody(request);
  validateDateAttribute(request);
  validatePicks(request);

  return next();
}

function validateMainBody(request: Request) {
  if (!request.body.date || !request.body.picks) {
    throw new AppError("Attributes Date and picks are mandatory ", 400);
  }
}

function validateDateAttribute(request: Request) {
  const requestDate = request.body.date;
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (requestDate.match(regEx) === null) {
    throw new AppError("Invalidate date format, please use yyyy--mm--dd", 400);
  }
  const date = new Date(requestDate);
  if (date.toString() === "Invalid Date") {
    throw new AppError("Invalidate date value", 400);
  }
}

function validatePicks(request: Request) {
  const picks: TicketPick[] = request.body.picks;
  if (!picks || picks.length === 0) {
    throw new AppError("Please insert Ticket picks", 400);
  }

  picks.forEach((pick) => {
    validateTicketNumbers(pick.ticketNumbers);
  });
}

function validateTicketNumbers(ticketNumbers: string[]) {
  if (ticketNumbers.length !== 6) {
    throw new AppError(
      "Please, insert 6 numbers into Ticket Number element",
      400
    );
  }

  ticketNumbers.forEach((number) => {
    const numberConverted = Number(number);
    if (isNaN(numberConverted)) {
      throw new AppError(
        "Please include only number related strings in the Ticket Numbers element"
      );
    }
    if (numberConverted < 0 || numberConverted > 69) {
      throw new AppError("The ticket numbers should be from 0 to 69");
    }
  });
}

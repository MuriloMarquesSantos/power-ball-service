export default class TicketPick {
  hasWon: boolean;
  prize: number;
  ticketNumbers: string[];

  constructor(hasWon: boolean, prize: number, ticketNumbers: string[]) {
    this.hasWon = hasWon;
    this.prize = prize;
    this.ticketNumbers = ticketNumbers;
  }
}

import TicketPick from "./ticket-pick";

export default class PowerBallTicket {
  drawDate: string;
  picks: TicketPick[];
  constructor(drawDate: string, picks: TicketPick[]) {
    this.drawDate = drawDate;
    this.picks = picks;
  }
}

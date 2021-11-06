import PowerBallTicket from "../domain/models/powerball-ticket";

export default interface PowerBallResponseDTO {
  ticket: PowerBallTicket;
  totalPrize: number;
}

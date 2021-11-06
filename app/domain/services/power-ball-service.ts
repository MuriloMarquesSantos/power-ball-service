import Ticket from "../models/powerball-ticket";
import TicketPick from "../models/ticket-pick";
import PrizeRepository from "../../repositories/prize-repository";
import PowerBallResponseDTO from "../../dtos/power-ball-response-dto";
import NyGovClientResponseDTO from "../../dtos/ny-gov-client-response-dto";
import INyGovClient from "../../clients/interfaces/i-ny-gov-client";
import AppError from "../../errors/app-error";
import PowerBallTicket from "../models/powerball-ticket";

export default class PowerBallService {
  private prizeRepository: PrizeRepository;
  private nyGovClient: INyGovClient;
  constructor(prizeRepository: PrizeRepository, nyGovClient: INyGovClient) {
    this.prizeRepository = prizeRepository;
    this.nyGovClient = nyGovClient;
  }
  public async determineWinOrLoss(
    powerballTicket: Ticket
  ): Promise<PowerBallResponseDTO> {
    let nyGovClientResponse: NyGovClientResponseDTO | undefined;
    try {
      nyGovClientResponse = await this.nyGovClient.getPrizeInformation(
        powerballTicket.drawDate
      );
    } catch (error) {
      throw error;
    }

    if (
      nyGovClientResponse === undefined ||
      nyGovClientResponse.winning_numbers.length === 0
    ) {
      throw new AppError("No data available for that date", 400);
    }

    const finalPrize = this.calculateFinalPrize(
      powerballTicket,
      nyGovClientResponse
    );

    return {
      ticket: powerballTicket,
      totalPrize: finalPrize,
    };
  }

  private calculateFinalPrize(
    powerballTicket: PowerBallTicket,
    nyGovClientResponse: NyGovClientResponseDTO
  ): number {
    return powerballTicket.picks
      .map((ticketPick) =>
        this.getTicketLotteryPrize(
          ticketPick,
          nyGovClientResponse.winning_numbers,
          nyGovClientResponse.power_ball
        )
      )
      .reduce((accumulator, prize) => accumulator + prize, 0);
  }

  private getTicketLotteryPrize(
    ticketPick: TicketPick,
    winningNumbers: string[],
    power_ball: string
  ): number {
    const powerBallTicketNumber = ticketPick.ticketNumbers[5];
    const wonPowerBall = power_ball === powerBallTicketNumber;
    this.removePowerBall(ticketPick);
    const userWinningNumbers = ticketPick.ticketNumbers.filter((ticketNumber) =>
      winningNumbers.includes(ticketNumber)
    );

    const prize = this.prizeRepository.getTicketPrize(
      wonPowerBall,
      userWinningNumbers.length
    );

    ticketPick.prize = prize;
    ticketPick.hasWon = prize !== 0;

    return ticketPick.prize;
  }

  private removePowerBall(ticketPick: TicketPick) {
    ticketPick.ticketNumbers.splice(5, 1);
  }
}

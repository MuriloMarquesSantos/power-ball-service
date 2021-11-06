import TicketPick from "../../../app/domain/models/ticket-pick";
import NyGovClientFake from "../../../app/clients/fakes/ny-gov-client-fake";
import PowerBallTicket from "../../../app/domain/models/powerball-ticket";
import PrizeRepository from "../../../app/repositories/prize-repository";
import PowerBallService from "../../../app/domain/services/power-ball-service";
import AppError from "../../../app/errors/app-error";

let powerBallService: PowerBallService;
let nyGovClientFake: NyGovClientFake;
let prizeRepository: PrizeRepository;

describe("PowerBallService", () => {
  beforeEach(() => {
    nyGovClientFake = new NyGovClientFake();
    prizeRepository = new PrizeRepository();
    powerBallService = new PowerBallService(prizeRepository, nyGovClientFake);
  });

  it("Should determine win or loss succesfuly given existing draw date", async () => {
    const ticketPick = new TicketPick(true, 10, [
      "10",
      "27",
      "29",
      "44",
      "58",
      "24",
    ]);
    const powerBallTicket = new PowerBallTicket("2021-10-27T00:00:00.000", [
      ticketPick,
    ]);
    const response = await powerBallService.determineWinOrLoss(powerBallTicket);

    expect(response).not.toBe(undefined);
    expect(response.totalPrize).toBe(2000000)

  });

  it("Should determine win or loss succesfuly given existing draw date, without powerball win", async () => {
    const ticketPick = new TicketPick(true, 10, [
      "10",
      "27",
      "29",
      "44",
      "58",
      "25",
    ]);
    const powerBallTicket = new PowerBallTicket("2021-10-27T00:00:00.000", [
      ticketPick,
    ]);
    const response = await powerBallService.determineWinOrLoss(powerBallTicket);

    expect(response).not.toBe(undefined);
    expect(response.totalPrize).toBe(1000000)

  });

  it("Should determine win or loss succesfuly given existing draw date, with powerball win and 4 right numbers", async () => {
    const ticketPick = new TicketPick(true, 10, [
      "10",
      "27",
      "29",
      "43",
      "58",
      "24",
    ]);
    const powerBallTicket = new PowerBallTicket("2021-10-27T00:00:00.000", [
      ticketPick,
    ]);
    const response = await powerBallService.determineWinOrLoss(powerBallTicket);

    expect(response).not.toBe(undefined);
    expect(response.totalPrize).toBe(50000)

  });

  it("Should throw error given non existing draw date", async () => {
    const ticketPick = new TicketPick(false, 10, ["1", "2", "3"]);
    const powerBallTicket = new PowerBallTicket("2021-10-31T00:00:00.000", [
      ticketPick,
    ]);

    expect(
      powerBallService.determineWinOrLoss(powerBallTicket)
    ).rejects.toBeInstanceOf(AppError);
  });
});

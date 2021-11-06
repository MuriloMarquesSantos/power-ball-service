import PrizeRepository from "../../../app/repositories/prize-repository";

describe("PowerBallService", () => {
  it("Should return 2000000 as prize given the user has 5 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 5);
    expect(prize).toEqual(2000000);
  });

  it("Should return 1000000 as prize given the user has 5 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 5);
    expect(prize).toEqual(1000000);
  });

  it("Should return 50000 as prize given the user has 4 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 4);
    expect(prize).toEqual(50000);
  });

  it("Should return 100 as prize given the user has 4 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 4);
    expect(prize).toEqual(100);
  });

  it("Should return 100 as prize given the user has 3 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 3);
    expect(prize).toEqual(100);
  });

  it("Should return 7 as prize given the user has 3 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 3);
    expect(prize).toEqual(7);
  });

  it("Should return 7 as prize given the user has 2 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 2);
    expect(prize).toEqual(7);
  });

  it("Should return 0 as prize given the user has 2 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 2);
    expect(prize).toEqual(0);
  });

  it("Should return 4 as prize given the user has 1 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 1);
    expect(prize).toEqual(4);
  });

  it("Should return 0 as prize given the user has 1 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 1);
    expect(prize).toEqual(0);
  });

  it("Should return 4 as prize given the user has 0 winning numbers and has the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 0);
    expect(prize).toEqual(4);
  });

  it("Should return 0 as prize given the user has 0 winning numbers and doesn't have the power ball", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(false, 0);
    expect(prize).toEqual(0);
  });

  it("Should return 0 given a non listed number", () => {
    const prizeRepository = new PrizeRepository();
    const prize = prizeRepository.getTicketPrize(true, 10);
    expect(prize).toEqual(0);
  });
});

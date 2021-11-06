import INyGovClient from "clients/interfaces/i-ny-gov-client";
import NyGovClientResponseDto from "dtos/ny-gov-client-response-dto";

export default class NyGovClientFake implements INyGovClient {
  private draws = [
    {
      draw_date: "2021-10-27T00:00:00.000",
      winning_numbers: "10 27 29 44 58 24",
    },
    {
      draw_date: "2021-10-25T00:00:00.000",
      winning_numbers: "10 27 29 44 58 24",
    },
  ];

  public async getPrizeInformation(
    drawDate: string
  ): Promise<NyGovClientResponseDto | undefined> {
    const draw = this.draws.find((draw) => draw.draw_date === drawDate);
    if (draw) {
      const winning_numbers = draw.winning_numbers.split(" ");
      const powerBall = winning_numbers[5];
      winning_numbers.splice(5, 1);

      return {
        draw_date: draw.draw_date,
        power_ball: powerBall,
        winning_numbers: winning_numbers,
      };
    }
    return draw;
  }
}

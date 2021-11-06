import axios from "axios";
import AppError from "../../errors/app-error";
import NyGovClientResponseDTO from "../../dtos/ny-gov-client-response-dto";
import INyGovClient from "../interfaces/i-ny-gov-client";

export default class NyGovClient implements INyGovClient {
  public async getPrizeInformation(
    drawDate: string
  ): Promise<NyGovClientResponseDTO> {
    let response;
    try {
      response = await axios.get(
        `https://data.ny.gov/resource/d6yy-54nr.json?draw_date=${drawDate}`
      );
    } catch (error) {
      throw new AppError("Unable to fetch data from API", 500);
    }

    if (!response.data || response?.data.length === 0) {
      throw new AppError("No draw available for this date", 404);
    }

    const winning_numbers_array = response?.data[0].winning_numbers.split(" ");

    const powerBall = winning_numbers_array[5];

    this.removePowerBall(winning_numbers_array);

    return {
      draw_date: response?.data.draw_date,
      winning_numbers: winning_numbers_array,
      power_ball: powerBall,
    };
  }

  private removePowerBall(winning_numbers_array: string[]) {
    winning_numbers_array.splice(5, 1);
  }
}

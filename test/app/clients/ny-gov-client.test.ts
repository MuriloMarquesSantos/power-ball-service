import axios from "axios";
import AppError from "../../../app/errors/app-error";

import NyGovClient from "../../../app/clients/implementations/ny-gov-client";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Client Tests", () => {
  it("Should return a succesful response given correct inputs", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          draw_date: "2021-09-25T00:00:00.000",
          winning_numbers: "22 23 37 62 63 19",
          multiplier: "3",
        },
      ],
    });
    const nyGovClient = new NyGovClient();

    const response = await nyGovClient.getPrizeInformation("2020-10-10");

    expect(response).not.toBe(undefined);
    expect(response.power_ball).toEqual("19");
    expect(response.winning_numbers.length).toBeGreaterThanOrEqual(5);
  });

  it("Should throw AppError given an API error", async () => {
    mockedAxios.get.mockRejectedValue({});
    const nyGovClient = new NyGovClient();

    expect(
      nyGovClient.getPrizeInformation("2020-10-10")
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should throw AppError given an there is no data available for a particular date", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: []
    });
    const nyGovClient = new NyGovClient();

    expect(
      nyGovClient.getPrizeInformation("2020-10-10")
    ).rejects.toBeInstanceOf(AppError);
  });
});

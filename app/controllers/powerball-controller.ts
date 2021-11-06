import PowerBallService from "../domain/services/power-ball-service";
import { Request, Response } from "express";
import PowerBallTicket from "../domain/models/powerball-ticket";
import PrizeRepository from "../repositories/prize-repository";
import NyGovClient from "../clients/implementations/ny-gov-client";
export default class PowerBallController {
  public async determineWinOrLoss(
    request: Request,
    response: Response
  ): Promise<Response> {
    const powerBallService = new PowerBallService(
      new PrizeRepository(),
      new NyGovClient()
    );
    const { date, picks } = request.body;

    const ticket = new PowerBallTicket(date, picks);

    let serviceResponse;
    try {
      serviceResponse = await powerBallService.determineWinOrLoss(ticket);
    } catch (error) {
      return response.json(error);
    }
    return response.status(200).json(serviceResponse);
  }
}

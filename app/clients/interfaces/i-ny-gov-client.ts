import NyGovClientResponseDTO from "../../dtos/ny-gov-client-response-dto";

export default interface INyGovClient {
  getPrizeInformation(drawDate: string): Promise<NyGovClientResponseDTO | undefined>;
}

export default class PrizeRepository {
  public getTicketPrize(wonPowerBall: boolean, wonNumbers: number): number {
    switch (wonNumbers) {
      case 5:
        if (wonPowerBall) {
          return 2000000;
        }
        return 1000000;
      case 4:
        if (wonPowerBall) {
          return 50000;
        }
        return 100;
      case 3:
        if (wonPowerBall) {
          return 100;
        }
        return 7;
      case 2:
        if (wonPowerBall) {
          return 7;
        }
        return 0;
      case 1:
        if (wonPowerBall) {
          return 4;
        }
        return 0;
      case 0:
        if (wonPowerBall) {
          return 4;
        }
        return 0;
      default:
        return 0;
    }
  }
}

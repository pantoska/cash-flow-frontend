export default class MoneyController {
  static amountToString (amount) {
    const moneyLes1 = Math.abs(amount) % 100
    if (moneyLes1 < 10) {
      return Math.floor(amount / 100) + ',0' + moneyLes1
    } else {
      return Math.floor(amount / 100) + ',' + moneyLes1
    }
  }
}

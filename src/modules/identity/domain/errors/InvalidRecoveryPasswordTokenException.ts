export default class InvalidRecoveryPasswordTokenException {
  constructor(public message: string = 'Recovery password token invalid') {}
}

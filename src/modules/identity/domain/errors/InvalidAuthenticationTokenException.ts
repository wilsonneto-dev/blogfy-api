export default class InvalidAuthenticationTokenException {
  constructor(public message: string = 'Authentication token invalid') {}
}

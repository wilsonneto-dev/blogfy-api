export default class EmailAlreadyExistsException {
  constructor(public message: string = 'Email already exists') {}
}

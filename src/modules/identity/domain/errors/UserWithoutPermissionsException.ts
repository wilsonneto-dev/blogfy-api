export default class UserWithoutPermissionsException {
  constructor(public message: string = 'User without permissions') {}
}

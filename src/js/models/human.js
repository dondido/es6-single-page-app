export default class human {
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };
  toString () {
    return this.firstName + " " + this.lastName;
  }
}
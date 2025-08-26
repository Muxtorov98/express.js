class ResponseAuth {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static fromUser(user) {
    return new ResponseAuth(user);
  }
}
module.exports = ResponseAuth;

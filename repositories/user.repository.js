const User = require("../models/user.model");
const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    return this.findOne({ email });
  }

  async findById(id) {
    return this.model
      .findById(id)
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .populate({
        path: 'roles',
        select: 'name permissions parent',
        populate: { path: 'parent', select: 'name' }
      })
      .lean();
  }
}

module.exports = new UserRepository();

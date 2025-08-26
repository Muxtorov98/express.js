const Role = require("../models/role.model");
const BaseRepository = require("./base.repository");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findOneAndDelete(filter) {
    return this.model.findOneAndDelete(filter); 
  }

  async findByNameUpdate(name, updateData) {
    return this.model.findOneAndUpdate({ name }, updateData, { new: true });
  }

  async getDefaultUserRoleId() {
   const role = await this.findOne({ name: "user" });
    if (!role) {
      throw new Error('Роль "user" не найдена');
    }
    return role._id;
  }

  async getAllPermissions(roleId) {
  const permissions = new Set();
  let currentRole = await this.findByIdLean(roleId);

  while (currentRole) {
    if (currentRole.permissions) {
      currentRole.permissions.forEach((perm) => permissions.add(perm));
    }
    if (currentRole.parent) {
      currentRole = await this.findByIdLean(currentRole.parent);
    } else {
      break;
    }
  }

  return Array.from(permissions);
}

}

module.exports = new RoleRepository();

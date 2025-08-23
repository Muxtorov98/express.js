const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");

class UserService {
  async createUser(data) {
    return await userRepository.create(data);
  }
  
  async getUsers({ page = 1, limit = 10, baseUrl = "" }) {
    return await userRepository.paginate({}, { page: +page, limit: +limit }, baseUrl);
  }

  async updateUser(id, data) {
    return await userRepository.findByIdAndUpdate(id, data);
  }

  async getIdByUser(id){
     return await userRepository.findById(id);
  }

  async deleteUser(id) {
    return await userRepository.findByIdAndDelete(id);
  }

   async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }

  async assignRole(userId, roleIds) {
    return await userRepository.findByIdAndUpdate(userId, {roles: roleIds});
  }

  async getUserPermissions(userId) {
    const user = await this.getIdByUser(userId);
    if (!user || !user.roles) {
      return [];
    }
    const allPermissions = new Set();
    for (const role of user.roles) {
      const rolePermissions = await roleRepository.getAllPermissions(role._id);
      rolePermissions.forEach(perm => allPermissions.add(perm));
    }
    return Array.from(allPermissions);
  }
}

module.exports = new UserService();

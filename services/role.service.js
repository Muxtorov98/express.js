const roleRepository = require("../repositories/role.repository");

class RoleService {
  async createRole(data) {
    return await roleRepository.create(data);
  }

  async getRoles({ page = 1, limit = 10, baseUrl = "" }) {
    return await roleRepository.paginate({}, { page: +page, limit: +limit }, baseUrl);
  }

  async getRoleByName(name) {
    return await roleRepository.findOne({ name });
  }

  async updatePermissions(name, permissions) {
    return await roleRepository.findByNameUpdate(name, { permissions });
  }

  async deleteRoleByName(name) {
    return await roleRepository.findOneAndDelete({ name });
  }
}

module.exports = new RoleService();

const { successResponse, errorResponse } = require('../utils/response');
const roleService = require("../services/role.service");
const userService = require('../services/user.service');

class RoleController {

  async createRole(req, res, next) {
    try {
      const role = await roleService.createRole(req.body);
      return successResponse(res, 201, "Role created successfully", role);
    } catch (err) {
      next(err);
    }
  }

  async assignRole(req, res, next) {
    try {
      const { userId, roleIds } = req.body;
      const user = await userService.assignRole(userId, roleIds);
      return successResponse(res, 200, "Roles assigned successfully", user);
    } catch (err) {
      next(err);
    }
  }

  async getAllRoles(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;  

      const roles = await roleService.getRoles({ page, limit, baseUrl });
      return successResponse(res, 200, "Roles fetched successfully", roles);
    } catch (err) {
      next(err);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { permissions } = req.body;
      const updatedRole = await roleService.updatePermissions(req.params.name, permissions);
      if (!updatedRole) {
        return errorResponse(res, 404, "Role not found");
      }

      return successResponse(res, 200, "Role updated successfully", updatedRole);
    } catch (err) {
      next(err);
    }
  }

  async deleteRole(req, res, next) {
    try {
      const deletedRole = await roleService.deleteRoleByName(req.params.name);

      if (!deletedRole) {
        return errorResponse(res, 404, "Role not found");
      }

      return successResponse(res, 200, "Role deleted successfully", deletedRole);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoleController();
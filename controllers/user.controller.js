const { successResponse, errorResponse } = require('../utils/response');
const userService = require("../services/user.service");
const ResponseUsers = require("../resources/ResourcesUser")

class UserController {
  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      const responseData = ResponseUsers.fromUser(user);
      return successResponse(res, 201, "User created successfully", responseData);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;

      const users = await userService.getUsers({ page, limit, baseUrl });
      const responseData = ResponseUsers.fromUser(users);
      return successResponse(res, 200, "Users fetched successfully", users);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      const responseData = ResponseUsers.fromUser(user);
      return successResponse(res, 200, "User updated successfully", responseData);
    } catch (err) {
      next(err);
    }
  }

  async getByIdUser(req, res, next){
     try{
      const user = await userService.getIdByUser(req.params.id);
      if(!user){
        return errorResponse(res, 404, "User not found");
      }
      const responseData = ResponseUsers.fromUser(user);
      return successResponse(res, 200, "User get success", responseData)
     } catch (err) {
        next(err);
     }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      return successResponse(res, 204, "User deleted successfully");
    } catch (err) {
      next(err);
    }
  }

}

module.exports = new UserController();

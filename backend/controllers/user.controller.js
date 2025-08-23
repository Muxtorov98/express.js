const { successResponse, errorResponse } = require('../utils/response');
const userService = require("../services/user.service");
const ResponseUsers = require("../resources/ResourcesUser")
const ResponseAuth = require("../resources/ResponseAuth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  async register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword
    });

    const token = await this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    const responseData = ResponseAuth.fromUser(user);

    return successResponse(res, 201, "User registered successfully", { responseData, token, refreshToken });
  } catch (err) {
    next(err);
  }
}


  async login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    const token = await this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    const responseData = ResponseAuth.fromUser(user);

     return successResponse(res, 200, "User logged in successfully", { responseData, token, refreshToken });
   } catch (err) {
     next(err);
   }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return errorResponse(res, 400, "Refresh token is required");
      }

      const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await userService.getIdByUser(decoded.id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      const newAccessToken = await this.generateToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);
      const responseData = ResponseUsers.fromUser(user);

      return successResponse(res, 200, "Token refreshed successfully", {
        responseData,
        token: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 403, "Invalid refresh token");
      }
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await userService.getIdByUser(req.user.id);
      const responseData = ResponseUsers.fromUser(user);

      return successResponse(res, 200, "User fetched successfully", responseData);
    } catch (err) {
      next(err);
    }
  }

  generateToken = async (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  };

  generateRefreshToken = async (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  };

}

module.exports = new UserController();

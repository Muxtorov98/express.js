const { successResponse, errorResponse } = require('../utils/response');
const userService = require('../services/user.service');
const ResponseUsers = require('../resources/ResourcesUser');
const ResponseAuth = require('../resources/ResponseAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.dto;

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return errorResponse(res, 400, "Foydalanuvchi allaqachon mavjud");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      const responseData = ResponseAuth.fromUser(user);

      return successResponse(res, 201, "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi", {
        responseData,
        token,
        refreshToken,
      });
    } catch (err) {
       next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.dto;

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return errorResponse(res, 401, "Noto'g'ri email yoki parol");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return errorResponse(res, 401, "Noto'g'ri email yoki parol");
      }

      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      const responseData = ResponseAuth.fromUser(user);

      return successResponse(res, 200, "Foydalanuvchi muvaffaqiyatli kirdi", {
        responseData,
        token,
        refreshToken,
      });
    } catch (err) {
       next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return errorResponse(res, 400, "Yangilash tokeni kiritish majburiy");
      }

      const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await userService.getIdByUser(decoded.id);
      if (!user) {
        return errorResponse(res, 404, "Foydalanuvchi topilmadi");
      }

      const newAccessToken = await this.generateToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);
      const responseData = ResponseUsers.fromUser(user);

      return successResponse(res, 200, "Token muvaffaqiyatli yangilandi", {
        responseData,
        token: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 403, "Noto'g'ri yangilash tokeni");
      }
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await userService.getIdByUser(req.user.id);
      const responseData = ResponseUsers.fromUser(user);

      return successResponse(res, 200, "Foydalanuvchi ma'lumotlari muvaffaqiyatli olingan", responseData);
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

module.exports = new AuthController();
const { IsString, IsNotEmpty, MinLength } = require('class-validator');

class RefreshTokenDto {
  @IsString({ message: "Token matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Token kiritish majburiy" })
  @MinLength(10, { message: "Token kamida 10 ta belgidan iborat bo'lishi kerak" })
  refreshToken;

  constructor(data = {}) {
    this.refreshToken = data.refreshToken;
  }
}

module.exports = RefreshTokenDto;
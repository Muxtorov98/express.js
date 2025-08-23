const { IsEmail, IsNotEmpty, IsString } = require('class-validator');

class LoginDto {
  @IsEmail({}, { message: "Noto'g'ri email formati dto" })
  @IsNotEmpty({ message: "Email kiritish majburiy" })
  email;

  @IsString({ message: "Parol matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Parol kiritish majburiy" })
  password;

  constructor(data = {}) {
    this.email = data.email || '';
    this.password = data.password || '';
  }
}

module.exports = LoginDto;
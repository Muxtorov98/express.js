const { IsString, IsNotEmpty, IsEmail, MinLength } = require('class-validator');

class RegisterDto {
  @IsString({ message: "Ism matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Ism kiritish majburiy" })
  name;

  @IsEmail({}, { message: "Noto'g'ri email formati" })
  @IsNotEmpty({ message: "Email kiritish majburiy" })
  email;

  @IsString({ message: "Parol matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Parol kiritish majburiy" })
  password;

  constructor(data = {}) {
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
  }
}

module.exports = RegisterDto;
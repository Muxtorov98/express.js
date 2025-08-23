const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");

const validateDto = (DtoClass) => {
  return async (req, res, next) => {
    const dtoObj = plainToInstance(DtoClass, req.body);

    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints)).flat();
      return res.status(400).json({
        success: false,
        errors: messages,
      });
    }

    req.dto = dtoObj; // ✅ valid bo‘lsa controllerga uzatamiz
    next();
  };
};

module.exports = validateDto;

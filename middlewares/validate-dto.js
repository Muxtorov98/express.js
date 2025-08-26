const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");

const validateDto = (DtoClass) => {
  return async (req, res, next) => {
    const dtoObj = plainToInstance(DtoClass, req.body);

    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const messages = errors.reduce((acc, err) => {
        const constraints = Object.entries(err.constraints);
        // Check if there's an "IsNotEmpty" error (contains "kiritish majburiy")
        const notEmptyMessage = constraints.find(([key, value]) => value.includes('kiritish majburiy'));
        if (notEmptyMessage) {
          // Only include the "IsNotEmpty" error for this field
          acc.push({
            Path: err.property,
            error: notEmptyMessage[1]
          });
        } else {
          // Include all other errors if no "IsNotEmpty" error
          acc.push(...constraints.map(([_, message]) => ({
            Path: err.property,
            error: message
          })));
        }
        return acc;
      }, []).filter(Boolean);

      return res.status(422).json({
        statusCode: 422,
        success: false,
        messages: messages
      });
    }

    req.dto = dtoObj;
    next();
  };
};

module.exports = validateDto;
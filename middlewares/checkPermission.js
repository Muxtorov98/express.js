const userService = require("../services/user.service");

function checkPermission(requiredPermission) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ 
          statusCode: 401,
          success: false,
          messages: 'Unauthorized: User not authenticated' 
        });
      }
      const userPermissions = await userService.getUserPermissions(req.user.id);
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ 
          statusCode: 403,
          success: false,
          messages: `Permission denied: ${requiredPermission} required` 
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({ 
        statusCode: 500,
        success: false,
        messages: `Failed to check permission: ${error.message}` 
      });
    }
  };
}

module.exports = checkPermission;

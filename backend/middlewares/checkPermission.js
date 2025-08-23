const userService = require("../services/user.service");

function checkPermission(requiredPermission) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      }
      const userPermissions = await userService.getUserPermissions(req.user.id);
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: `Permission denied: ${requiredPermission} required` });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: `Failed to check permission: ${error.message}` });
    }
  };
}

module.exports = checkPermission;

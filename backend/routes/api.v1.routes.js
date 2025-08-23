const express = require("express");
const userController = require("../controllers/user.controller");
const waybillController = require("../controllers/waybill.controller");
const waybillChildrenController = require("../controllers/waybillChildren.controller");
const roleController = require("../controllers/role.controller");
const authenticateToken = require('../middlewares/authenticateToken');
const checkPermission = require('../middlewares/checkPermission');

const router = express.Router();

// Wrapper for async handlers to handle Promises and errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ===== Auth routes ===== (odatda umumiy, permission talab qilmaydi)
router.post('/register', asyncHandler(userController.register.bind(userController)));
router.post('/login', asyncHandler(userController.login.bind(userController)));
router.post('/refresh-token', asyncHandler(userController.refreshToken.bind(userController)));
router.get('/me', authenticateToken, asyncHandler(userController.getMe.bind(userController)));

// ===== RBAC (roles management) =====
router.post(
  '/roles',
  authenticateToken,
  checkPermission("create:role"),
  asyncHandler(roleController.createRole.bind(roleController))
);
router.get(
  '/roles',
  authenticateToken,
  checkPermission("read:role"),
  asyncHandler(roleController.getAllRoles.bind(roleController))
);
router.post(
  '/assign-role',
  authenticateToken,
  checkPermission("assign:role"),
  asyncHandler(roleController.assignRole.bind(roleController))
);
router.put(
  '/roles/:name',
  authenticateToken,
  checkPermission("update:role"),
  asyncHandler(roleController.updateRole.bind(roleController))
);
router.delete(
  '/roles/:name',
  authenticateToken,
  checkPermission("delete:role"),
  asyncHandler(roleController.deleteRole.bind(roleController))
);

// ===== Users =====
router.post(
  "/users",
  authenticateToken,
  checkPermission("create:user"),
  asyncHandler(userController.createUser.bind(userController))
);
router.get(
  "/users",
  authenticateToken,
  checkPermission("read:user"),
  asyncHandler(userController.getUsers.bind(userController))
);
router.get(
  "/users/:id",
  authenticateToken,
  checkPermission("read:user"),
  asyncHandler(userController.getByIdUser.bind(userController))
);
router.put(
  "/users/:id",
  authenticateToken,
  checkPermission("update:user"),
  asyncHandler(userController.updateUser.bind(userController))
);
router.delete(
  "/users/:id",
  authenticateToken,
  checkPermission("delete:user"),
  asyncHandler(userController.deleteUser.bind(userController))
);

// ===== Waybill =====
router.post(
  "/waybills",
  authenticateToken,
  checkPermission("create:waybill"),
  asyncHandler(waybillController.create.bind(waybillController))
);
router.get(
  "/waybills",
  authenticateToken,
  checkPermission("read:waybill"),
  asyncHandler(waybillController.getAll.bind(waybillController))
);
router.get(
  "/waybills/:id",
  authenticateToken,
  checkPermission("read:waybill"),
  asyncHandler(waybillController.getById.bind(waybillController))
);
router.put(
  "/waybills/:id",
  authenticateToken,
  checkPermission("update:waybill"),
  asyncHandler(waybillController.update.bind(waybillController))
);
router.delete(
  "/waybills/:id",
  authenticateToken,
  checkPermission("delete:waybill"),
  asyncHandler(waybillController.delete.bind(waybillController))
);

// ===== WaybillChildren =====
router.post(
  "/waybill-children",
  authenticateToken,
  checkPermission("create:waybillChildren"),
  asyncHandler(waybillChildrenController.create.bind(waybillChildrenController))
);
router.get(
  "/waybill-children",
  authenticateToken,
  checkPermission("read:waybillChildren"),
  asyncHandler(waybillChildrenController.getAll.bind(waybillChildrenController))
);
router.get(
  "/waybill-children/:id",
  authenticateToken,
  checkPermission("read:waybillChildren"),
  asyncHandler(waybillChildrenController.getById.bind(waybillChildrenController))
);
router.put(
  "/waybill-children/:id",
  authenticateToken,
  checkPermission("update:waybillChildren"),
  asyncHandler(waybillChildrenController.update.bind(waybillChildrenController))
);
router.delete(
  "/waybill-children/:id",
  authenticateToken,
  checkPermission("delete:waybillChildren"),
  asyncHandler(waybillChildrenController.delete.bind(waybillChildrenController))
);

module.exports = router;

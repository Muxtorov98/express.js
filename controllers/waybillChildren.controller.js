const { successResponse, errorResponse } = require("../utils/response");
const waybillChildrenService = require("../services/waybillChildren.service");

class WaybillChildrenController {
  async create(req, res, next) {
    try {
      const data = await waybillChildrenService.create(req.body);
      return successResponse(res, 201, "WaybillChildren created", data);
    } catch (err) { next(err); }
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;

      const data = await waybillChildrenService.getWaybillChild({ page, limit, baseUrl });
      return successResponse(res, 200, "WaybillChildren fetched", data);
    } catch (err) { next(err); }
  }

  async getById(req, res, next) {
    try {
      const data = await waybillChildrenService.getById(req.params.id);
      if (!data) return errorResponse(res, 404, "WaybillChildren not found");
      return successResponse(res, 200, "WaybillChildren found", data);
    } catch (err) { next(err); }
  }

  async update(req, res, next) {
    try {
      const data = await waybillChildrenService.update(req.params.id, req.body);
      if (!data) return errorResponse(res, 404, "WaybillChildren not found");
      return successResponse(res, 200, "WaybillChildren updated", data);
    } catch (err) { next(err); }
  }

  async delete(req, res, next) {
    try {
      const data = await waybillChildrenService.delete(req.params.id);
      if (!data) return errorResponse(res, 404, "WaybillChildren not found");
      return successResponse(res, 200, "WaybillChildren deleted", data);
    } catch (err) { next(err); }
  }
}

module.exports = new WaybillChildrenController();

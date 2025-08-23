const { successResponse, errorResponse } = require("../utils/response");
const waybillService = require("../services/waybill.service");

class WaybillController {
  async create(req, res, next) {
    try {
      const data = await waybillService.create(req.body);
      return successResponse(res, 201, "Waybill created", data);
    } catch (err) { next(err); }
  }

  async getAll(req, res, next) {
    try {

      const { page = 1, limit = 10 } = req.query;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;

      const data = await waybillService.getWaybills({ page, limit, baseUrl });
      return successResponse(res, 200, "Waybills fetched", data);
    } catch (err) { next(err); }
  }

  async getById(req, res, next) {
    try {
      const data = await waybillService.getById(req.params.id);
      if (!data) return errorResponse(res, 404, "Waybill not found");
      return successResponse(res, 200, "Waybill found", data);
    } catch (err) { next(err); }
  }

  async update(req, res, next) {
    try {
      const data = await waybillService.update(req.params.id, req.body);
      if (!data) return errorResponse(res, 404, "Waybill not found");
      return successResponse(res, 200, "Waybill updated", data);
    } catch (err) { next(err); }
  }

  async delete(req, res, next) {
    try {
      const data = await waybillService.delete(req.params.id);
      if (!data) return errorResponse(res, 404, "Waybill not found");
      return successResponse(res, 200, "Waybill deleted", data);
    } catch (err) { next(err); }
  }
}

module.exports = new WaybillController();

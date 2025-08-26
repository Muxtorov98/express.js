const waybillRepository = require("../repositories/waybill.repository");

class WaybillService {
  async create(data) {
    return await waybillRepository.create(data);
  }
  
  async getWaybills({ page = 1, limit = 10, baseUrl = "" }) {
      return await waybillRepository.paginate({}, { page: +page, limit: +limit, populate: ["children"]}, baseUrl);
  }

  async getById(id) {
    return await waybillRepository.findById(id);
  }
  
  async update(id, data) {
    return await waybillRepository.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    return await waybillRepository.findByIdAndDelete(id);
  }
}

module.exports = new WaybillService();

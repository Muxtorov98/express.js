const waybillChildrenRepository = require("../repositories/waybillChildren.repository");

class WaybillChildrenService {
  async create(data) {
    return await waybillChildrenRepository.create(data);
  }
  async getWaybillChild({ page = 1, limit = 10, baseUrl = "" }) {
    return await waybillChildrenRepository.paginate({}, { page: +page, limit: +limit }, baseUrl);
  }
  async getById(id) {
    return await waybillChildrenRepository.findById(id);
  }
  async update(id, data) {
    return await waybillChildrenRepository.findByIdAndUpdate(id, data);
  }
  async delete(id) {
    return await waybillChildrenRepository.findByIdAndDelete(id);
  }
}

module.exports = new WaybillChildrenService();

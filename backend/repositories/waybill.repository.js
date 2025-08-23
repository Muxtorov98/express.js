const Waybill = require("../models/waybill.model");
const BaseRepository = require("./base.repository");

class WaybillRepository extends BaseRepository {
  constructor() {
      super(Waybill);
    }
}

module.exports = new WaybillRepository();

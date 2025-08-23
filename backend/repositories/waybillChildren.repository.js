const WaybillChildren = require("../models/waybillChildren.model");
const BaseRepository = require("./base.repository");

class WaybillChildrenRepository extends BaseRepository {
  constructor(){
    super(WaybillChildren)
  }
}

module.exports = new WaybillChildrenRepository();

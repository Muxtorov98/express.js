const mongoose = require("mongoose");

const waybillChildrenSchema = new mongoose.Schema(
  {
    waybill_id: { type: mongoose.Schema.Types.ObjectId, ref: "Waybill", required: true },
    barcode: { type: String, required: true },
    statusId: { type: Number, default: 0 },
    order: { type: Number },
    weight: { type: String, default: 0 },
    piece: { type: Number, default: 1 },
    parent_barcode: { type: String },
    receiver_branch_id: {type: Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("WaybillChildren", waybillChildrenSchema);

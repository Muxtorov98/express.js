const mongoose = require("mongoose");

const waybillSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true, unique: true },
    statusId: { type: Number, default: 0 },
    order: { type: String },
    weight: { type: Number, default: 0 },
    piece: { type: Number, default: 1 },
    receiver_branch_id: {type: Number}
  },
  { timestamps: true }
);

// Yii2 dagi hasMany o‘rniga virtual relation
waybillSchema.virtual("children", {
  ref: "WaybillChildren",       // child model nomi
  localField: "_id",            // Waybill._id
  foreignField: "waybill_id",   // WaybillChildren.waybill_id
});

// JSON da virtual chiqishi uchun
waybillSchema.set("toObject", { virtuals: true });
waybillSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Waybill", waybillSchema);

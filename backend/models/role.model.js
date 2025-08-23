const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }], // e.g., ['create:user', 'read:user', 'update:user', 'delete:user']
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null }, // Parent role for inheritance
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
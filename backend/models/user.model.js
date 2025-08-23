const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// 🚀 Default role qo‘shish (agar foydalanuvchi roles bermasa)
userSchema.pre("save", async function (next) {
  if (this.roles.length === 0) {
    const roleRepository = require("../repositories/role.repository");
    const defaultRole = await roleRepository.getDefaultUserRoleId();
    if (defaultRole) {
      this.roles = [defaultRole._id];
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');
const Role = require('../models/role.model');
const User = require('../models/user.model');
require('dotenv').config();

async function initSetup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Rollarni yaratish
    const rolesData = [
      {
        name: 'admin',
        permissions: ["create:product", "read:product", "update:product", "delete:product",
            "create:user", "read:user", "update:user", "delete:user",
            "create:order", "read:order", "update:order", "delete:order", "read:waybill", "update:role", "read:role", "assign:role"],
        parent: null,
      },
      {
        name: 'manager',
        permissions: [
          'read:user', 'update:user', 'create:order', 'read:order'
        ],
        parent: null,
      },
      {
        name: 'user',
        permissions: ['read:user'],
        parent: null,
      },
    ];

    for (const roleData of rolesData) {
      const existing = await Role.findOne({ name: roleData.name });
      if (!existing) {
        await Role.create(roleData);
        console.log(`Created role: ${roleData.name}`);
      }
    }

    // Userlarni yaratish va rollarni biriktirish
    const bcrypt = require('bcrypt');
    const users = [
      { name: 'Admin', email: 'admin@example.com', password: '123456', role: 'admin' },
      { name: 'Manager', email: 'manager@example.com', password: '123456', role: 'manager' },
      { name: 'User', email: 'user@example.com', password: '123456', role: 'user' },
    ];

    for (const u of users) {
      const existingUser = await User.findOne({ email: u.email });
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(u.password, salt);

        const role = await Role.findOne({ name: u.role });
        await User.create({
          name: u.name,
          email: u.email,
          password: hashedPassword,
          roles: [role._id], // Bir nechta rol bo‘lsa, array
        });
        console.log(`Created user: ${u.name} with role: ${u.role}`);
      }
    }

    console.log('Setup completed.');
  } catch (err) {
    console.error('Error during setup:', err);
  } finally {
    await mongoose.disconnect();
  }
}

initSetup();

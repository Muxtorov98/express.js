const mongoose = require('mongoose');
const Role = require('../models/Role');

async function initRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const roles = [
      {
        name: 'admin',
        permissions: ['create:user', 'read:user', 'update:user', 'delete:user', 'create:role', 'assign:role'],
        parent: null,
      },
      {
        name: 'editor',
        permissions: ['read:user', 'update:user'],
        parent: null, // Will be updated to inherit from 'user'
      },
      {
        name: 'user',
        permissions: ['read:user'],
        parent: null,
      },
    ];

    for (const roleData of roles) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Created role: ${roleData.name}`);
      }
    }

    // Set 'editor' to inherit from 'user'
    const userRole = await Role.findOne({ name: 'user' });
    await Role.updateOne({ name: 'editor' }, { parent: userRole._id });

    console.log('Roles initialized successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing roles:', error.message);
    mongoose.connection.close();
  }
}

initRoles();
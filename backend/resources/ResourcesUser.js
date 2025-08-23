class ResponseUsers {
  constructor(user) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    const permissionsSet = new Set();
    const parentNames = new Set();
    this.roles = user.roles
      ? user.roles.map(role => {
          if (typeof role === 'string') {
            console.warn(`Malformed role data for user ${this.id}: ${role}`);
            return role;
          }
          if (!role.name) {
            console.warn(`Role with ID ${role._id} is missing name`);
            return 'Unknown';
          }
          // Add permissions to set (including inherited ones will be handled in UserService)
          if (role.permissions) {
            role.permissions.forEach(perm => permissionsSet.add(perm));
          }
          // Add parent role name to set
          if (role.parent && role.parent.name) {
            parentNames.add(role.parent.name);
          }
          return role.name;
        })
      : [];
    this.permissions = Array.from(permissionsSet);
    this.parent = Array.from(parentNames);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static fromUser(user) {
    return new ResponseUsers(user);
  }
}
module.exports = ResponseUsers;

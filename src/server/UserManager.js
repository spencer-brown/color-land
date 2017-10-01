const uuidv4 = require('uuid/v4');

const User = require('../shared/models/User');

class UserManager {
  addUser() {
    if (!this.users) {
      this.users = [];
    }

    const id = uuidv4();
    this.users[id] = new User(id);
    return this.users[id];
  }

  removeUser(id) {
    if (this.users[id]) {
      delete this.users[id];
    }
  }

  getUser(id) {
    return this.users[id];
  }
}

module.exports = new UserManager();
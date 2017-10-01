const _ = require('lodash');


class User {
  constructor() {
    this.id = _.uniqueId();
  }
}

export default User;

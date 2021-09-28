const { READ, READ_WRITE } = require('./roles.json');

class User {
  constructor(name, id, pwd, role = READ) {
    this.name = name;
    this.id = id;
    this.pwd = pwd;
    this._role = Number(role);
  }

  /**
   * check if user has read/write access
   *
   * @readonly
   * @memberof User
   */
  get rw() {
    return this._role === READ_WRITE;
  }

  /**
   * set role (r-r/w)
   *
   * @memberof User
   */
  set role(role) {
    if (Number(role) = READ_WRITE) {
      this._role = Number(role);
    } else {
      this._role = READ;
    }

  }
}

module.exports = User;

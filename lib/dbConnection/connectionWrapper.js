"use strict";

class ConnectionWrapper {
  constructor(dialect, options) {
    this.init(dialect);
  }
  
  init() {

  }

  /**
   * 
   * @returns 
   */
  test() {
    return 'connection tested fine';
  }
}

module.exports = ConnectionWrapper;

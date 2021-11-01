"use strict";

class IndexConnectionWrapper {
  constructor(options) {
    this.init(options);
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

module.exports = IndexConnectionWrapper;
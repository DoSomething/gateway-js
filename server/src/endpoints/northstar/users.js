'use strict';

const NorthstarEndpoint = require('./endpoint');

/**
 * @see https://github.com/DoSomething/northstar/blob/master/documentation/endpoints/v2/users.md
 */
class UsersNorthstarEndpoint extends NorthstarEndpoint {
  constructor(client) {
    super(client);

    this.baseUri = `${this.baseUri}/v2`;
  }
  /**
   * @param  {String} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) { return this.executeGet(`${this.baseUri}/users/${id}`, query); }
  /**
   * @param  {String} email
   * @param  {Object} query
   * @return {Promise}
   */
  getByEmail(email, query) { return this.executeGet(`${this.baseUri}/email/${email}`, query); }
  /**
   * @param  {String} mobile
   * @param  {Object} query
   * @return {Promise}
   */
  getByMobile(mobile) { return this.executeGet(`${this.baseUri}/mobile/${mobile}`, query); }
  /**
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) { return this.executePost(`${this.baseUri}/users`, data); }
  /**
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) { return this.executeGet(`${this.baseUri}/users`, query); }
  /**
   * @param  {String} id
   * @param  {Object} data
   * @return {Promise}
   */
  update(id, data) { return this.executePut(`${this.baseUri}/users/${id}`, data); }
}

module.exports = UsersNorthstarEndpoint;

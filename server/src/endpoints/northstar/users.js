'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

/**
 * @see https://github.com/DoSomething/northstar/blob/master/documentation/endpoints/v2/users.md
 */
class NorthstarEndpointUsers extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.northstar.baseUri}/users`;
  }
  /**
   * @param  {String} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) { return this.executeGet(`${this.url}/${id}`, query); }
  /**
   * @param  {String} email
   * @return {Promise}
   */
  getByEmail(email) { return this.executeGet(`${this.url}/email/${email}`); }
  /**
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) { return this.executePost(this.url, data); }
  /**
   * @param  {String} id
   * @param  {Object} data
   * @return {Promise}
   */
  update(id, data) { return this.executePost(`${this.url}/${id}`, data); }
}

module.exports = NorthstarEndpointUsers;

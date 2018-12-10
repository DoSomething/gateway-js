'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

/**
 * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md
 */
class RogueEndpointSignups extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.rogue.baseUri}/signups`;
  }
  /**
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) { return this.executeGet(this.url, query) }
  /**
   * @param  {String|Number} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) { return this.executeGet(`${this.url}/${id}`, query) }
  /**
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) { return this.executePost(this.url, data) }
}

module.exports = RogueEndpointSignups;

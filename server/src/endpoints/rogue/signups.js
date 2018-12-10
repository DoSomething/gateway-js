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
  index(query) {
    return this
      .executeGet(this.url, query)
      .then(responseBody => responseBody);
  }
  /**
   * @param  {String|Number} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) {
    return this
      .executeGet(`${this.url}/${id}`, query)
      .then(responseBody => responseBody);
  }
  /**
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) {
    return this
      .executePost(this.url, data)
      .then(responseBody => responseBody);
  }
}

module.exports = RogueEndpointSignups;

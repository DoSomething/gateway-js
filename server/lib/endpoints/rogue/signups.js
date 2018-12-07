'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

class RogueEndpointSignups extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.rogue.baseUri}/signups`;
  }
  /**
   * index - Retrieve all Signups
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#retrieve-all-signups
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) {
    return this
      .executeGet(this.url, query)
      .then(responseBody => responseBody);
  }
  /**
   * getById - Retrieve a single Signup
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#retrieve-a-specific-signup
   * @param  {string|number} id
   * @param  {Object} query
   * @return {Promise}
   */
  getById(id, query) {
    return this
      .executeGet(`${this.url}/${id}`, query)
      .then(responseBody => responseBody);
  }
  /**
   * create - Create a new Signup
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/signups.md#create-a-signup
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

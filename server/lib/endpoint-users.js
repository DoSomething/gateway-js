'use strict';

const GatewayEndpoint = require('./endpoint');

class GatewayEndpointUsers extends GatewayEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.northstar.baseUri}/users`;
  }
  /**
   * getById - Retrieve a single User
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md#retrieve-a-specific-post
   * @param  {String} id
   * @param  {Object} query
   * @return {Promise}
   */
  getById(id, query) {
    return this
      .executeGet(`${this.url}/${id}`, query)
      .then(responseBody => responseBody);
  }
  /**
   * create - Creates a new User
   *
   * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/posts.md#create-a-post
   * @param  {Object} data
   * @return {Promise}
   */
  create(data) {
    return this
      .executePost(this.url, data)
      .then(responseBody => responseBody);
  }
}

module.exports = GatewayEndpointUsers;

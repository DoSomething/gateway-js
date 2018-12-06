'use strict';

class RogueEndpoint {
  constructor(client) {
    this.client = client;
  }
  /**
   * executeGet - sends GET requests to an endpoint in Rogue
   *
   * @param  {string} endpoint
   * @param  {Object} query = {}
   * @return {Promise}
   */
  executeGet(endpoint, query = {}) {
    return this.client
      .request('clientCredentials')
      .get(`${this.client.baseUri}/${endpoint}`)
      .accept('json')
      .query(query)
      .then(res => res.body);
  }
  /**
   * executePost - sends POST requests to an endpoint in Rogue
   *
   * @param  {string} endpoint
   * @param  {Object} data
   * @return {Promise}
   */
  executePost(endpoint, data) {
    return this.client
      .request('clientCredentials')
      .post(`${this.client.baseUri}/${endpoint}`)
      .accept('json')
      .send(data)
      .then(res => res.body);
  }
}

module.exports = RogueEndpoint;

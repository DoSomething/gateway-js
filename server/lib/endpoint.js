'use strict';

class GatewayEndpoint {
  constructor(client) {
    this.client = client;
  }
  /**
   * executeGet - sends GET requests to a Gateway endpoint
   *
   * @param  {string} url
   * @param  {Object} query = {}
   * @return {Promise}
   */
  executeGet(url, query = {}) {
    return this.client
      .request('clientCredentials')
      .get(url)
      .accept('json')
      .query(query)
      .then(res => res.body);
  }
  /**
   * executePost - sends POST requests to a Gateway endpoint
   *
   * @param  {string} url
   * @param  {Object} data
   * @return {Promise}
   */
  executePost(url, data) {
    return this.client
      .request('clientCredentials')
      .post(url)
      .accept('json')
      .send(data)
      .then(res => res.body);
  }
}

module.exports = GatewayEndpoint;

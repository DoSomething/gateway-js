'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

/**
 * @see https://github.com/DoSomething/rogue/blob/master/docs/endpoints/campaigns.md
 */
class RogueEndpointCampaigns extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.rogue.baseUri}/campaigns`;
  }
  /**
   * @param  {Object} query
   * @return {Promise}
   */
  index(query) { return this.executeGet(this.url, query); }
  /**
   * @param  {String|Number} id
   * @param  {Object} query
   * @return {Promise}
   */
  get(id, query) { return this.executeGet(`${this.url}/${id}`, query); }
}

module.exports = RogueEndpointCampaigns;

'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

/**
 * @see https://github.com/DoSomething/graphql
 */
class GraphQLEndpoint extends OAuthEndpoint {
  constructor(client) {
    super(client);
    this.url = `${this.client.config.services.graphql.baseUri}/graphql`;
  }
  /**
   * @param  {Object} query
   * @return {Promise}
   */
  get(query) {
    return this
      .executeGet(this.url, query)
      .then(responseBody => responseBody);
  }
}

module.exports = GraphQLEndpoint;

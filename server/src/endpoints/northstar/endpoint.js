'use strict';

const OAuthEndpoint = require('../oauth-endpoint');

class NorthstarEndpoint extends OAuthEndpoint {
  constructor(client) {
    super(client);

    this.baseUri = this.client.config.services.northstar.baseUri;
  }
}


module.exports = NorthstarEndpoint;

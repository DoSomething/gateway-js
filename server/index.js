'use strict';

const GatewayClient = require('./lib/client');

module.exports = {
  GatewayClient,
  // TODO: Remove this once Conversations uses GatewayClient instead.
  RogueClient: GatewayClient,
};

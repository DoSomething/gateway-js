'use strict';

const GatewayClient = require('./src/client');

module.exports = {
  GatewayClient,
  // TODO: Remove this once Conversations uses GatewayClient instead.
  RogueClient: GatewayClient,
};

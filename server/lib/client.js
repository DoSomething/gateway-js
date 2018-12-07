'use strict';

const EventEmitter = require('events');
const lodash = require('lodash');

const NorthstarUsersEndpoint = require('./endpoints/northstar/users');
const RoguePostsEndpoint = require('./endpoints/rogue/posts');
const RogueSignupsEndpoint = require('./endpoints/rogue/signups');

const config = require('../config/lib/client');
const clientCredentialsStrategy = require('./auth-strategies/client-credentials').getNewInstance({
  tokenConfig: {
    scope: config.authStrategies.clientCredentials.scopes,
  },
});

/**
 * GatewayClient
 * @extends EventEmitter
 */
class GatewayClient extends EventEmitter {
  /**
   * Create a new client
   *
   * @param  {Object} opts
   * @param  {Array} strategies - Auth strategies the client will support
   */
  constructor(opts) {
    super();
    this.strategies = [clientCredentialsStrategy];
    this.config = config;
    this.setup();

    // Endpoints
    this.Northstar = {
      Users: new NorthstarUsersEndpoint(this),
    };
    this.Rogue = {
      Posts: new RoguePostsEndpoint(this),
      Signups: new RogueSignupsEndpoint(this),
    };

    // TODO: Remove this once we update Conversations lib/rogue as lib/gateway.
    // @see https://github.com/DoSomething/gambit-conversations/blob/4.0.4/lib/rogue.js
    this.Posts = this.Rogue.Posts;
    this.Signups = this.Rogue.Signups;
  }
  /**
   * request - Gets a request client that is authorized by the strategy named in the strategyName
   * argument. The goal is that each strategy should implement the getAuthorizedClient method.
   *
   * @param  {string} strategyName
   * @return {Object} Authorized client
   */
  request(strategyName) {
    if (!strategyName) {
      throw new Error('GatewayClient.request: a strategyName is required');
    }
    return this.availableStrategies[strategyName].getAuthorizedClient();
  }
  /**
   * @static getNewInstance
   *
   * @param  {Object} opts = {}
   * @param  {Array} strategies = []
   * @return {GatewayClient}
   */
  static getNewInstance(opts = {}) {
    return new GatewayClient(opts);
  }

  /**
   * If JS had private scope, the following methods would be private. -----------------------------\
   * There is hope: @see https://github.com/tc39/proposal-private-methods
   */

  /**
   * setup - Initializes each strategy and creates a map of the camelCased strategy names and the
   * strategy instances.
   */
  setup() {
    this.availableStrategies = {};
    this.strategies.forEach((strategy) => {
      const name = lodash.camelCase(strategy.constructor.name);
      this.availableStrategies[name] = strategy;
      strategy.setup();
    });
  }
  // End "private" methods ------------------------------------------------------------------------/
}

module.exports = GatewayClient;
